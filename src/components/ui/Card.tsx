import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: "default" | "glass" | "outline";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "default", children, ...props }, ref) => {
        const variants = {
            default: "bg-white shadow-xl shadow-slate-200/50 border border-slate-100",
            glass: "bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl",
            outline: "border border-brand-100 bg-transparent",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl",
                    variants[variant],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = "Card";
