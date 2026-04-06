import { Checkbox, type CheckboxChangeEvent } from 'antd';
interface CheckBox {
    onChange: (e: CheckboxChangeEvent) => void,   
    checked: boolean 
}

export default function CheckBoxDefault({ 
    onChange, 
    checked 
    }: CheckBox) {

    return (
        <Checkbox
            onChange={onChange}
            checked={checked}
        ></Checkbox>
    );
}
