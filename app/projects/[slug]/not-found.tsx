import Link from "next/link";
import { BackButton } from "@/components/layout/back-button";

export default function ProjectNotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6 text-center flex flex-col items-center">
                <h1 className="font-[var(--font-bebas)] text-6xl text-accent">404</h1>
                <h2 className="font-mono text-xl">Project Not Found</h2>
                <p className="font-mono text-muted-foreground">
                    The project you're looking for doesn't exist or has been moved.
                </p>
                <BackButton href="/projects" label="Back to Projects" />
            </div>
        </div>
    );
}
