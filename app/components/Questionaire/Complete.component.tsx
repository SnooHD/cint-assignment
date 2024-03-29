import { QuestionProps } from "@/types/questionaire.types";

interface CompleteQuestionareComponentProps {
    answers: QuestionProps[];
}

export default function CompleteQuestionare({ answers }: CompleteQuestionareComponentProps) {
    const correctAnswers = answers.filter(({correct}) => correct).length;
    const inCorrectAnswers = answers.length - correctAnswers;
    const totalAnswered = answers.filter(({answer}) => answer).length;

    const getScore = () => {
        const result = (correctAnswers / answers.length) * 100;

        // round to 1 decimal
        return Math.round(result * 10) / 10;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl text-bold uppercase">Summary</h1>
            <p>
                Correct: <b>{correctAnswers}</b> <br/>
                Wrong: <b>{inCorrectAnswers}</b> <br/>
                Questions answered: <b>{totalAnswered}</b> <br/>
                Final Score: <b>{getScore()}%</b>
            </p>
        </div>
    )
}