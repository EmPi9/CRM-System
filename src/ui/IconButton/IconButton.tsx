import styles from './IconButton.module.scss';
import { IconButtonProps } from '../../types/components.types'

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