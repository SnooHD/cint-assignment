import { Questions } from "@/types/questionaire.types";

export default function TextQuestion({ question: { correct_answer, question } }: Questions) {
    return (
        <div>
            <h2>{question}</h2>
        </div>
    )
}