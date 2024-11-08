// src/app/api/datasets/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const datasetId = parseInt(params.id, 10); // Convert datasetId to integer

  if (Number.isNaN(datasetId)) {
    console.error(`Invalid ID provided: datasetId=${datasetId}`);
    return NextResponse.json({ error: 'Dataset ID must be a valid integer' }, { status: 400 });
  }

  try {
    await prisma.dataset.delete({
      where: { id: datasetId },
    });
    return NextResponse.json({ message: 'Dataset deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting dataset:', error);
    return NextResponse.json({ error: 'Failed to delete dataset' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const datasets = await prisma.dataset.findMany({
      select: {
        id: true,
        name: true,
        url: true,
        topic: true,
        description: true,
        org: true,
        orgIcon: true,
        fileName: true,
      },
    });
    return NextResponse.json(datasets);
  } catch (error) {
    console.error('Error fetching datasets:', error);
    return NextResponse.json({ error: 'Failed to fetch datasets' }, { status: 500 });
  }
}
