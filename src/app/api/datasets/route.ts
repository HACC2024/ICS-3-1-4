import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // adjust the path if necessary

/* eslint-disable import/prefer-default-export */
export const GET = async () => {
  try {
    const datasets = await prisma.dataset.findMany({
      orderBy: { viewCount: 'desc' },
    });
    const response = NextResponse.json(datasets);
    response.headers.set('Cache-Control', 'no-store'); // Ensure no caching
    return response;
  } catch (error) {
    console.error('Error fetching datasets:', error);
    return NextResponse.json({ error: 'Unable to fetch datasets' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
