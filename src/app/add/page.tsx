import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddStuffForm from '@/components/AddStuffForm';

const AddStuff = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  return (
    <main>
      <AddStuffForm />
    </main>
  );
};

export default AddStuff;
