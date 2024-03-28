import { ChangeEvent, Dispatch, InputHTMLAttributes, SetStateAction, useEffect, useLayoutEffect, useRef } from "react"

interface TextInputComponentProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label: string;
    onChange: Dispatch<SetStateAction<string>>;
}

export default function TextInput({onChange, label, ...attr}: TextInputComponentProps) {
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    }

    return (
        <input
            {...attr} 
            aria-label={label}
            autoFocus
            type="text"
            className="border rounded text-base px-2 py-1"
            onChange={onInputChange}
        />
    )
}