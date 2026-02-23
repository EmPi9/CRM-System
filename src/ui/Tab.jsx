export default function Tab({ onClick, className, children }) {

    return (
         <button
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    );
}