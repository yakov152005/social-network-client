import React from 'react';
import { cn } from '../../utils/cn';

export function Select({ children, isOpen, toggleOpen, selectedValue, handleSelect, className, ...props }) {
    return (
        <div className={cn('select relative', className)} {...props}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, { isOpen, toggleOpen, selectedValue, handleSelect })
            )}
        </div>
    );
}



export function SelectTrigger({ children, toggleOpen, className }) {
    return (
        <button
            type="button"
            className={cn('select-trigger px-4 py-2 border rounded-md', className)}
            onClick={toggleOpen}
        >
            {children}
        </button>
    );
}


export function SelectContent({ children, isOpen, handleSelect, selectedValue, className }) {
    if (!isOpen) return null;

    return (
        <div className={cn('select-content absolute mt-1 w-full bg-white shadow-lg rounded-md', className)}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, { handleSelect, selectedValue })
            )}
        </div>
    );
}


export function SelectItem({ value, children, handleSelect, className }) {
    return (
        <div
            className={cn('select-item px-4 py-2 hover:bg-gray-100 cursor-pointer', className)}
            onClick={() => handleSelect(value)}
        >
            {children}
        </div>
    );
}


export function SelectValue({ selectedValue, placeholder, className }) {
    return (
        <span className={cn('select-value', className)}>
            {selectedValue || placeholder}
        </span>
    );
}


