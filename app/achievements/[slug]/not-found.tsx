import Link from "next/link";

export default function AchievementNotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6 max-w-md mx-auto px-4">
                <div className="relative">
                    <h1 className="font-[var(--font-bebas)] text-8xl text-accent opacity-20">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                    </div>
                </div>

                <h2 className="font-mono text-2xl">Achievement Not Found</h2>

                <p className="font-mono text-muted-foreground">
                    The certification or badge you're looking for doesn't exist or has been moved.
                </p>

                <Link
                    href="/#achievements"
                    className="inline-block px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-background transition-colors font-mono text-sm"
                >
                    ← Back to Achievements
                </Link>
            </div>
        </div>
    );
}
