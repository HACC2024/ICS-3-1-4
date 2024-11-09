// To run this script, add "type": "module" to package.json and run "node /path/to/precomputeRecommendations.mjs" in terminal
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const personas = [
  'educator',
  'researcher',
  'communityMember',
  'publicInformer',
  'businessDecisionMaker',
];

async function getRecommendationsForPersona(persona, datasetList) {
  // Update the prompt to include dataset IDs alongside names
  const prompt = `Based on the persona of "${persona}", recommend relevant dataset IDs from the following list:\n\n${datasetList.map(
    (dataset) => `ID: ${dataset.id}, Name: ${dataset.name}`,
  ).join('\n')}\n\nRespond with only the IDs, separated by commas.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  const recommendationsText = completion.choices[0]?.message?.content || '';
  // Convert the response to an array of IDs by splitting and parsing
  return recommendationsText.split(',').map((id) => parseInt(id.trim(), 10)).filter(Boolean);
}

async function precomputeRecommendations() {
  // Retrieve datasets with both `id` and `name` fields
  const datasetList = await prisma.dataset.findMany({
    select: { id: true, name: true },
  });

  const recommendationPromises = personas.map(async (persona) => {
    // Get recommendations in terms of `datasetId`s
    const recommendations = await getRecommendationsForPersona(persona, datasetList);

    // Upsert each (persona, datasetId) pair individually
    return Promise.all(
      recommendations.map(async (datasetId) => {
        await prisma.personaRecommendation.upsert({
          where: { persona_datasetId: { persona, datasetId } }, // Composite key for uniqueness
          update: {},
          create: { persona, datasetId },
        });
      }),
    );
  });

  await Promise.all(recommendationPromises);
  console.log('Stored recommendations for all personas');
}

// Run the script
precomputeRecommendations()
  .catch((error) => console.error('Error precomputing recommendations:', error))
  .finally(async () => {
    await prisma.$disconnect();
  });
