import styles from './Button.module.scss';

export default function Button({ 
    onClick, 
    size = 'large', 
    color = 'primary', 
    type = 'button', 
    children 
}) {

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