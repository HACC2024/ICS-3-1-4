import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // adjust the path if necessary

export const dynamic = 'force-dynamic'; // Ensures dynamic rendering for each request

/* eslint-disable import/prefer-default-export */
export const GET = async () => {
  try {
    const datasets = await prisma.dataset.findMany({
      orderBy: {
        viewCount: 'desc',
      },
    });
    return NextResponse.json(datasets);
  } catch (error) {
    console.error('Error fetching datasets:', error);
    return NextResponse.json({ error: 'Unable to fetch datasets' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
