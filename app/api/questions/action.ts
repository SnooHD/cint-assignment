'use server'

import { ApiQuestionsProps } from '@/types/api.types';
import { promises as fs } from 'fs';
 
export async function getQuestionData() {
  const file = await fs.readFile(process.cwd() + '/app/api/questions/data.json', 'utf8');
  const questions = (JSON.parse(file)) as ApiQuestionsProps;

  return questions;
}