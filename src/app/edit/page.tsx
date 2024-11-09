// edit/page.tsx
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Dataset } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditDatasetForm from '@/components/EditDatasetForm';

export default async function EditDatasetPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  // console.log(id);
  const dataset: Dataset | null = await prisma.dataset.findUnique({
    where: { id },
  });
    // console.log(stuff);
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
