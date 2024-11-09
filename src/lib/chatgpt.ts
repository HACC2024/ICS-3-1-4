import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function getDatasetRecommendations(persona: string, datasetNames: string[]): Promise<string> {
  const prompt = `Based on the persona of "${persona}", recommend relevant datasets from the following list: ${datasetNames.join(', ')}.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // Use 'gpt-4-turbo' if preferred
    messages: [{ role: 'user', content: prompt }],
  });

  return completion.choices[0]?.message?.content || '';
}
