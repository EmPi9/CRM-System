import styles from './Button.module.scss';
import { ButtonProps } from '../../types/components.types';

export default function Button({ 
    onClick, 
    size = 'large', 
    color = 'primary', 
    type = 'button', 
    children 
}: ButtonProps) {

    return (
         <button
            type={type}
            className={`${styles.button} ${styles[size]} ${styles[color]}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}