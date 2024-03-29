'use client'

import { useLayoutEffect, useState } from "react";
import Question from "./Question.component";
import CompleteQuestionare from "./Complete.component";
import { QuestionaireProps } from "@/types/questionaire.types";
import { useTransition, animated, useSpringRef } from '@react-spring/web';
import { shuffleQuestions } from "@/app/helpers/questions";
import Button from "../Button/Button.component";

interface QuestionaireComponentProps {
    questions: QuestionaireProps[];
}

export default function Questionaire({questions}: QuestionaireComponentProps) {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

    // question slide animation
    const slideRef = useSpringRef();
    const [slideTransition] = useTransition(currentQuestion, () => ({
        from: {opacity: 0, x: '50%' },
        enter: {opacity: 1, x: '0'},
        leave: {opacity: 0, x: '-50%'},
        ref: slideRef,
    }))

    useLayoutEffect(() => {
        slideRef.start();
    }, [currentQuestion])

    // next button fade in animation
    const fadeInRef = useSpringRef();
    const [fadeInTransition] = useTransition(null, () => ({
        from: {opacity: 0 },
        enter: {opacity: 1},
        ref: fadeInRef,
    }))

    useLayoutEffect(() => {
        fadeInRef.start();
    }, [])

    // handle answers
    const [answer, setAnswer] = useState('');
    const [answers, setAnswers] = useState<QuestionaireProps[]>(questions);
    const onSubmit = () => {
        const currentAnwser = answers[currentQuestion];
        answers[currentQuestion] = {
            ...currentAnwser,
            answer,
            correct: answer.toLowerCase() === currentAnwser.correct_answer.toLowerCase()
        }

        // update answers
        setAnswers([...answers]);

        // reset answer
        setAnswer('');

        // go to next question
        setCurrentQuestion(currentQuestion + 1);
    }

    const resetQuestionaire = () => {
        setAnswers(shuffleQuestions(questions));
        setCurrentQuestion(0);
    }

    const isComplete = () => currentQuestion < answers.length;

    return (
        <form className="w-full flex justify-center" onSubmit={(e) => e.preventDefault()}>
            <div className="w-full h-full flex flex-col justify-center w-full max-w-question">
                <div className="h-question w-full relative">
                    {slideTransition((springs, index) => (
                        <animated.div style={springs} className="absolute w-full h-full top-0 left-0">
                            <section className="flex h-full flex-col justify-end pb-4">
                                {index < answers.length ? (
                                    <Question 
                                        question={answers[index]}
                                        answer={answer}
                                        setAnswer={setAnswer}
                                        onSubmit={onSubmit} 
                                    />
                                ) : (
                                    <CompleteQuestionare answers={answers} />
                                )}
                            </section>
                        </animated.div>
                    ))}
                </div>
                {fadeInTransition((springs) => (
                    <animated.div style={springs} className="w-full">
                        <Button 
                            onClick={
                                () => isComplete() ? onSubmit() : resetQuestionaire()
                            } 
                            title="next"
                        >
                            {isComplete() ? 'Next' : 'Restart'}
                        </Button>
                        <div className="text-xs mt-2 h-4">
                            {isComplete() &&
                                `Question ${currentQuestion + 1}/${answers.length}`
                            }
                        </div>
                    </animated.div>
                ))}
            </div>
        </form>
    )
}