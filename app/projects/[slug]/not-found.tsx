import Link from "next/link";

export default function ProjectNotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6">
                <h1 className="font-[var(--font-bebas)] text-6xl text-accent">404</h1>
                <h2 className="font-mono text-xl">Project Not Found</h2>
                <p className="font-mono text-muted-foreground">
                    The project you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/#projects"
                    className="inline-block px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-background transition-colors font-mono text-sm"
                >
                    Back to Projects
                </Link>
            </div>
        </div>
    );
}
