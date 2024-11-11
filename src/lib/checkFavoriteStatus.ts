// pages/api/checkFavoriteStatus.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, datasetId } = req.query;

  if (!userId || !datasetId) {
    return res.status(400).json({ error: 'Missing userId or datasetId' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId as string, 10) },
      include: { favorites: true },
    });

    const isFavorite = user?.favorites.some((favorite) => favorite.id === parseInt(datasetId as string, 10));
    return res.status(200).json({ isFavorite });
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return res.status(500).json({ error: 'Failed to check favorite status' });
  }
}
