export interface ApiQuestion {
    category: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers?: string[];
    type: 'text' | 'boolean' | 'multiple'
}

export interface ApiQuestions {
    response_code: number;
    results: ApiQuestion[]
}

