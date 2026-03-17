import styles from './CheckBox.module.scss';
import { CheckBoxProps } from '../../types/components.types'

export default function CheckBox({ 
    onChange, 
    color = 'primary',  
    checked 
    }: CheckBoxProps) {

    return (
        <input type="checkbox" className={`${styles.checkbox} ${styles[color]}`} checked={checked} onChange={onChange}  />
    );
}
