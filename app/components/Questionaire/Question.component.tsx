import { Dispatch, SetStateAction } from "react";
import { QuestionaireProps } from "@/types/questionaire.types";
import TextInput from "../Form/TextInput.component";
import MultipleQuestion from "./Multiple.component";

interface QuestionComponentProps {
    question: QuestionaireProps;
    answer: string;
    setAnswer: Dispatch<SetStateAction<string>>;
}

export default function Question({question, answer, setAnswer}: QuestionComponentProps){
    const { question: questionText, type, answers, category } = question;

    return (
        <div className="space-y-4 flex-col flex items-start justify-end">
            <div>
                <h2 className="text-xl">{questionText}</h2>
                <span className="inline-block bg-green-600 text-xs text-white px-1 rounded cursor-default" title="category">{category}</span>
            </div>
            {type === 'text' && (
                <TextInput 
                    label={questionText}
                    value={answer}
                    onChange={setAnswer}
                />
            )}

            {(type === 'multiple' || type === 'boolean') && (
                <MultipleQuestion 
                    options={answers as string[]}
                    answer={answer}
                    setAnwser={setAnswer}
                    name={questionText} 
                />
            )}
        </div>
    )
}