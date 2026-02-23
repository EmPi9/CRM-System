export default function IconButton({ onClick, type, icon, className }) {
    return (
        <button
            type={type}
            className={`icon ${className || ''}`}
            onClick={onClick}
        >
            <img src={icon} alt="icon" />
        </button>
    );
}