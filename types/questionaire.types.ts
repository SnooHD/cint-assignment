import { ApiQuestionProps } from "./api.types";

export type AnswerType = string;

export interface QuestionaireProps extends ApiQuestionProps {
    answer?: AnswerType;
    correct?: boolean;
}

export interface QuestionProps extends Omit<QuestionaireProps, 'type'> {}

export interface AnswerProps {
    question: QuestionProps;
    setAnswer: (answer: AnswerType) => void;
}