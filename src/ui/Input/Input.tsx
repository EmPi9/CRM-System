import { Input } from 'antd'
import { VariantInput, Size } from '../types'

export interface InputProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
    placeholder?: string;
    variant?: VariantInput;
    size?: Size;
    style?: React.CSSProperties
}

export default function InputDefault({ 
    onChange, 
    value,
    variant,
    size,
    style,
    placeholder  
}: InputProps ) {

    return (
       <Input type="text" size={size} variant={variant} style={style} onChange={onChange} value={value} placeholder={placeholder} />
    );
}