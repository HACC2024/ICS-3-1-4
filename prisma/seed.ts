import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  // Seed accounts with a Promise.all and map instead of forEach
  await Promise.all(
    config.defaultAccounts.map(async (account) => {
      let role: Role = 'USER';
      if (account.role === 'ADMIN') {
        role = 'ADMIN';
      }
      console.log(`  Creating user: ${account.email} with role: ${role}`);
      await prisma.user.upsert({
        where: { email: account.email },
        update: {},
        create: {
          email: account.email,
          password,
          role,
        },
      });
    }),
  );

  // Seed "stuff" with a Promise.all and map instead of forEach
  await Promise.all(
    config.defaultData.map(async (data, index) => {
      let condition: Condition = 'good';
      if (data.condition === 'poor') {
        condition = 'poor';
      } else if (data.condition === 'excellent') {
        condition = 'excellent';
      } else {
        condition = 'fair';
      }
      console.log(`  Adding stuff: ${data.name} (${data.owner})`);
      await prisma.stuff.upsert({
        where: { id: index + 1 },
        update: {},
        create: {
          name: data.name,
          quantity: data.quantity,
          owner: data.owner,
          condition,
        },
      });
    }),
  );

  // Seed dataset metadata with Promise.all
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
        jsonPath: data.jsonPath,
        description: data.description,
        org: data.org,
        orgIcon: data.orgIcon,
      },
    });
  });
  await Promise.all(datasetPromises);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
