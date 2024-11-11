// File solely to extract persona recommendations from the database in order
// to let them be used in the mock data without needing to use the OpenAI API

import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function exportPersonaRecommendations() {
  try {
    // Fetch data from personaRecommendation table with dataset details
    const recommendations = await prisma.personaRecommendation.findMany({
      include: { dataset: { select: { id: true, name: true, topic: true, description: true, org: true, orgIcon: true } } },
    });
    console.log('Recommendations from DB:', recommendations);

    // Format data
    const formattedData = recommendations.map(rec => ({
      persona: rec.persona,
      recommendations: Array.isArray(rec.dataset)
        ? rec.dataset.map(dataset => ({
          id: dataset.id,
          name: dataset.name,
        }))
        : [],
    }));

    const existingSettings = JSON.parse(fs.readFileSync('./settings.development.json', 'utf8') || '{}');
    const existingRecommendations = existingSettings.personaRecommendations || [];
    const newRecommendations = existingRecommendations.concat(formattedData);

    // Write data to JSON file
    // eslint-disable-next-line max-len
    fs.writeFileSync('./settings.development.json', JSON.stringify({ ...existingSettings, personaRecommendations: newRecommendations }, null, 2));
    console.log('Data exported to settings.development.json');
  } catch (error) {
    console.error('Error exporting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportPersonaRecommendations();
