// src/lib/uploadDataset.ts

import Papa from 'papaparse';
import { prisma } from './prisma';

/**
 * Uploads and parses a CSV file, saving it to the database as JSON.
 * @param file - The CSV file to be uploaded.
 * @param name - The name of the dataset.
 * @param url - The URL associated with the dataset.
 * @param fileName - The name of the uploaded file.
 * @param topic - The topic associated with the dataset.
 * @param description - The description of the dataset.
 * @param organization - The name of the organization providing the dataset.
 */
export default async function uploadDataset({
  file,
  name,
  url,
  fileName,
  topic,
  description,
  organization,
}: {
  file: File;
  name: string;
  url: string;
  fileName: string;
  topic: string;
  description: string;
  organization: string;
}) {
  try {
    // Read and parse CSV file
    const fileContent = await file.text();
    const parsedData = Papa.parse(fileContent, { header: true }).data;

    // Convert the parsed data array to a JSON array
    const parsedDataArray = parsedData.map((row) => ({ ...row as object }));

    // Save the parsed data and filename to the database with the additional fields
    await prisma.dataset.create({
      data: {
        name,
        topic,
        description,
        org: organization,
        orgIcon: '',
        url,
        csvData: parsedDataArray, // Save as JSON object
        fileName, // Save the filename here
      },
    });
    console.log('Dataset successfully uploaded and saved to the database.');
  } catch (error) {
    console.error('Error uploading dataset:', error);
    throw new Error('Failed to upload dataset');
  }
}
