import { ApiQuestion } from "./api.types";

export interface Question extends Omit<ApiQuestion, 'type'> {}

export interface Questions {
    question: Question;
}