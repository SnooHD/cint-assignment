'use server'

import { ApiQuestions } from '@/types/api.types';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
 
export async function GET() {
  const file = await fs.readFile(process.cwd() + '/app/api/questions/data.json', 'utf8');
  const questions = (JSON.parse(file)) as ApiQuestions;

  return NextResponse.json(questions);
}