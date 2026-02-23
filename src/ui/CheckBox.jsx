export default function CheckBox({ onChange, className, checked }) {

    return (
        <input type="checkbox" className={className} checked={checked} onChange={onChange}  />
    );
}