import React from "react";
import { cn } from "../../utils/cn";

export function ScrollArea({ className, children }) {
    return (
        <div className={cn("relative overflow-auto", className)}>
            {children}
        </div>
    );
}

export function ScrollBar() {
    return null;
}