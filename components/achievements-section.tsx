"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Data achievements
const achievements = [
    {
        id: "cert1",
        name: "Comming Soon",
        issuing_organization: "Classified",
        issue_date: "No Date",
        image: "/CS.png",
        type: "Certificate",
        category: "No Data",
        credential_id: "-",
        fullDescription: "No Data",
    },
    {
        id: "cert2",
        name: "Comming Soon",
        issuing_organization: "Classified",
        issue_date: "No Date",
        image: "/CS.png",
        type: "Certificate",
        category: "No Data",
        credential_id: "-",
        fullDescription: "No Data",
    },
    {
        id: "cert3",
        name: "Comming Soon",
        issuing_organization: "Classified",
        issue_date: "No Date",
        image: "/CS.png",
        type: "Badge",
        category: "No Data",
        credential_id: "-",
        fullDescription: "No Data",
    },
    {
        id: "cert4",
        name: "Comming Soon",
        issuing_organization: "Classified",
        issue_date: "No Date",
        image: "/CS.png",
        type: "Certificate",
        category: "No Data",
        credential_id: "-",
        fullDescription: "No Data",
    },
    {
        id: "cert5",
        name: "Comming Soon",
        issuing_organization: "Classified",
        issue_date: "No Date",
        image: "/CS.png",
        type: "Certificate",
        category: "No Data",
        credential_id: "-",
        fullDescription: "No Data",
    },
    {
        id: "cert6",
        name: "Comming Soon",
        issuing_organization: "Classified",
        issue_date: "No Date",
        image: "/CS.png",
        type: "Certificate",
        category: "No Data",
        credential_id: "-",
        fullDescription: "No Data",
    },
];

// Achievement Modal Component
const AchievementModal = ({
    achievement,
    isOpen,
    onClose,
}: {
    achievement: any;
    isOpen: boolean;
    onClose: () => void;
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            if (modalRef.current) {
                gsap.fromTo(
                    modalRef.current,
                    { opacity: 0, scale: 0.95, y: 20 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" },
                );
            }
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen || !achievement) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
            <div
                ref={modalRef}
                className="relative w-full max-w-[95%] sm:max-w-2xl md:max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border/50 rounded-lg shadow-2xl"
            >
                <div className="relative">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 p-1.5 sm:p-2 bg-black/50 hover:bg-accent/80 transition-colors duration-200 backdrop-blur-sm rounded"
                    >
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Certificate Image - 16:9 */}
                    <div className="relative w-full aspect-video bg-black/50 overflow-hidden rounded-t-lg">
                        <Image
                            src={achievement.image}
                            alt={achievement.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 md:p-8">
                        {/* Title */}
                        <h3 className="font-[var(--font-bebas)] text-2xl sm:text-3xl md:text-4xl text-accent mb-2 break-words">
                            {achievement.name}
                        </h3>

                        {/* Type and Category */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="font-mono text-[10px] sm:text-xs px-2 py-1 bg-accent/10 text-accent rounded">
                                {achievement.type}
                            </span>
                            <span className="font-mono text-[10px] sm:text-xs px-2 py-1 bg-accent/5 text-muted-foreground rounded">
                                {achievement.category}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="w-12 h-px bg-accent/60 mb-4 sm:mb-6" />

                        {/* Issuing Organization */}
                        <div className="mb-3">
                            <h4 className="font-mono text-[10px] sm:text-xs text-accent mb-1 uppercase tracking-wider">
                                Issuing Organization
                            </h4>
                            <p className="font-mono text-xs sm:text-sm text-foreground/80">
                                {achievement.issuing_organization}
                            </p>
                        </div>

                        {/* Issue Date */}
                        <div className="mb-3">
                            <h4 className="font-mono text-[10px] sm:text-xs text-accent mb-1 uppercase tracking-wider">
                                Issue Date
                            </h4>
                            <p className="font-mono text-xs sm:text-sm text-foreground/80">
                                {achievement.issue_date}
                            </p>
                        </div>

                        {/* Credential ID */}
                        <div className="mb-4">
                            <h4 className="font-mono text-[10px] sm:text-xs text-accent mb-1 uppercase tracking-wider">
                                Credential ID
                            </h4>
                            <p className="font-mono text-xs sm:text-sm text-foreground/80 break-all">
                                {achievement.credential_id}
                            </p>
                        </div>

                        {/* Description */}
                        {achievement.fullDescription && (
                            <div className="mb-4 pt-2 border-t border-border/20">
                                <p className="font-mono text-xs sm:text-sm text-foreground/70 leading-relaxed">
                                    {achievement.fullDescription}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Achievement Card Component
function AchievementCard({
    achievement,
    index,
    onClick,
}: {
    achievement: any;
    index: number;
    onClick: () => void;
}) {
    return (
        <article
            onClick={onClick}
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
                            {achievement.category}
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
    );
}

// Main Achievements Section Component
export function AchievementsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAllAchievements, setShowAllAchievements] = useState(false);

    const displayedAchievements = showAllAchievements ? achievements : achievements.slice(0, 3);

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
                const cardsAnimation = gsap.fromTo(
                    cards,
                    { x: -100, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
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
    }, [showAllAchievements]);

    const handleCardClick = (achievement: any) => {
        setSelectedAchievement(achievement);
        setIsModalOpen(true);
    };

    return (
        <>
            <section
                id="achievements"
                ref={sectionRef}
                className="relative py-20 sm:py-32 pl-4 sm:pl-6 md:pl-28 pr-4 sm:pr-6 md:pr-12 border-t border-border/30"
            >
                {/* Section header */}
                <div ref={headerRef} className="mb-12 sm:mb-16 pr-4 sm:pr-6 md:pr-12">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                        03 / Achievements
                    </span>
                    <h2 className="mt-4 font-[var(--font-bebas)] text-4xl sm:text-5xl md:text-7xl tracking-tight break-words">
                        CERTIFICATIONS & BADGES
                    </h2>
                </div>

                {/* Grid container */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                >
                    {displayedAchievements.map((achievement, index) => (
                        <AchievementCard
                            key={achievement.id}
                            achievement={achievement}
                            index={index}
                            onClick={() => handleCardClick(achievement)}
                        />
                    ))}
                </div>

                {/* See More / See Less Button */}
                {achievements.length > 3 && (
                    <div className="flex justify-center mt-12 sm:mt-16">
                        <button
                            onClick={() => setShowAllAchievements(!showAllAchievements)}
                            className="group relative px-8 sm:px-10 py-3 sm:py-4 bg-transparent border border-accent/40 hover:border-accent transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 font-mono text-xs sm:text-sm uppercase tracking-wider text-accent group-hover:text-background transition-colors duration-300">
                                {showAllAchievements ? "See Less Achievements" : "See More Achievements"}
                            </span>
                            <div className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </button>
                    </div>
                )}
            </section>

            {/* Modal */}
            <AchievementModal
                achievement={selectedAchievement}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
