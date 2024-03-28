import { ChangeEvent, Dispatch, InputHTMLAttributes, SetStateAction, useId } from "react"

interface RadioInputComponentProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange: Dispatch<SetStateAction<string>>;
    label: string;
}

export default function RadioInput({onChange, label, ...attr}: RadioInputComponentProps) {
    const id = useId();
    
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    }

    return (
        <div className="cursor-pointer">
            <input {...attr} id={id} type="radio" onChange={onInputChange} className="cursor-pointer" />
            <label htmlFor={id} className="ml-2 text-base cursor-pointer">{label}</label>
        </div>
    )
}