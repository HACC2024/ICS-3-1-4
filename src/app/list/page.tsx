// src/app/list/page.tsx

import React from 'react';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import ListFavoriteDatasetsPage from '@/components/ListFavoritesDatasetsPage';

// Define the type of session.user
interface User {
  id: number;
  name?: string | null | undefined;
  email?: string | null | undefined;
}

export default async function Page() {
  // Get the session to retrieve the user ID
  const session: { user: User } | null = await getServerSession(authOptions);

  // Ensure the page is protected, accessible only to logged-in users
  if (!session || !session.user || !session.user.id) {
    return notFound(); // Redirect to a 404 or another page if no user is found
  }

  const userId = session.user.id; // Extract user ID from the session

  return (
    <div>
      <ListFavoriteDatasetsPage userId={userId} />
    </div>
  );
}
