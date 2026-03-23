import styles from './Button.module.scss';
import { Size, Color } from '../../types/components.types';
export interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    size?: Size; 
    color?: Color; 
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
}

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