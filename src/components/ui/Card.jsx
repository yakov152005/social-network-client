import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ children, className, ...props }) {
    return (
        <div className={cn('card bg-white shadow rounded-lg', className)} {...props}>
            {children}
        </div>
    );
}

export function CardContent({ children, className, ...props }) {
    return (
        <div className={cn('card-content p-4', className)} {...props}>
            {children}
        </div>
    );
}
