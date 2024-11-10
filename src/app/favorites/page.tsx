import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import ListFavoriteDatasetsPage from '@/components/ListFavoriteDatasetsPage';

interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export default async function Page() {
  // Fetch session and typecast the user as CustomUser
  const session = await getServerSession(authOptions) as { user: CustomUser } | null;

  if (!session || !session.user || !session.user.id) {
    return notFound(); // Return 404 if no user is found
  }

  const userId = parseInt(session.user.id, 10);

  // Fetch the favorite datasets for the authenticated user
  const userWithFavorites = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      favorites: {
        select: {
          id: true,
          name: true,
          url: true,
          topic: true,
          description: true,
          org: true,
          orgIcon: true,
        },
      },
    },
  });

  const datasets = userWithFavorites?.favorites.map((favorite) => ({
    ...favorite,
    id: favorite.id.toString(),
  })) || [];

  return (
    <div>
      <ListFavoriteDatasetsPage datasets={datasets} />
    </div>
  );
}
