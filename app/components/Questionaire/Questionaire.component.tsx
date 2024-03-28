'use client'

import { useLayoutEffect, useState } from "react";
import Question from "./Question.component";
import CompleteQuestionare from "./Complete.component";
import { QuestionaireProps } from "@/types/questionaire.types";
import { useTransition, animated, useSpringRef } from '@react-spring/web';
import { shuffleQuestions } from "@/app/helpers/questions";

interface QuestionaireComponentProps {
    questions: QuestionaireProps[];
}

export default function Questionaire({questions}: QuestionaireComponentProps) {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

    const springApi = useSpringRef();
    const [transitions] = useTransition(currentQuestion, () => ({
        from: {opacity: 0, x: '50%' },
        enter: {opacity: 1, x: '0'},
        leave: {opacity: 0, x: '-50%'},
        ref: springApi,
    }))

    useLayoutEffect(() => {
        springApi.start();
    }, [currentQuestion])

    const [answers, setAnswers] = useState<QuestionaireProps[]>(questions);
    const updateAnswer = (answer: string) => {
        const currentAnwser = answers[currentQuestion];
        answers[currentQuestion] = {
            ...currentAnwser,
            answer,
            correct: answer.toLowerCase() === currentAnwser.correct_answer.toLowerCase()
        }

        // update answers
        setAnswers([...answers]);
        setCurrentQuestion(currentQuestion + 1);
    }

    const resetQuestionaire = () => {
        setAnswers(shuffleQuestions(questions));
        setCurrentQuestion(0);
    }

    return (
        <form className="w-full relative" onSubmit={(e) => e.preventDefault()}>
            {transitions((springs, index) => (
                <animated.div style={springs} className="w-full h-full absolute top-0 left-0">
                    <div className="absolute w-full max-w-[480px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {index < answers.length ? (
                            <>
                                <Question question={answers[index]} updateAnswer={updateAnswer} />
                                <span className="inline-block text-xs mt-2">Question {index + 1}/{answers.length}</span>
                            </>
                        ) : (
                            <CompleteQuestionare answers={answers} reset={resetQuestionaire} />
                        )}
                    </div>
                </animated.div>
            ))}
        </form>
    )
}