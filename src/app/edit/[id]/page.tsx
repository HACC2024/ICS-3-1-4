import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Dataset } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditDatasetForm from '@/components/EditDatasetForm';

export default async function EditDatasetPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged-in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Extract and validate `id`
  const rawId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const id = Number(rawId);

  if (Number.isNaN(id)) {
    return notFound(); // Handle invalid `id` gracefully
  }

  // Fetch the dataset
  const dataset: Dataset | null = await prisma.dataset.findUnique({
    where: { id },
  });

  if (!dataset) {
    return notFound();
  }

  return (
    <main>
      <h1>Edit Dataset</h1>
      <EditDatasetForm dataset={dataset} />
    </main>
  );
}
