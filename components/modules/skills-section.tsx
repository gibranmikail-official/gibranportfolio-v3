"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Type definitions
type SkillCategory = "All" | "Main" | "Frontend" | "Backend" | "Database" | "Tools";

type Skill = {
    name: string;
    category: Exclude<SkillCategory, "All">;
};

// Data
const skillsData: Skill[] = [
    // Main
    { name: "TypeScript", category: "Main" },
    { name: "React", category: "Main" },
    { name: "Next.js", category: "Main" },

    // Frontend
    { name: "HTML", category: "Frontend" },
    { name: "CSS", category: "Frontend" },
    { name: "JavaScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },

    // Backend
    { name: "Node.js", category: "Backend" },
    { name: "Laravel", category: "Backend" },
    { name: "PHP", category: "Backend" },
    { name: "Lua", category: "Backend" },

    // Database
    { name: "MySQL", category: "Database" },
    { name: "PostgreSQL", category: "Database" },

    // Tools
    { name: "VS Code", category: "Tools" },
    { name: "GitHub", category: "Tools" },
    { name: "Figma", category: "Tools" },
    { name: "Photoshop", category: "Tools" },
    { name: "Premiere Pro", category: "Tools" },
    { name: "After Effects", category: "Tools" },
    { name: "Canva", category: "Tools" },
    { name: "Notion", category: "Tools" },
];

// Helper untuk count per category
const getCategoryCount = (category: SkillCategory, allSkills: Skill[]): number => {
    if (category === "All") return allSkills.length;
    return allSkills.filter((skill) => skill.category === category).length;
};

// Scramble Effect Component
const ScrambleEffect = ({ text, trigger, speed = 30 }: { text: string; trigger: number; speed?: number }) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    useEffect(() => {
        if (trigger > 0) {
            let iterations = 0;

            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setDisplayText(() => {
                    const newText = text
                        .split("")
                        .map((char, index) => {
                            if (index < iterations) return text[index];
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join("");

                    if (iterations >= text.length) {
                        clearInterval(intervalRef.current!);
                        return text;
                    }

                    iterations += 1;
                    return newText;
                });
            }, speed);
        } else {
            setDisplayText(text);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [trigger, text, speed, characters]);

    return <>{displayText}</>;
};

// Custom hook untuk GSAP animations
const useGSAPAnimations = (
    sectionRef: React.RefObject<HTMLElement | null>,
    headerRef: React.RefObject<HTMLDivElement | null>,
    filterRef: React.RefObject<HTMLDivElement | null>,
    skillsContainerRef: React.RefObject<HTMLDivElement | null>,
    setEffectTrigger: React.Dispatch<React.SetStateAction<number>>,
) => {
    useEffect(() => {
        if (!sectionRef.current || !headerRef.current || !filterRef.current || !skillsContainerRef.current)
            return;

        const section = sectionRef.current;
        const animations: (gsap.core.Tween | gsap.core.Timeline | ScrollTrigger)[] = [];

        // ScrollTrigger untuk efek text trigger
        const textTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            onEnter: () => {
                setEffectTrigger((prev) => prev + 1);
            },
            onEnterBack: () => {
                setEffectTrigger((prev) => prev + 1);
            },
        });
        animations.push(textTrigger);

        // Header animation with timeline
        const headerTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: headerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        });

        headerTimeline
            .fromTo(
                headerRef.current,
                { x: -60, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
            )
            .fromTo(
                headerRef.current.querySelector("span"),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "back.out(0.5)" },
                "-=0.5",
            );

        animations.push(headerTimeline);

        // Filter buttons animation
        const filterButtons = filterRef.current.querySelectorAll("button");
        if (filterButtons.length > 0) {
            const filterTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: filterRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            });

            filterTimeline.fromTo(
                filterButtons,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "back.out(0.4)",
                },
            );

            animations.push(filterTimeline);
        }

        // Cleanup function
        return () => {
            animations.forEach((anim) => {
                if (anim && typeof anim.kill === "function") {
                    anim.kill();
                }
            });
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [sectionRef, headerRef, filterRef, skillsContainerRef, setEffectTrigger]);
};

const SkillItem = ({ skill, index, trigger }: { skill: Skill; index: number; trigger: number }) => {
    return (
        <div
            className={cn(
                "group relative",
                "transition-all duration-500 ease-out",
                "hover:-translate-y-1 hover:shadow-xl",
            )}
        >
            <div
                className={cn(
                    "flex items-center gap-3 font-mono text-sm uppercase tracking-wider",
                    "px-4 py-2 rounded-md border border-border/50 bg-card",
                    "transition-all duration-300 ease-out",
                    "hover:bg-accent/10 hover:border-accent/50",
                    "cursor-default backdrop-blur-sm",
                )}
            >
                <span>
                    <ScrambleEffect text={skill.name} trigger={trigger} speed={35} />
                </span>
            </div>
            {/* Shadow/depth layer */}
            <div className="absolute inset-0 -z-10 translate-x-0.5 translate-y-0.5 bg-gradient-to-br from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
        </div>
    );
};

