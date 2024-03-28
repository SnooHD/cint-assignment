'use client'

import TextQuestion from "./Text.component";
import MultipleQuestion from "./Multiple.component";
import BooleanQuestion from "./Boolean.component";
import { ApiQuestion } from "@/types/api.types";

export default function Questionaire({questions}: { questions: ApiQuestion[]}) { 
    return (
        <form>
            {questions && questions.map(({type, ...question}, index) => (
                <fieldset key={`question-${index}`}>
                    {type === 'text' && (
                        <TextQuestion question={question} />
                    )}
                    {type === 'multiple' && (
                        <MultipleQuestion question={question} />
                    )}
                    {type === 'text' && (
                        <BooleanQuestion question={question} />
                    )}
                </fieldset>
            ))}
        </form>
    )
}