import { ApiQuestionProps } from "@/types/api.types";
import he from "he";

export const decodeQuestions = (questions: ApiQuestionProps[]):  ApiQuestionProps[] =>
    questions.map(
        ({question, category, incorrect_answers = [], correct_answer, ...res}) => {
            const incorrectAnswers = incorrect_answers.map((answer) => he.decode(answer));
            const correctAnswer = he.decode(correct_answer);
            const answers = [correctAnswer, ...incorrectAnswers];

            return {
                ...res,
                category: he.decode(category),
                question: he.decode(question),
                incorrect_answers,
                correct_answer,
                answers
            }
        }
    )

export const shuffleQuestions = (questions: ApiQuestionProps[]):  ApiQuestionProps[] => 
    shuffle(
        questions.map(
            ({answers = [], ...question}) => ({
                ...question,
                answers: shuffle(answers)
            }) 
        )
    )

export function shuffle<T = unknown>(data: T[]): T[] {
    // uses Fishery Yates shuffle to make sure its truelly random
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }

    return data;
}