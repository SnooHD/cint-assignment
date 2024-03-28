import { decodeQuestions, shuffleQuestions } from "./helpers/questions";
import { ApiQuestionsProps } from "@/types/api.types";

import Questionaire from "./components/Questionaire/Questionaire.component";
import { getQuestionData } from "./api/questions/action";

export const revalidate = 0;

export default async function Home() {
  // get questions
  const questions = await getQuestionData()
    .then((json: ApiQuestionsProps) => decodeQuestions(json.results))
  
  return (
    <main className="flex min-h-screen p-6 sm:p-12 md:p-18 lg:p-24">
      <Questionaire questions={shuffleQuestions(questions)} />
    </main>
  );
}
