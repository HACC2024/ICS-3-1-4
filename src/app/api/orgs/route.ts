// /app/api/topics/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const org = await prisma.dataset.findMany({
    select: {
      org: true,
    },
    distinct: ['org'],
  });

  const orgNames = org.map((t) => t.org);
  return NextResponse.json(orgNames);
}
