import styles from './IconButton.module.scss';
import { Size, Color } from '../types'

export interface IconButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>, 
    type?: "submit" | "reset" | "button", 
    icon: string, 
    size?: Size, 
    color?: Color,  
}

export default function IconButton({
    onClick, 
    type, 
    icon, 
    size = 'small', 
    color = 'primary',  
}: IconButtonProps) {
    return (
        <button
            type={type}
            className={`${styles.icon} ${styles[size]} ${styles[color]}`}
            onClick={onClick}
        >
            <img src={icon} alt="icon" />
        </button>
    );
}