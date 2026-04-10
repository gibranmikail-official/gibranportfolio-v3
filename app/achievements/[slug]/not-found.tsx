import Link from "next/link";
import { BackButton } from "@/components/layout/back-button";

export default function AchievementNotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6 max-w-md mx-auto px-4 flex flex-col items-center text-center">
                <div className="relative w-full">
                    <h1 className="font-[var(--font-bebas)] text-8xl text-accent opacity-20">404</h1>
                </div>

                <h2 className="font-mono text-2xl">Achievement Not Found</h2>

                <p className="font-mono text-muted-foreground">
                    The certification or badge you're looking for doesn't exist or has been moved.
                </p>

                <BackButton href="/achievements" label="Back to Achievements" />
            </div>
        </div>
    );
}
