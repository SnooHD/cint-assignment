import { Question } from "@/types/questionaire.types";
import Questionaire from "./components/Questionaire/Questionaire.component";
import { shuffle } from "./helpers/shuffle";
import { ApiQuestions } from "@/types/api.types";
import he from "he";

export default async function Home() {
  // fetch data
  const questions = await fetch('http://localhost:3000/api/questions')
    .then(async (res) => await res.json())
    .then((json: ApiQuestions) => {
      // handle HTML encoding so we don't have to use dangerouslySetInnerHTML
      const questions = json.results.map(({question, category, incorrect_answers = [], correct_answer, ...res}) => ({
        ...res,
        category: he.decode(category),
        question: he.decode(question),
        correct_answer: he.decode(correct_answer),
        incorrect_answers: incorrect_answers.map((answer) => he.decode(answer))
      }))

      return shuffle(questions);
    });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Questionaire questions={questions} />
    </main>
  );
}
