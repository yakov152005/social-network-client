import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export function Dialog({ open, onClose, children }) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="fixed top-1/2 left-1/2 z-50 bg-white rounded-lg w-[90%] max-w-md p-6"
                        initial={{ opacity: 0, y: "-50%", x: "-50%", scale: 0.9 }}
                        animate={{ opacity: 1, y: "-50%", x: "-50%", scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
export function DialogHeader({ children, className }) {
    return <div className={cn("border-b pb-3 mb-4 flex justify-between items-center", className)}>{children}</div>;
}

export function DialogTitle({ children, className }) {
    return <h3 className={cn("text-lg font-bold", className)}>{children}</h3>;
}

export function DialogContent({ children, className }) {
    return <div className={cn("max-h-[400px] overflow-y-auto", className)}>{children}</div>;
}
