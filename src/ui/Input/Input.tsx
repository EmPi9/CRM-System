export interface InputProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    placeholder?: string;
}

export default function CheckBox({ onChange, value, placeholder  }: InputProps ) {

    return (
       <input type="text" onChange={onChange} value={value} placeholder={placeholder} />
    );
}