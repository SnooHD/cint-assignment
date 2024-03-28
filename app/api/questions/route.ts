'use server'

import { promises as fs } from 'fs';
import { MappedQuestions, Question } from '@/types/questionaire.types'
import type { NextApiResponse } from 'next'
import { shuffle } from '@/app/helpers/shuffle';

const mapQuestions = (questions: Question[]) => {
 let mappedQuestions: MappedQuestions = {};
 questions.forEach(({category, incorrect_answers, correct_answer, ...question}) => {
    const answers = shuffle([...incorrect_answers, correct_answer]);
    mappedQuestions[category] = { answers, category, correct_answer, ...question }
 });

 return mappedQuestions;
}
 
export default async function handler(
  res: NextApiResponse<MappedQuestions>
) {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const questions = JSON.parse(file) as Question[];
  const mappedQuestions = mapQuestions(questions);

  res.status(200).json(mapQuestions(questions));
}