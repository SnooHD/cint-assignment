'use server'

import { ApiQuestionsProps } from '@/types/api.types';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
 
export async function GET() {
  const file = await fs.readFile(process.cwd() + '/app/api/questions/data.json', 'utf8');
  const questions = (JSON.parse(file)) as ApiQuestionsProps;

  return NextResponse.json(questions);
}