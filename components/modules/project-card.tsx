import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/data/projects";

interface ProjectCardProps {
    project: Project;
    index: number;
    truncateText: (text: string, maxLength: number) => string;
}

export function ProjectCard({ project, index, truncateText }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.slug}`}>
            <article
                className={cn(
                    "group relative cursor-pointer",
                    "transition-transform duration-500 ease-out",
                    "hover:-translate-y-2",
                    "overflow-hidden",
                )}
            >
                {/* Card */}
                <div className="relative bg-card border border-border/50 rounded-lg md:rounded-none md:border-t md:border-l md:border-r-0 md:border-b-0 p-0 h-full flex flex-col overflow-hidden">
                    {/* Top torn edge effect */}
                    <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent z-10" />

                    {/* Thumbnail 16:9 */}
                    <div className="relative w-full aspect-video overflow-hidden">
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                        {/* Issue number */}
                        <div className="flex items-baseline justify-between mb-3 sm:mb-4">
                            <div className="flex items-baseline gap-1 sm:gap-2">
                                <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                                    No. {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.3em] text-accent/40">
                                    / / / / /
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-[var(--font-bebas)] text-xl sm:text-2xl tracking-tight mb-1 sm:mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                            {project.title}
                        </h3>

                        {/* Service */}
                        <p className="font-mono text-[8px] sm:text-[10px] text-accent/70 mb-2 sm:mb-3 uppercase tracking-wider line-clamp-1">
                            {project.service}
                        </p>

                        {/* Divider line */}
                        <div className="w-8 sm:w-12 h-px bg-accent/60 mb-3 sm:mb-4 group-hover:w-full transition-all duration-500" />

                        {/* Description */}
                        <p className="font-mono text-[10px] sm:text-xs text-muted-foreground leading-relaxed mb-3 sm:mb-4 flex-grow line-clamp-3">
                            {truncateText(project.description, 80)}
                        </p>

                        {/* See Details button */}
                        <div className="mt-2 pt-1 sm:pt-2 border-t border-border/20">
                            <span className="inline-block font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-accent group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300">
                                See Details →
                            </span>
                        </div>
                    </div>

                    {/* Corner fold effect */}
                    <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-background rotate-45 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 border-t border-l border-border/30" />
                    </div>
                </div>

                {/* Shadow layer */}
                <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </article>
        </Link>
    );
}
