'use client'

import { shuffle } from "@/app/helpers/shuffle";
import { MappedQuestion, Question } from "@/types/questionaire.types";

const mapData = (data: Question[]): MappedQuestion[] | undefined =>
    shuffle<MappedQuestion>(data.map((data) => ({
        ...data,
        answers: shuffle<string>([data.correct_answer, ...data.incorrect_answers])
    })));

export default function Questionaire() { 
    const data = mapData([{
        "category":"Science & Nature",
        "type":"text",
        "difficulty":"hard",
        "question":"Autosomal-dominant Compelling Helio-Ophthalmic Outburst syndrome is the need to do what when seeing the Sun?",
        "correct_answer":"Sneeze",
        "incorrect_answers":[
            "Cough",
            "Yawn",
            "Hiccup"
        ]
    }]);

    console.log(data);

    return (
        <form>
            {data && data.map(({type, answers}) => (
                <fieldset key={type}>
                    {type === 'text' && (
                        <span>
                            {answers && answers.map((a) => 
                                (<span>{a}</span>)
                            )}
                        </span>
                    )}
                </fieldset>
            ))}
        </form>
    )
}