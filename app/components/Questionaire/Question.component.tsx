import { useEffect, useState } from "react";
import { QuestionaireProps } from "@/types/questionaire.types";
import Button from "../Button/Button.component";
import TextInput from "../Form/TextInput.component";
import MultipleQuestion from "./Multiple.component";

interface QuestionComponentProps {
    question: QuestionaireProps;
    updateAnswer?: (answer: string) => void;
}

export default function Question({question, updateAnswer}: QuestionComponentProps){
    const { question: questionText, type, answers, category } = question;
    const [answer, setAnswer] = useState('');

    // handle submit with error message
    const onSubmit = () => {
        if(!updateAnswer) return;
        updateAnswer(answer);
    }

    return (
        <div className="space-y-4 h-[280px] flex-col flex items-start justify-end">
            <div>
                <h2 className="text-xl">{questionText}</h2>
                <span className="inline-block bg-green-600 text-xs text-white px-1 rounded cursor-default" title="category">{category}</span>
            </div>
            {type === 'text' && (
                <TextInput 
                    label={questionText}
                    value={answer}
                    onChange={setAnswer}
                    onKeyUp={
                        // handle submit when pressing enter on
                        (e) => e.key === 'Enter' && onSubmit()
                    } 
                />
            )}

            {(type === 'multiple' || type === 'boolean') && (
                <MultipleQuestion options={answers as string[]} setAnwser={setAnswer} name={questionText} />
            )}

            <Button onClick={onSubmit} title="next">Next</Button>
        </div>
    )
}