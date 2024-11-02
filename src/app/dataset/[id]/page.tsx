import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function DatasetPage({ params }: { params: { id: string | string[] } }) {
  const idString = Array.isArray(params?.id) ? params.id[0] : params.id;
  const id = Number(idString.replace(/[^\d]/g, ''));
  console.log('Parsed Numeric ID:', id); // Debugging: Log the parsed ID

  if (Number.isNaN(id)) {
    console.log('ID is NaN, returning 404'); // Additional Debugging
    return notFound();
  }

  const dataset = await prisma.dataset.findUnique({
    where: { id },
  });

  console.log('Queried Dataset:', dataset); // Log dataset result to verify if it’s found

  if (!dataset) {
    return notFound();
  }

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>{dataset.name}</h2>
      <p>
        This is a placeholder page displaying details for Dataset ID:
        {id}
      </p>
      <p>
        Views:
        {dataset.viewCount}
      </p>
    </main>
  );
}
