import React from "react";
import {cn} from "../../utils/cn";

export function Avatar({ src, alt, className }) {
    return (
        <div className={cn("w-10 h-10 rounded-full overflow-hidden", className)}>
            <img src={src} alt={alt} className="object-cover w-full h-full" />
        </div>
    );
}

export function Avatar1({ children, className }) {
    return (
        <div className={cn("relative w-10 h-10 rounded-full overflow-hidden bg-gray-200", className)}>
            {children}
        </div>
    );
}


export function AvatarImage({ src, alt, className }) {
    return (
        <img
            src={src}
            alt={alt || "Avatar"}
            className={`object-cover w-full h-full ${className}`}
        />
    );
}

export function AvatarFallback({ children, className }) {
    return (
        <div className={`flex items-center justify-center w-full h-full text-gray-500 text-sm ${className}`}>
            {children}
        </div>
    );
}