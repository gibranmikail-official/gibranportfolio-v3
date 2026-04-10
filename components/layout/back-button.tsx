import Link from "next/link";
import { cn } from "@/lib/utils";

interface BackButtonProps {
    href: string;
    label: string;
    className?: string;
}

export function BackButton({ href, label, className }: BackButtonProps) {
    return (
        <Link
            href={href}
            className={cn(
                "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors group",
                className
            )}
        >
            <svg
                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
            {label}
        </Link>
    );
}
