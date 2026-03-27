import styles from './Tab.module.scss';
import { Color } from '../types'

export interface TabProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>, 
    color?: Color,  
    active: string, 
    children: React.ReactNode,
}

export default function Tab({ 
    onClick, 
    color = 'primary',  
    active = ' ', 
    children 
}: TabProps) {

    return (
         <button
            className={`${styles.button_status} ${styles[color]} ${styles[active]}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}