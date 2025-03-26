import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Button } from "./Button";

export function AlertDialog({ open, onClose, children, className, ...props }) {
    return (
        <AnimatePresence>
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={cn('relative bg-white rounded-lg shadow-lg max-w-md w-full p-6 pointer-events-auto', className)}
                        onClick={(e) => e.stopPropagation()}
                        {...props}
                    >
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
export function AlertDialogHeader({ children, className, ...props }) {
    return (
        <div className={cn('mb-4', className)} {...props}>
             {children}
        </div>
    );
}

export function AlertDialogTitle({ children, className, ...props }) {
    return (
        <h2 className={cn('text-lg font-semibold mb-2', className)} {...props}>
            {children}
        </h2>
    );
}

export function AlertDialogContent({ children, className, ...props }) {
    return (
        <div className={cn('flex flex-col space-y-4', className)} {...props}>
            {children}
        </div>
    );
}

export function AlertDialogDescription({ children, className, ...props }) {
    return (
        <p className={cn('text-gray-600', className)} {...props}>
            {children}
        </p>
    );
}

export function AlertDialogFooter({ children, className, ...props }) {
    return (
        <div className={cn('mt-6 flex justify-end gap-2', className)} {...props}>
            {children}
        </div>
    );
}

export function AlertDialogCancel({ children, className, onClick, ...props }) {
    return (
        <Button
            variant="outline"
            className={cn("text-gray-700", className)}
            onClick={onClick}
            {...props}
        >
            {children}
        </Button>
    );
}

export function AlertDialogAction({ children, className, ...props }) {
    return (
        <Button className={cn("bg-red-600 hover:bg-red-700 text-white", className)} {...props}>
            {children}
        </Button>
    );
}
