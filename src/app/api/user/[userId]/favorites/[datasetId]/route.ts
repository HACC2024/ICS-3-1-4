// src/app/api/user/[id]/favorites/[datasetId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
export async function DELETE(req: NextRequest, { params }: { params: { userId: string; datasetId: string } }) {
  const userId = parseInt(params.userId, 10);
  const datasetId = parseInt(params.datasetId, 10);

  if (Number.isNaN(userId) || Number.isNaN(datasetId)) {
    console.error(`Invalid IDs provided: userId=${userId}, datasetId=${datasetId}`);
    return NextResponse.json({ error: 'User ID and Dataset ID must be valid integers' }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          disconnect: { id: datasetId },
        },
      },
    });
    return NextResponse.json({ message: 'Dataset removed from favorites successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error removing dataset from favorites:', error);
    return NextResponse.json({ error: 'Failed to remove dataset from favorites' }, { status: 500 });
  }
}
