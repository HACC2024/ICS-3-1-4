// This file should remain a server component (do not add 'use client')
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import DatasetPageWrapper from '@/components/DatasetPageWrapper';

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

    console.log('Fetched Dataset:', dataset); // Log the fetched dataset, including jsonPath if available

    // Pass dataset to the client component
    return <DatasetPageWrapper dataset={dataset} />;
  } catch (error) {
    console.error('Error fetching dataset:', error);
    return notFound();
  }
}
