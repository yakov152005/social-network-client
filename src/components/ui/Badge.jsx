import React from "react";
import { cn } from "../../utils/cn";

export function Badge({ className, children, ...props }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800",
                className
            )}
            {...props}
        >
      {children}
    </span>
    );
}
