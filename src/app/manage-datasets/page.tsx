import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import DatasetTable from '@/components/DatasetTable'; // Component to display all datasets
import UploadDatasetForm from '@/components/UploadDatasetForm'; // Component to upload a dataset

interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export default async function Page() {
  // Fetch session and typecast the user as CustomUser
  const session = await getServerSession(authOptions) as { user: CustomUser } | null;
  console.log('Session:', session); // Debugging log

  if (!session || !session.user || !session.user.id) {
    return notFound(); // Return 404 if no user is found
  }

  // Fetch all datasets in the database
  const datasets = await prisma.dataset.findMany({
    select: {
      id: true,
      name: true,
      url: true,
      topic: true,
      description: true,
      org: true,
    },
  });
  console.log('Datasets:', datasets); // Debugging log

  // Convert dataset IDs to strings to avoid type issues
  const allDatasets = datasets.map((dataset) => ({
    ...dataset,
    id: dataset.id.toString(),
  }));
  console.log('All Datasets:', allDatasets); // Debugging log

  return (
    <div>
      <h1>Manage Datasets</h1>

      {/* Render the UploadDatasetForm component */}
      <UploadDatasetForm userId={session.user.id} />

      {/* Render all datasets in the DatasetTable component */}
      <DatasetTable datasets={allDatasets} userId={session.user.id} isFavoritesContext={false} />
    </div>
  );
}
