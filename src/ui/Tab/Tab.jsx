import styles from './Tab.module.scss';

export default function Tab({ 
    onClick, 
    color = 'primary',  
    active = ' ', 
    children 
}) {

    return (
         <button
            className={`${styles.button_status} ${styles[color]} ${styles[active]}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}