import styles from './CheckBox.module.scss';
import { Color } from '../../types/components.types'

export interface CheckBoxProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>, 
    color?: Color,  
    checked: boolean 
}

export default function CheckBox({ 
    onChange, 
    color = 'primary',  
    checked 
    }: CheckBoxProps) {

    return (
        <input type="checkbox" className={`${styles.checkbox} ${styles[color]}`} checked={checked} onChange={onChange}  />
    );
}
