import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  // Step 1: Seed datasets from `defaultDataMetadata`
  const datasetPromises = config.defaultDataMetadata.map(async (data) => {
    console.log(`  Adding dataset metadata: ${data.name}`);
    return prisma.dataset.upsert({
      where: { name: data.name },
      update: {},
      create: {
        name: data.name,
        url: data.url,
        viewCount: data.viewCount,
        topic: data.topic,
        description: data.description,
        org: data.org,
        orgIcon: data.orgIcon,
        csvData: data.csvData,
      },
    });
  });
  const datasets = await Promise.all(datasetPromises);

  // Create a map to look up datasets by name for easy access when assigning favorites
  const datasetMap = Object.fromEntries(datasets.map((dataset) => [dataset.name, dataset.id]));

  // Step 2: Seed users and assign favorites
  await Promise.all(
    config.defaultAccounts.map(async (account) => {
      const role: Role = account.role === 'ADMIN' ? 'ADMIN' : 'USER';
      console.log(`  Creating user: ${account.email} with role: ${role}`);

      // Determine dataset connections for favorites
      const favoritesToConnect = (account.favorites || [])
        .map((datasetName: string) => datasetMap[datasetName])
        .filter(Boolean) // Ensure only valid dataset IDs are included
        .map((id: number) => ({ id }));

      // Upsert each user with favorites connected
      await prisma.user.upsert({
        where: { email: account.email },
        update: {},
        create: {
          email: account.email,
          password,
          role,
          favorites: {
            connect: favoritesToConnect,
          },
        },
      });
    }),
  );

  console.log('Seeding completed.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
