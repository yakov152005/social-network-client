export function Input({ className, ...props}) {
    return (
        <input
            {...props}
            className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
    );
}
export function Input2({ className, ...props }) {
    return (
        <input
            {...props}
            className={`border rounded-lg py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
    );
}
