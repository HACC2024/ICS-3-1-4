// src/app/api/user/[id]/favorites/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = parseInt(params.id, 10);

  // Validate userId
  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: 'User ID must be a valid integer' }, { status: 400 });
  }

  try {
    // Fetch the user and include their favorite datasets
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: true },
    });

    // Handle case where user does not exist
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the list of favorite datasets
    return NextResponse.json(user.favorites, { status: 200 });
  } catch (error) {
    console.error('Error fetching favorite datasets:', error);
    return NextResponse.json({ error: 'Error fetching favorite datasets' }, { status: 500 });
  }
}
