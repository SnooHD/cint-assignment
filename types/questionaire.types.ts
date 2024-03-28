export interface Question {
    category: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    type: 'text' | 'boolean' | 'multiple'
}

export interface MappedQuestion extends Question {
    answers?: string[];
}