const CategoryFilter = ({
    categories,
    activeCategory,
    onSelect,
    skills,
    trigger,
}: {
    categories: SkillCategory[];
    activeCategory: SkillCategory;
    onSelect: (cat: SkillCategory) => void;
    skills: Skill[];
    trigger: number;
}) => {
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [hoverTrigger, setHoverTrigger] = useState<Record<string, number>>({});

    const handleHover = (cat: SkillCategory) => {
        setHoverTrigger((prev) => ({
            ...prev,
            [cat]: (prev[cat] || 0) + 1,
        }));
    };

    return (
        <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((cat, idx) => {
                const count = getCategoryCount(cat, skills);
                const isActive = activeCategory === cat;
                const hoverTriggerValue = hoverTrigger[cat] || 0;
                const effectiveTrigger = trigger + hoverTriggerValue;

                return (
                    <button
                        key={cat}
                        ref={(el) => {
                            buttonRefs.current[idx] = el;
                        }}
                        onClick={() => onSelect(cat)}
                        onMouseEnter={() => handleHover(cat)}
                        className={cn(
                            "font-mono text-xs uppercase tracking-[0.3em] px-5 py-2.5",
                            "border transition-all duration-300 ease-out",
                            "hover:border-accent/60 hover:bg-accent/5 hover:scale-105",
                            isActive
                                ? "text-accent border-accent/50 bg-accent/10 shadow-sm shadow-accent/20"
                                : "text-muted-foreground border-border/40 bg-transparent",
                        )}
                    >
                        <span>
                            <ScrambleEffect text={cat} trigger={effectiveTrigger} speed={55} />
                        </span>{" "}
                        <span className="text-accent/70">({count})</span>
                    </button>
                );
            })}
        </div>
    );
};

// --- MAIN COMPONENT ---
export const SkillsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const skillsContainerRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);
    const [effectTrigger, setEffectTrigger] = useState<number>(0);

    const [activeCategory, setActiveCategory] = useState<SkillCategory>("All");
    const [isAnimating, setIsAnimating] = useState(false);
    const categories: SkillCategory[] = ["All", "Main", "Frontend", "Backend", "Database", "Tools"];

    const filteredSkills =
        activeCategory === "All"
            ? skillsData
            : skillsData.filter((skill) => skill.category === activeCategory);

    useGSAPAnimations(
        sectionRef as React.RefObject<HTMLElement | null>,
        headerRef as React.RefObject<HTMLDivElement | null>,
        filterRef as React.RefObject<HTMLDivElement | null>,
        skillsContainerRef as React.RefObject<HTMLDivElement | null>,
        setEffectTrigger,
    );

    useEffect(() => {
        const skillsContainer = skillsContainerRef.current;
        if (!skillsContainer) return;

        setIsAnimating(true);

        gsap.to(skillsContainer.children, {
            opacity: 0,
            scale: 0.95,
            duration: 0.25,
            stagger: 0.02,
            ease: "power2.in",
            onComplete: () => {
                setTimeout(() => {
                    const skillItems = skillsContainer.children;
                    gsap.fromTo(
                        skillItems,
                        { opacity: 0, scale: 0.95 },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.4,
                            stagger: 0.05,
                            ease: "back.out(0.6)",
                            onComplete: () => {
                                setIsAnimating(false);
                            },
                        },
                    );
                }, 50);
            },
        });
    }, [activeCategory, skillsContainerRef]);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative py-32 pl-6 md:pl-28 border-t border-border/30 bg-background overflow-hidden"
        >
            {/* Editorial grid pattern overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-5 grid-bg" />

            {/* Subtle noise texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] noise-overlay" />

            <div className="relative z-10 max-w-7xl pr-6 md:pr-12">
                {/* Header */}
                <div ref={headerRef} className="mb-12">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-2">
                        02 / Skills
                    </span>
                    <h2 className="font-[var(--font-bebas)] text-6xl md:text-8xl tracking-tight text-foreground leading-none">
                        TECH STACK
                    </h2>
                    <div className="w-20 h-px bg-accent/40 mt-4" />
                </div>

                {/* Filter Pills - with scramble effect on hover */}
                <div ref={filterRef}>
                    <CategoryFilter
                        categories={categories}
                        activeCategory={activeCategory}
                        onSelect={setActiveCategory}
                        skills={skillsData}
                        trigger={effectTrigger}
                    />
                </div>

                {/* Skills Grid */}
                <div
                    ref={skillsContainerRef}
                    className={cn(
                        "flex flex-wrap gap-4 transition-all duration-500 ease-out",
                        isAnimating && "pointer-events-none",
                    )}
                >
                    {filteredSkills.map((skill, idx) => (
                        <SkillItem
                            key={`${skill.name}-${idx}`}
                            skill={skill}
                            index={idx}
                            trigger={effectTrigger}
                        />
                    ))}
                </div>

                {/* Empty state */}
                {filteredSkills.length === 0 && (
                    <p className="font-mono text-sm text-muted-foreground mt-8">
                        No skills in this category.
                    </p>
                )}
            </div>
        </section>
    );
};

export default SkillsSection;
