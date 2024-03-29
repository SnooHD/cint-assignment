import { Dispatch, SetStateAction } from "react";
import RadioInput from "../Form/RadioInput.component";

interface MultipleQuestionComponentProps {
    setAnwser: Dispatch<SetStateAction<string>>;
    name: string;
    options: string[];
    answer: string;
}

export default function MultipleQuestion({ setAnwser, name, options, answer }: MultipleQuestionComponentProps) {
    // normalize name
    const radioName = name.replace(/ /g, '_').replace(/[^a-z_]/gi, '').toLowerCase();

    return (
        <div className="space-y-1">
            {options.map((option, index) => 
                <div key={`multipe-question-option-${option}-${index}`}>
                    <RadioInput 
                        onChange={setAnwser}
                        name={radioName}
                        checked={answer === option}
                        autoFocus={index === 0}
                        label={option}
                    />
                </div>
            )}
        </div>
    )
}