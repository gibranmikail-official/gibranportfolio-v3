"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: "uiux",
        title: "UI/UX Design",
        description:
            "Creating beautiful and functional user interfaces with modern design principles. From wireframes to high-fidelity prototypes, I deliver designs that enhance user experience and drive engagement.",
        tags: ["Figma", "Adobe Indesign", "Prototyping", "Wire Frame"],
    },
    {
        id: "frontend",
        title: "Front End Developer",
        description:
            "Building responsive and interactive web applications using modern technologies like React, Next.js, and TypeScript. Clean code, optimized performance, and pixel-perfect implementations.",
        tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
        id: "discord",
        title: "Discord Server Development",
        description:
            "I offer professional and engaging Discord server creation and development services — from channel setup and role management to bot integration and custom design tailored to your community's needs.",
        tags: ["Bot Integration", "Role Management", "Community Setup", "Custom Design"],
    },
    {
        id: "video",
        title: "Video Editing",
        description:
            "Professional video editing for social media, YouTube, and marketing content. Creating engaging visual stories that captivate your audience.",
        tags: ["Adobe Premiere", "After Effects", "Capcut"],
    },
    {
        id: "graphic",
        title: "Graphic Design",
        description:
            "Graphic design for digital and print needs with professional visuals. Creating compelling brand identities and visual assets.",
        tags: ["Logo Design", "Brand Identity", "Print Design", "Social Media Graphics"],
    },
    {
        id: "Soon",
        title: "Coming Soon",
        description: "Classified Project",
        tags: ["Classified"],
    },
];

// Custom hook untuk GSAP animations
const useGSAPAnimations = (
    sectionRef: React.RefObject<HTMLElement | null>,
    headerRef: React.RefObject<HTMLDivElement | null>,
    gridRef: React.RefObject<HTMLDivElement | null>,
    setEffectTrigger: React.Dispatch<React.SetStateAction<number>>,
) => {
    useEffect(() => {
        if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

        const section = sectionRef.current;
        const animations: (gsap.core.Tween | gsap.core.Timeline | ScrollTrigger)[] = [];

        // 1. ScrollTrigger untuk efek text
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

        // 2. Header animation dengan timeline
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

        // 3. Cards animation dengan timeline
        const cards = gridRef.current.querySelectorAll("article");
        if (cards.length > 0) {
            const cardsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            });

            cardsTimeline.fromTo(
                cards,
                { y: 50, opacity: 0, rotateX: -15 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 0.6,
                    stagger: {
                        each: 0.15,
                        from: "start",
                        ease: "power2.out",
                    },
                    ease: "back.out(0.4)",
                },
            );

            animations.push(cardsTimeline);
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
    }, [sectionRef, headerRef, gridRef, setEffectTrigger]);
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

// Typing Effect Component
const TypingEffect = ({ text, trigger, speed = 20 }: { text: string; trigger: number; speed?: number }) => {
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const prevTriggerRef = useRef(trigger);

    useEffect(() => {
        if (trigger !== prevTriggerRef.current) {
            prevTriggerRef.current = trigger;

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            setDisplayText("");
            setIsTyping(true);

            let index = 0;
            intervalRef.current = setInterval(() => {
                if (index < text.length) {
                    setDisplayText(text.slice(0, index + 1));
                    index++;
                } else {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                    setIsTyping(false);
                }
            }, speed);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [trigger, text, speed]);

    return (
        <span className="inline-block">
            {displayText}
            {isTyping && <span className="inline-block animate-pulse text-accent ml-0.5">|</span>}
        </span>
    );
};

// Main Component
export function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [effectTrigger, setEffectTrigger] = useState<number>(0); // ✅ Fixed: added initial value

    useGSAPAnimations(
        sectionRef as React.RefObject<HTMLElement | null>,
        headerRef as React.RefObject<HTMLDivElement | null>,
        gridRef as React.RefObject<HTMLDivElement | null>,
        setEffectTrigger,
    );

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
        >
            {/* Section header */}
            <div ref={headerRef} className="mb-16 pr-6 md:pr-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block">
                    04 / Services
                </span>
                <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
                    WHAT I OFFER
                </h2>
            </div>

            {/* Grid container */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} trigger={effectTrigger} />
                ))}
            </div>
        </section>
    );
}

// Service Card Component
function ServiceCard({
    service,
    index,
    trigger,
}: {
    service: {
        title: string;
        description: string;
        tags: string[];
    };
    index: number;
    trigger: number;
}) {
    return (
        <article
            className={cn(
                "group relative",
                "transition-all duration-500 ease-out",
                "hover:-translate-y-2 hover:shadow-2xl",
            )}
        >
            {/* Card with paper texture effect */}
            <div className="relative bg-card border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-8 h-full flex flex-col backdrop-blur-sm">
                {/* Top torn edge effect */}
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

                {/* Issue number - editorial style with decorative slash */}
                <div className="flex items-baseline justify-between mb-8">
                    <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                            No. {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/40">
                            / / / / /
                        </span>
                    </div>
                </div>

                {/* Title - Scramble Effect */}
                <h3 className="font-[var(--font-bebas)] text-3xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
                    <ScrambleEffect text={service.title} trigger={trigger} speed={35} />
                </h3>

                {/* Divider line */}
                <div className="w-12 h-px bg-accent/60 mb-6 group-hover:w-full transition-all duration-500" />

                {/* Description - Typing Effect */}
                <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6 flex-grow">
                    <TypingEffect text={service.description} trigger={trigger} speed={15} />
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/20">
                    {service.tags.map((tag) => (
                        <span
                            key={tag}
                            className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70 bg-accent/5 px-2 py-1 rounded transition-all hover:bg-accent/10"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Bottom right corner fold effect */}
                <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
                </div>
            </div>

            {/* Shadow/depth layer */}
            <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-gradient-to-br from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </article>
    );
}
