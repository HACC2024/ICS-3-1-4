// src/app/api/upload-dataset/route.ts

import { NextRequest, NextResponse } from 'next/server';
import uploadDataset from '@/lib/uploadDataset';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const name = formData.get('name') as string;
  const url = formData.get('url') as string;
  const topic = formData.get('topic') as string;
  const description = formData.get('description') as string;
  const organization = formData.get('organization') as string;
  const userId = formData.get('userId') as string;

  if (!file || !name || !url || !topic || !description || !organization || !userId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const fileName = file.name;

  try {
    await uploadDataset({ file, name, url, fileName, topic, description, organization, userId });
    return NextResponse.json({ message: 'Dataset uploaded successfully' });
  } catch (error) {
    console.error('Error uploading dataset:', error);
    return NextResponse.json({ error: 'Failed to upload dataset' }, { status: 500 });
  }
}
