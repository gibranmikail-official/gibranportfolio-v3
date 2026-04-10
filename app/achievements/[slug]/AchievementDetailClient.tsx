"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Achievement } from "@/lib/data/achievements";
import { BackButton } from "@/components/layout/back-button";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface AchievementDetailClientProps {
    achievement: Achievement;
}

export function AchievementDetailClient({ achievement }: AchievementDetailClientProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current && contentRef.current) {
            // Entrance animation
            gsap.fromTo(
                containerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power2.out" },
            );

            gsap.fromTo(
                contentRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out" },
            );
        }
    }, []);

    return (
        <main className="min-h-screen bg-background">
            {/* Sticky Back Button */}
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <BackButton href="/achievements" label="Back to Achievements" />
                </div>
            </div>

            {/* Main Content */}
            <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Certificate Image */}
                    <div className="relative">
                        <div className="sticky top-24">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-card border border-border/50 shadow-xl">
                                <Image
                                    src={achievement.image}
                                    alt={achievement.name}
                                    fill
                                    className="object-contain p-4"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                            {/* Type Badge */}
                            <div className="absolute top-4 right-4">
                                <span
                                    className={cn(
                                        "font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded",
                                        achievement.type === "Certificate"
                                            ? "bg-accent text-background"
                                            : "bg-accent/20 text-accent border border-accent/40",
                                    )}
                                >
                                    {achievement.type}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Achievement Details */}
                    <div className="space-y-8">
                        {/* Header */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                                    Achievement
                                </span>
                                <div className="flex-1 h-px bg-accent/30" />
                            </div>
                            <h1 className="font-[var(--font-bebas)] text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-4">
                                {achievement.name}
                            </h1>
                            <div className="w-16 h-px bg-accent/60" />
                        </div>

                        {/* Issuing Organization */}
                        <div className="space-y-2">
                            <h2 className="font-mono text-xs uppercase tracking-wider text-accent">
                                Issuing Organization
                            </h2>
                            <p className="font-mono text-base sm:text-lg text-foreground/80">
                                {achievement.issuing_organization}
                            </p>
                        </div>

                        {/* Issue Date */}
                        <div className="space-y-2">
                            <h2 className="font-mono text-xs uppercase tracking-wider text-accent">
                                Issue Date
                            </h2>
                            <p className="font-mono text-base sm:text-lg text-foreground/80">
                                {achievement.issue_date}
                            </p>
                        </div>

                        {/* Credential ID */}
                        {achievement.credential_id !== "-" && (
                            <div className="space-y-2">
                                <h2 className="font-mono text-xs uppercase tracking-wider text-accent">
                                    Credential ID
                                </h2>
                                <div className="group relative">
                                    <code className="font-mono text-sm bg-muted/30 px-3 py-2 rounded border border-border/50 inline-block">
                                        {achievement.credential_id}
                                    </code>
                                    <button
                                        onClick={() =>
                                            navigator.clipboard.writeText(achievement.credential_id)
                                        }
                                        className="ml-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors"
                                        aria-label="Copy credential ID"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Copy
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Category */}
                        {achievement.category !== "No Data" && (
                            <div className="space-y-2">
                                <h2 className="font-mono text-xs uppercase tracking-wider text-accent">
                                    Category
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    <span className="font-mono text-sm bg-accent/5 text-muted-foreground px-3 py-1.5 rounded">
                                        {achievement.category}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Skills (Optional - if you add to your data) */}
                        {achievement.skills && achievement.skills.length > 0 && (
                            <div className="space-y-2">
                                <h2 className="font-mono text-xs uppercase tracking-wider text-accent">
                                    Skills Gained
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {achievement.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="font-mono text-xs text-muted-foreground bg-accent/5 px-2.5 py-1 rounded"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Full Description */}
                        {achievement.fullDescription !== "No Data" && (
                            <div className="space-y-3 pt-4 border-t border-border/30">
                                <h2 className="font-mono text-xs uppercase tracking-wider text-accent">
                                    About this Achievement
                                </h2>
                                <div className="prose prose-invert max-w-none">
                                    <p className="font-mono text-sm sm:text-base text-foreground/70 leading-relaxed">
                                        {achievement.fullDescription}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Duration (Optional - if you add to your data) */}
                        {achievement.duration && (
                            <div className="pt-4">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/20 rounded-full">
                                    <svg
                                        className="w-4 h-4 text-accent"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="font-mono text-xs text-muted-foreground">
                                        Duration: {achievement.duration}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
