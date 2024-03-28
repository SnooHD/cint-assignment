import { QuestionProps } from "@/types/questionaire.types";
import Button from "../Button/Button.component";

interface CompleteQuestionareComponentProps {
    answers: QuestionProps[];
    reset: () => void;
}

export default function CompleteQuestionare({ answers, reset }: CompleteQuestionareComponentProps) {
    const correctAnswers = answers.filter(({correct}) => correct).length;
    const inCorrectAnswers = answers.length - correctAnswers;
    const totalAnswered = answers.filter(({answer}) => answer).length;

    return (
        <div className="space-y-4 h-[300px] flex-col flex items-start justify-end">
            <h1 className="text-xl text-bold uppercase">Summary</h1>
            <p>
                Correct: <b>{correctAnswers}</b> <br/>
                Wrong: <b>{inCorrectAnswers}</b> <br/>
                Questions answered: <b>{totalAnswered}</b> <br/>
                Final Score: <b>{(correctAnswers / answers.length) * 100}%</b>
            </p>
            <Button onClick={reset} title="restart">Restart</Button>
        </div>
    )
}