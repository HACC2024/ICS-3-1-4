import Papa from 'papaparse';
import { prisma } from './prisma';

/**
 * Uploads and parses a CSV file, saving it to the database as JSON.
 * @param file, the CSV file to be uploaded.
 * @param name, the name of the dataset.
 * @param url, the URL associated with the dataset.
 */
export default async function uploadDataset({ file, name, url }: { file: File; name: string; url: string }) {
  try {
    // Read and parse CSV file
    const fileContent = await file.text();
    const parsedData = Papa.parse(fileContent, { header: true }).data;

    // Convert the parsed data array to a JSON array
    const parsedDataArray = parsedData.map((row) => ({ ...row as object }));

    // Save the parsed data as a JSON object, not a string
    await prisma.dataset.create({
      data: {
        name,
        topic: '',
        description: '',
        org: '',
        orgIcon: '',
        url,
        csvData: parsedDataArray, // Save as JSON object
      },
    });
    console.log('Dataset successfully uploaded and saved to the database.');
  } catch (error) {
    console.error('Error uploading dataset:', error);
    throw new Error('Failed to upload dataset');
  }
}
