import { projects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/modules/project-card";
import { BackButton } from "@/components/layout/back-button";
import Link from "next/link";

export default function ProjectsPage() {
    const truncateText = (text: string, maxLength: number = 80) => {
        if (!text || text === "-") return "No description available";
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    return (
        <main className="min-h-screen bg-background relative">
            <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

            {/* Sticky Header with Back Button */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 flex items-center justify-between">
                    <BackButton href="/#projects" label="Back to Home" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/60">
                        Total {projects.length} Projects
                    </span>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24">
                {/* Section header */}
                <div className="mb-12 sm:mb-20">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                        Work Archive
                    </span>
                    <h1 className="mt-4 font-[var(--font-bebas)] text-5xl sm:text-7xl md:text-8xl tracking-tight">
                        ALL PROJECTS
                    </h1>
                    <div className="mt-6 w-20 h-px bg-accent/60" />
                </div>

                {/* Grid container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            truncateText={truncateText}
                        />
                    ))}
                </div>

                {/* Simple Footer/Contact link */}
                <div className="mt-24 pt-12 border-t border-border/20 text-center">
                    <p className="font-mono text-xs text-muted-foreground mb-6 uppercase tracking-widest">
                        Interested in working together?
                    </p>
                    <Link
                        href="/#contact"
                        className="font-[var(--font-bebas)] text-3xl sm:text-4xl text-accent hover:opacity-80 transition-opacity tracking-tight"
                    >
                        LET'S CONNECT →
                    </Link>
                </div>
            </div>
        </main>
    );
}
