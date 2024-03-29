import { Dispatch, SetStateAction, useEffect, useState } from "react";
import RadioInput from "../Form/RadioInput.component";

interface MultipleQuestionComponentProps {
    setAnwser: Dispatch<SetStateAction<string>>;
    name: string;
    options: string[];
    onSubmit: () => void;
}

export default function MultipleQuestion({ setAnwser, name, options, onSubmit }: MultipleQuestionComponentProps) {
    // normalize name
    const radioName = name.replace(/ /g, '_').replace(/[^a-z_]/gi, '').toLowerCase();

    // Using useEffect to handle the submit on enter so the 
    // answer state is set before we go to the next question
    const [submitOnEnter, setSubmitOnEnter] = useState(false);
    useEffect(() => {
        if(!submitOnEnter) return;
        onSubmit();
    }, [submitOnEnter])

    return (
        <div className="space-y-1">
            {options.map((option, index) => 
                <div key={`multipe-question-option-${option}-${index}`}>
                    <RadioInput 
                        onChange={setAnwser}
                        name={radioName}
                        autoFocus={index === 0 ? true : false}
                        label={option} 
                        onKeyUp={
                            // handle submit when pressing enter on
                            (e) => {
                                if(e.key === 'Enter'){
                                    setAnwser(option);
                                    setSubmitOnEnter(true);
                                }
                            }
                        } 
                    />
                </div>
            )}
        </div>
    )
}