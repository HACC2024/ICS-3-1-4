const csv = require('csvtojson');
const fs = require('fs-extra');
const path = require('path');

// Directory paths
const csvDir = path.join(process.cwd(), 'data'); // Folder where CSVs are stored
const jsonDir = path.join(process.cwd(), 'public', 'mock-data'); // Folder where JSONs will be saved

async function convertCsvFiles() {
  try {
    // Ensure the JSON directory exists
    await fs.ensureDir(jsonDir);

    // Get a list of CSV files in the specified directory
    const files = await fs.readdir(csvDir);

    // Convert CSV to JSON for each file
    await Promise.all(files.map(async (file: string) => {
      if (file.endsWith('.csv')) {
        const csvFilePath = path.join(csvDir, file);
        const jsonFilePath = path.join(jsonDir, `${path.basename(file, '.csv')}.json`);

        // Convert CSV to JSON
        const jsonArray = await csv({
          noheader: false,
        }).fromFile(csvFilePath);

        // Write JSON to the destination directory
        await fs.writeJson(jsonFilePath, jsonArray, { spaces: 2 });

        console.log(`Converted ${file} to JSON at ${jsonFilePath}`);
      }
    }));
  } catch (error) {
    console.error('Error converting CSV files:', error);
  }
}

// Execute the function
convertCsvFiles();
