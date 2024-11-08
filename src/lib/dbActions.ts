'use server';

import { hash } from 'bcrypt';
import { prisma } from './prisma';

/**
 * Adds a new persona quiz response to the database.
 * @param response, an object with the following properties: email, goal, usage, comfortLevel, dataType, interaction, assignedPersona.
 */
export const addPersonaQuizResponse = async (response: {
  goal: string;
  usage: string;
  comfortLevel: string;
  dataType: string;
  interaction: string;
  email: string;
  assignedPersona: string;
}) => {
  try {
    await prisma.personaQuiz.create({
      data: {
        goal: response.goal,
        usage: response.usage,
        comfortLevel: response.comfortLevel,
        dataType: response.dataType,
        interaction: response.interaction,
        email: response.email,
        assignedPersona: response.assignedPersona,
      },
    });
  } catch (error) {
    console.error('Error saving persona quiz response:', error);
    throw new Error('Failed to save response');
  }
};

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

/**
 * Removes a dataset from the user's favorites list.
 * @param userId - The ID of the user.
 * @param datasetId - The ID of the dataset to remove from favorites.
 */
export async function removeFavoriteDataset(userId: number, datasetId: number) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      favorites: {
        disconnect: { id: datasetId },
      },
    },
  });
}
