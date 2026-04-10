import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/data/projects";
import Image from "next/image";
import Link from "next/link";
import { BackButton } from "@/components/layout/back-button";
import { ProjectGallery } from "@/components/modules/project-gallery";

interface ProjectPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const slugs = getAllProjectSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const project = getProjectBySlug(params.slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} | Your Portfolio`,
        description: project.fullDescription || project.description,
    };
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const project = getProjectBySlug(params.slug);

    // Return 404 if project not found
    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Back Button */}
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <BackButton href="/projects" label="Back to Projects" />
                </div>
            </div>

            {/* Project Content */}
            <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Header Section */}
                <header className="mb-12 lg:mb-16">
                    <div className="flex flex-col gap-4">
                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                            {project.service}
                        </span>
                        <h1 className="font-[var(--font-bebas)] text-4xl sm:text-5xl lg:text-7xl tracking-tight">
                            {project.title}
                        </h1>
                        <div className="w-16 h-px bg-accent/60" />
                    </div>
                </header>

                {/* Gallery Section */}
                {project.gallery && project.gallery.length > 0 && (
                    <section className="mb-12 lg:mb-16">
                        <ProjectGallery images={project.gallery} title={project.title} />
                    </section>
                )}

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <section>
                            <h2 className="font-mono text-sm uppercase tracking-wider text-accent mb-4">
                                About the Project
                            </h2>
                            <div className="prose prose-invert max-w-none">
                                <p className="font-mono text-base text-foreground/80 leading-relaxed">
                                    {project.fullDescription !== "-"
                                        ? project.fullDescription
                                        : project.description}
                                </p>
                            </div>
                        </section>

                        {/* Challenges */}
                        {project.challenges && project.challenges !== "-" && (
                            <section>
                                <h2 className="font-mono text-sm uppercase tracking-wider text-accent mb-4">
                                    Challenges & Solutions
                                </h2>
                                <p className="font-mono text-base text-foreground/70 leading-relaxed">
                                    {project.challenges}
                                </p>
                            </section>
                        )}

                        {/* Outcome */}
                        {project.outcome && project.outcome !== "-" && (
                            <section>
                                <h2 className="font-mono text-sm uppercase tracking-wider text-accent mb-4">
                                    Outcome & Impact
                                </h2>
                                <p className="font-mono text-base text-foreground/70 leading-relaxed">
                                    {project.outcome}
                                </p>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        {/* Tags */}
                        <div className="bg-card border border-border/50 rounded-lg p-6">
                            <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-4">
                                Technologies & Tools
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-accent/5 px-3 py-1.5 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="bg-card border border-border/50 rounded-lg p-6">
                            <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-4">
                                Project Info
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="font-mono text-[10px] uppercase text-muted-foreground block mb-1">
                                        Service
                                    </span>
                                    <span className="font-mono text-sm text-foreground">
                                        {project.service}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </article>
        </main>
    );
}
