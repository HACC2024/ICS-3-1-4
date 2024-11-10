import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  // Step 1: Seed users and map their email to IDs
  const userMap: { [email: string]: number } = {};
  await Promise.all(
    config.defaultAccounts.map(async (account) => {
      const role: Role = account.role === 'ADMIN' ? 'ADMIN' : 'USER';
      console.log(`  Creating or updating user: ${account.email} with role: ${role}`);

      const user = await prisma.user.upsert({
        where: { email: account.email },
        update: {
          role,
          persona: account.persona,
          password, // Updating password, adjust as needed to avoid resetting
        },
        create: {
          email: account.email,
          password,
          role,
          persona: account.persona,
        },
      });
      userMap[account.email] = user.id;
    }),
  );

  // Step 2: Seed datasets with ownerId and populate the dataset map
  const datasetMap: { [name: string]: number } = {};
  const datasetPromises = config.defaultDataMetadata.map(async (data) => {
    console.log(`  Adding or updating dataset metadata: ${data.name}`);

    // Look up ownerId from userMap using data.ownerEmail
    const ownerId = data.owner ? userMap[data.owner] : null;
    if (!ownerId) {
      console.error(`Owner not found for dataset ${data.name}. Skipping.`);
      return;
    }

    const dataset = await prisma.dataset.upsert({
      where: { name: data.name },
      update: {
        url: data.url,
        viewCount: data.viewCount,
        topic: data.topic,
        description: data.description,
        org: data.org,
        orgIcon: data.orgIcon,
        csvData: data.csvData,
        fileName: data.fileName,
        ownerId,
      },
      create: {
        name: data.name,
        url: data.url,
        viewCount: data.viewCount,
        topic: data.topic,
        description: data.description,
        org: data.org,
        orgIcon: data.orgIcon,
        csvData: data.csvData,
        fileName: data.fileName,
        ownerId,
      },
    });

    datasetMap[data.name] = dataset.id;
  });
  await Promise.all(datasetPromises);

  // Step 3: Connect users with their favorites and owned datasets
  await Promise.all(
    config.defaultAccounts.map(async (account) => {
      const userId = userMap[account.email];
      if (!userId) return;

      const favoritesToConnect = (account.favorites || [])
        .map((datasetName: string) => datasetMap[datasetName])
        .filter(Boolean) // Ensure only valid dataset IDs
        .map((id: number) => ({ id }));

      const ownedToConnect = (account.ownedDatasets || [])
        .map((datasetName: string) => datasetMap[datasetName])
        .filter(Boolean) // Ensure only valid dataset IDs
        .map((id: number) => ({ id }));

      await prisma.user.update({
        where: { id: userId },
        data: {
          favorites: { connect: favoritesToConnect },
          ownedDatasets: { connect: ownedToConnect },
        },
      });
    }),
  );

  // Step 4: Seed PersonaRecommendations using single datasetId entries
  await Promise.all(
    config.personaRecommendations.map(async (personaRec) => {
      const { persona, datasetId } = personaRec;
      if (!persona || !datasetId) return;

      // Upsert each persona-dataset recommendation individually
      await prisma.personaRecommendation.upsert({
        where: {
          persona_datasetId: {
            persona,
            datasetId,
          },
        },
        update: {}, // No fields specified here to prevent accidental overrides, but add fields if needed.
        create: {
          persona,
          datasetId,
        },
      });

      console.log(`  Stored recommendation for persona: ${persona} with dataset ID: ${datasetId}`);
    }),
  );

  // // Step 4: Seed PersonaRecommendations using dataset IDs (for when seeding from data retrieved from OpenAI API)
  // await Promise.all(
  //   config.personaRecommendations.map(async (personaRec) => {
  //     // Map dataset names to IDs using datasetMap
  //     const datasetIds = (personaRec.recommendations || [])
  //       .map((datasetName: string) => datasetMap[datasetName])
  //       .filter(Boolean); // Ensure only valid dataset IDs

  //     // Create or update a PersonaRecommendation for each datasetId
  //     await Promise.all(
  //       datasetIds.map(async (datasetId) => {
  //         await prisma.personaRecommendation.upsert({
  //           where: {
  //             persona_datasetId: {
  //               persona: personaRec.persona,
  //               datasetId,
  //             },
  //           },
  //           update: {}, // No fields specified here to prevent accidental overrides, but add fields if needed.
  //           create: {
  //             persona: personaRec.persona,
  //             datasetId,
  //           },
  //         });
  //       }),
  //     );

  //     console.log(`  Stored recommendations for persona: ${personaRec.persona}`);
  //   }),
  // );

  console.log('Seeding completed.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
