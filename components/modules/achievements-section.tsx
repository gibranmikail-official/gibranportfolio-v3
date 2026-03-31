"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { achievements, Achievement } from "@/lib/achievements";

gsap.registerPlugin(ScrollTrigger);

// Achievement Card Component
function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
    return (
        <Link href={`/achievements/${achievement.slug}`}>
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
                    <div className="relative w-full aspect-video overflow-hidden bg-black/20">
                        <Image
                            src={achievement.image}
                            alt={achievement.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                        {/* Type Badge */}
                        <div className="absolute top-2 right-2">
                            <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider bg-accent/90 text-background px-2 py-1 rounded">
                                {achievement.type}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                        {/* Issue number and category */}
                        <div className="flex items-baseline justify-between mb-3 sm:mb-4">
                            <div className="flex items-baseline gap-1 sm:gap-2">
                                <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.3em] text-accent/40">
                                    / / / / /
                                </span>
                            </div>
                            <span className="font-mono text-[8px] sm:text-[10px] text-accent/70">
                                {achievement.category !== "No Data" ? achievement.category : achievement.type}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-[var(--font-bebas)] text-xl sm:text-2xl tracking-tight mb-1 sm:mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                            {achievement.name}
                        </h3>

                        {/* Issuing Organization */}
                        <p className="font-mono text-[8px] sm:text-[10px] text-accent/70 mb-2 sm:mb-3 uppercase tracking-wider line-clamp-1">
                            {achievement.issuing_organization}
                        </p>

                        {/* Divider line */}
                        <div className="w-8 sm:w-12 h-px bg-accent/60 mb-3 sm:mb-4 group-hover:w-full transition-all duration-500" />

                        {/* Issue Date */}
                        <p className="font-mono text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-4">
                            {achievement.issue_date}
                        </p>

                        {/* See Details button */}
                        <div className="mt-2 pt-1 sm:pt-2 border-t border-border/20">
                            <span className="inline-block font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-accent group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300">
                                View Certificate →
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

// Main Achievements Section Component
export function AchievementsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [showAllAchievements, setShowAllAchievements] = useState(false);
    const [isCollapsing, setIsCollapsing] = useState(false);

    const displayedAchievements = showAllAchievements ? achievements : achievements.slice(0, 3);

    const scrollToAchievementsSection = useCallback(() => {
        if (sectionRef.current) {
            const sectionTop = sectionRef.current.offsetTop;
            const offset = 80;

            window.scrollTo({
                top: sectionTop - offset,
                behavior: "smooth",
            });
        }
    }, []);

    const handleToggleAchievements = useCallback(() => {
        if (showAllAchievements) {
            setIsCollapsing(true);
            setShowAllAchievements(false);
        } else {
            setShowAllAchievements(true);
        }
    }, [showAllAchievements]);

    useEffect(() => {
        if (isCollapsing && !showAllAchievements) {
            requestAnimationFrame(() => {
                // Small delay to allow GSAP animations to complete
                // The delay should be slightly longer than the longest animation duration
                setTimeout(() => {
                    scrollToAchievementsSection();
                    setIsCollapsing(false);
                }, 150); // 150ms > 0.8s duration? Actually 0.8s is 800ms, but stagger makes it longer
                // Wait, the stagger duration is 0.8s total, but with 3 cards, the last one finishes at ~0.8s
                // Actually stagger 0.15s * 3 = 0.45s, plus duration 0.8s = 1.25s total
                // adjust for better timing
            });
        }
    }, [isCollapsing, showAllAchievements, scrollToAchievementsSection]);

    const handleToggleAchievementsWithAnimation = useCallback(() => {
        if (showAllAchievements) {
            const cards = gridRef.current?.querySelectorAll("article");

            if (cards && cards.length > 0) {
                const cardsToRemove = Array.from(cards).slice(3);
                if (cardsToRemove.length > 0) {
                    gsap.to(cardsToRemove, {
                        x: 100,
                        opacity: 0,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: "power2.in",
                        onComplete: () => {
                            setShowAllAchievements(false);
                            setIsCollapsing(false);
                            setTimeout(() => {
                                scrollToAchievementsSection();
                            }, 50);
                        },
                    });
                    setIsCollapsing(true);
                    return;
                }
            }
            // Fallback if no cards found
            setIsCollapsing(true);
            setShowAllAchievements(false);
        } else {
            setShowAllAchievements(true);
        }
    }, [showAllAchievements, scrollToAchievementsSection]);

    useEffect(() => {
        if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

        const section = sectionRef.current;

        const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            onEnter: () => {},
            onEnterBack: () => {},
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
    }, [showAllAchievements, isCollapsing]);

    return (
        <section
            id="achievements"
            ref={sectionRef}
            className="relative py-20 sm:py-32 pl-4 sm:pl-6 md:pl-28 pr-4 sm:pr-6 md:pr-12 border-t border-border/30"
        >
            {/* Section header */}
            <div ref={headerRef} className="mb-12 sm:mb-16 pr-4 sm:pr-6 md:pr-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    02 / Achievements
                </span>
                <h2 className="mt-4 font-[var(--font-bebas)] text-4xl sm:text-5xl md:text-7xl tracking-tight break-words">
                    CERTIFICATIONS & BADGES
                </h2>
            </div>

            {/* Grid container */}
            <div
                ref={gridRef}
                className={cn(
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8",
                    isCollapsing && "pointer-events-none opacity-90 transition-opacity duration-300",
                )}
            >
                {displayedAchievements.map((achievement, index) => (
                    <AchievementCard key={achievement.id} achievement={achievement} index={index} />
                ))}
            </div>

            {/* See More / See Less Button */}
            {achievements.length > 3 && (
                <div className="flex justify-center mt-12 sm:mt-16">
                    <button
                        ref={buttonRef}
                        onClick={handleToggleAchievements}
                        disabled={isCollapsing}
                        className={cn(
                            "group relative px-8 sm:px-10 py-3 sm:py-4 bg-transparent border border-accent/40 hover:border-accent transition-all duration-300 overflow-hidden",
                            isCollapsing && "opacity-50 cursor-wait",
                        )}
                    >
                        <span className="relative z-10 font-mono text-xs sm:text-sm uppercase tracking-wider text-accent group-hover:text-background transition-colors duration-300">
                            {showAllAchievements ? "See Less Achievements" : "See More Achievements"}
                        </span>
                        <div className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </button>
                </div>
            )}
        </section>
    );
}
