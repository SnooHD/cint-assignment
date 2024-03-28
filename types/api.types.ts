export interface ApiQuestionProps {
    category: string;
    difficulty: string;
    question: string;
    answers?: string[];
    correct_answer: string;
    incorrect_answers?: string[];
    type: 'text' | 'boolean' | 'multiple'
}


export interface ApiQuestionsProps {
    response_code: number;
    results: ApiQuestionProps[]
}

