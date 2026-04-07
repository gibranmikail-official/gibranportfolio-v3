"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data/projects";

gsap.registerPlugin(ScrollTrigger);

export function ProjectSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [effectTrigger, setEffectTrigger] = useState(0);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [isCollapsing, setIsCollapsing] = useState(false);

    const truncateText = (text: string, maxLength: number = 80) => {
        if (!text || text === "-") return "No description available";
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

    const scrollToProjectsSection = useCallback(() => {
        if (sectionRef.current) {
            const sectionTop = sectionRef.current.offsetTop;
            window.scrollTo({
                top: sectionTop,
                behavior: "smooth",
            });
        }
    }, []);

    const handleToggleProjects = useCallback(() => {
        if (showAllProjects) {
            setIsCollapsing(true);
            setShowAllProjects(false);
        } else {
            setShowAllProjects(true);
        }
    }, [showAllProjects]);

    useEffect(() => {
        if (isCollapsing && !showAllProjects) {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    scrollToProjectsSection();
                    setIsCollapsing(false);
                }, 100);
            });
        }
    }, [isCollapsing, showAllProjects, scrollToProjectsSection]);

    useEffect(() => {
        if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

        const section = sectionRef.current;

        const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            onEnter: () => {
                setEffectTrigger((prev) => prev + 1);
            },
            onEnterBack: () => {
                setEffectTrigger((prev) => prev + 1);
            },
        });

        const headerAnimation = gsap.fromTo(
            headerRef.current,
            { x: -60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            },
        );

        return () => {
            trigger.kill();
            headerAnimation.kill();
        };
    }, []);

    useEffect(() => {
        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll("article");
            if (cards.length > 0) {
                const existingAnimations = gsap.getTweensOf(cards);
                existingAnimations.forEach((animation) => animation.kill());

                const staggerValue = isCollapsing ? 0.05 : 0.15;

                const cardsAnimation = gsap.fromTo(
                    cards,
                    { x: -100, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: staggerValue,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    },
                );

                return () => {
                    if (cardsAnimation) cardsAnimation.kill();
                };
            }
        }
    }, [showAllProjects, effectTrigger, isCollapsing]);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative py-20 sm:py-32 pl-4 sm:pl-6 md:pl-28 pr-4 sm:pr-6 md:pr-12 border-t border-border/30"
        >
            {/* Section header */}
            <div ref={headerRef} className="mb-12 sm:mb-16 pr-4 sm:pr-6 md:pr-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    05 / Projects
                </span>
                <h2 className="mt-4 font-[var(--font-bebas)] text-4xl sm:text-5xl md:text-7xl tracking-tight break-words">
                    SELECTED WORK
                </h2>
            </div>

            {/* Grid container */}
            <div
                ref={gridRef}
                className={cn(
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8",
                    isCollapsing && "pointer-events-none",
                )}
            >
                {displayedProjects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        trigger={effectTrigger}
                        truncateText={truncateText}
                    />
                ))}
            </div>

            {/* See More / See Less Button */}
            <div className="flex justify-center mt-12 sm:mt-16">
                <button
                    onClick={handleToggleProjects}
                    disabled={isCollapsing}
                    className={cn(
                        "group relative px-8 sm:px-10 py-3 sm:py-4 bg-transparent border border-accent/40 hover:border-accent transition-all duration-300 overflow-hidden",
                        isCollapsing && "opacity-50 cursor-wait",
                    )}
                >
                    <span className="relative z-10 font-mono text-xs sm:text-sm uppercase tracking-wider text-accent group-hover:text-background transition-colors duration-300">
                        {showAllProjects ? "See Less Projects" : "See More Projects"}
                    </span>
                    <div className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
            </div>
        </section>
    );
}

function ProjectCard({
    project,
    index,
    truncateText,
}: {
    project: any;
    index: number;
    trigger: number;
    truncateText: (text: string, maxLength: number) => string;
}) {
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
