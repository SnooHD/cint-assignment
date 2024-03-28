'use server';

import { ApiQuestionsProps } from '@/types/api.types';
import fs from 'fs';
import path from 'path';
 
export async function getQuestionData() {
  const usersPath = path.join(process.cwd(), '/app/action/data.json');
  const file = fs.readFileSync(usersPath, 'utf8');
  const questions = (JSON.parse(file)) as ApiQuestionsProps;

  return questions;
}