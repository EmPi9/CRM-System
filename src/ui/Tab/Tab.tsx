import styles from './Tab.module.scss';
import { TabProps } from '../../types/components.types'

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