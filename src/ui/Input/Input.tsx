import { InputProps } from '../../types/components.types'

export default function CheckBox({ onChange, value, placeholder  }: InputProps ) {

    return (
       <input type="text" onChange={onChange} value={value} placeholder={placeholder} />
    );
}