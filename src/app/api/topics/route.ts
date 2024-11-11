// /app/api/topics/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const topics = await prisma.dataset.findMany({
    select: {
      topic: true,
    },
    distinct: ['topic'],
  });

  const topicNames = topics.map((t) => t.topic);
  return NextResponse.json(topicNames);
}
