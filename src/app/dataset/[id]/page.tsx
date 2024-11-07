// This file should remain a server component (do not add 'use client')
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import DatasetPageWrapper from '@/components/DatasetPageWrapper';

/**
 * Dataset Page for a specific dataset ID
 */
export default async function DatasetPage({ params }: { params: { id: string | string[] } }) {
  const idString = Array.isArray(params?.id) ? params.id[0] : params.id;
  const id = Number(idString.replace(/[^\d]/g, ''));

  console.log(`Parsed ID: ${id}`); // Log the ID being queried

  if (Number.isNaN(id)) {
    console.log('ID is NaN, returning 404');
    return notFound();
  }

  try {
    // Fetch dataset details on the server
    const dataset = await prisma.dataset.findUnique({ where: { id } });
    if (!dataset) {
      console.log('Dataset not found, returning 404');
      return notFound();
    }

    // Add type check for csvData property to ensure it is an array of objects
    const csvData = Array.isArray(dataset.csvData) ? dataset.csvData as { [key: string]: string | number }[] : [];

    console.log('Fetched Dataset:', { ...dataset, csvData }); // Log the fetched dataset with validated csvData

    // Pass dataset to the client component, including validated csvData
    return <DatasetPageWrapper dataset={{ ...dataset, csvData }} />;
  } catch (error) {
    console.error('Error fetching dataset:', error);
    return notFound();
  }
}
