"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { achievements } from "@/lib/data/achievements";
import { AchievementCard } from "./achievement-card";

gsap.registerPlugin(ScrollTrigger);


// Main Achievements Section Component
export function AchievementsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const displayedAchievements = achievements.slice(0, 3);

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

                const staggerValue = 0.15;

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
    }, []);

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

            {/* Swipable Grid container for mobile, regular grid for desktop */}
            <div
                ref={gridRef}
                className="flex sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-hide gap-4 sm:gap-6 md:gap-8 pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
            >
                {displayedAchievements.map((achievement, index) => (
                    <div key={achievement.id} className="min-w-full sm:min-w-0 snap-center">
                        <AchievementCard achievement={achievement} index={index} />
                    </div>
                ))}
            </div>

            {/* See More Button */}
            <div className="flex justify-center mt-12 sm:mt-16">
                <Link
                    href="/achievements"
                    className="group relative px-8 sm:px-10 py-3 sm:py-4 bg-transparent border border-accent/40 hover:border-accent transition-all duration-300 overflow-hidden"
                >
                    <span className="relative z-10 font-mono text-xs sm:text-sm uppercase tracking-wider text-accent group-hover:text-background transition-colors duration-300">
                        See More Achievements
                    </span>
                    <div className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
            </div>
        </section>
    );
}
