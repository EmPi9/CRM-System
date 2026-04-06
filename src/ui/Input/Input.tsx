import { Input } from 'antd'
import { VariantInput, Size } from '../types'

interface Input {
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
}: Input ) {

    return (
       <Input type="text" size={size} variant={variant} style={style} onChange={onChange} value={value} placeholder={placeholder} />
    );
}