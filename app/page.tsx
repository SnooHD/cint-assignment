import Questionaire from "./components/Questionaire/Questionaire.component";
import { mapQuestions, shuffle } from "./helpers/questions";
import { ApiQuestionsProps } from "@/types/api.types";

export default async function Home() {
  // fetch data
  const questions = await fetch('http://localhost:3000/api/questions')
    .then(async (res) => await res.json())
    .then((json: ApiQuestionsProps) => shuffle(mapQuestions(json.results)));

  return (
    <main className="flex min-h-screen p-6 sm:p-12 md:p-18 lg:p-24">
      <Questionaire questions={questions} />
    </main>
  );
}
