'use server';

import { hash } from 'bcrypt';
import Papa from 'papaparse';
import { Prisma } from '@prisma/client';
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
 * Updates the persona attribute in the user's profile.
 * @param email - The email of the user to update.
 * @param assignedPersona - The new persona to assign to the user.
 */
export const updateUserPersona = async (email: string, assignedPersona: string) => {
  try {
    await prisma.user.update({
      where: { email },
      data: { persona: assignedPersona },
    });
  } catch (error) {
    console.error('Error updating user persona:', error);
    throw new Error('Failed to update user persona');
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

export const editDataset = async (formData: FormData) => {
  try {
    // Extract the JSON data string from FormData and parse it
    const data = JSON.parse(formData.get('data') as string);

    // Extract the file if present
    const file = formData.get('file') as File | null;
    let csvData: Prisma.JsonValue | null = null;
    let fileName: string | null = null;

    if (file) {
      // Read and parse CSV file if a file was uploaded
      const fileContent = await file.text();
      csvData = Papa.parse(fileContent, { header: true }).data as Prisma.JsonValue;
      fileName = file.name;
    }

    // Update the dataset in the database
    const updated = await prisma.dataset.update({
      where: { id: data.id },
      data: {
        name: data.name,
        url: data.url,
        topic: data.topic,
        description: data.description,
        org: data.organization,
        ...(fileName && csvData && { fileName, csvData }), // Only add if both fileName and csvData are provided
      },
    });

    return updated;
  } catch (error) {
    console.error('Error updating dataset:', error);
    throw new Error('Failed to update dataset');
  }
};
