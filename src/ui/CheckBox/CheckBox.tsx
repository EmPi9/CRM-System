import { Checkbox, type CheckboxChangeEvent } from 'antd';
export interface CheckBoxProps {
    onChange: (e: CheckboxChangeEvent) => void,   
    checked: boolean 
}

export default function CheckBoxDefault({ 
    onChange, 
    checked 
    }: CheckBoxProps) {

    return (
        <Checkbox
            onChange={onChange}
            checked={checked}
        ></Checkbox>
    );
}
