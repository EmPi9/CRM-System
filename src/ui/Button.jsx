export default function Button({ onClick, className, type, children }) {

    return (
         <button
            type={type}
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    );
}