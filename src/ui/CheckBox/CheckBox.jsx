import styles from './CheckBox.module.scss';

export default function CheckBox({ 
    onChange, 
    color = 'primary',  
    checked 
    }) {

    return (
        <input type="checkbox" className={`${styles.checkbox} ${styles[color]}`} checked={checked} onChange={onChange}  />
    );
}
