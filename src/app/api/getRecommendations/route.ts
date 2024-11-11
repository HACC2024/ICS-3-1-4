// app/api/getRecommendations/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const persona = searchParams.get('persona');

  if (!persona) {
    return NextResponse.json({ error: 'Persona is required' }, { status: 400 });
  }

  try {
    // Fetch recommendations with dataset details
    const recommendations = await prisma.personaRecommendation.findMany({
      where: { persona },
      include: {
        dataset: {
          select: {
            id: true,
            name: true,
            description: true,
            topic: true,
            org: true,
            orgIcon: true,
          },
        },
      },
    });

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}
