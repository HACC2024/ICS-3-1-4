// src/app/api/upload-dataset/route.ts

import { NextRequest, NextResponse } from 'next/server';
import uploadDataset from '@/lib/uploadDataset';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const name = formData.get('name') as string;
  const url = formData.get('url') as string;

  if (!file || !name || !url) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    await uploadDataset({ file, name, url });
    return NextResponse.json({ message: 'Dataset uploaded successfully' });
  } catch (error) {
    console.error('Error uploading dataset:', error);
    return NextResponse.json({ error: 'Failed to upload dataset' }, { status: 500 });
  }
}
