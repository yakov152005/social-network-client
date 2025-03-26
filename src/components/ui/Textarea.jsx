import React from "react";
import { cn } from "../../utils/cn";

export function Textarea({ className, ...props }) {
    return (
        <textarea
            className={cn(
                "flex min-h-[80px] w-full rounded-md bg-gray-100 border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                className
            )}
            {...props}
        />
    );
}