import { HTMLAttributes, PropsWithChildren } from "react";

interface ButtonComponentProps extends HTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, ...attr }: PropsWithChildren<ButtonComponentProps>) {
    return (
        <button 
            {...attr}
            className={`
                block px-4 py-2
                bg-blue-500 hover:bg-blue-700
                transition-colors duration-300
                text-white text-base
            `}
            type="button"
        >
            {children}
        </button>
    )
}