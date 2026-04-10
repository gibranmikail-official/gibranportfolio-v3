"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ScrambleTextOnHover } from "@/components/effects/scramble-text";
const SplitFlapText = dynamic(
    () => import("@/components/effects/split-flap-text").then((mod) => mod.SplitFlapText),
    { ssr: false },
);
const SplitFlapMuteToggle = dynamic(
    () => import("@/components/effects/split-flap-text").then((mod) => mod.SplitFlapMuteToggle),
    { ssr: false },
);
const SplitFlapAudioProvider = dynamic(
    () => import("@/components/effects/split-flap-text").then((mod) => mod.SplitFlapAudioProvider),
    { ssr: false },
);
const AnimatedNoise = dynamic(
    () => import("@/components/effects/animated-noise").then((mod) => mod.AnimatedNoise),
    { ssr: false },
);
const BitmapChevron = dynamic(
    () => import("@/components/effects/bitmap-chevron").then((mod) => mod.BitmapChevron),
    { ssr: false },
);

import { usePerformance } from "@/hooks/use-performance";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaTiktok, FaLinkedin, FaDiscord } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const ScrambleEffect = ({ text, trigger, speed = 15 }: { text: string; trigger: any; speed?: number }) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    useEffect(() => {
        if (trigger) {
            let iterations = 0;

            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setDisplayText(() => {
                    return text
                        .split("")
                        .map((char, index) => {
                            if (index < iterations) {
                                return text[index];
                            }
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join("");
                });

                iterations += 1;

                if (iterations >= text.length) {
                    clearInterval(intervalRef.current!);
                    setDisplayText(text);
                }
            }, speed);
        } else {
            setDisplayText(text);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [trigger, text, speed]);

    return <>{displayText}</>;
};

const TypingEffect = ({ text, trigger, speed = 20 }: { text: string; trigger: any; speed?: number }) => {
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const prevTriggerRef = useRef(trigger);

    useEffect(() => {
        if (prevTriggerRef.current !== trigger) {
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
        <span className="relative inline-block min-h-[1.5em] w-full">
            <span className="invisible pointer-events-none select-none block" aria-hidden="true">
                {text}
            </span>
            <span className="absolute top-0 left-0">
                {displayText}
                {isTyping && <span className="inline-block animate-pulse text-accent ml-0.5">|</span>}
            </span>
        </span>
    );
};

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [effectTrigger, setEffectTrigger] = useState(0);
    const { shouldReduceMotion } = usePerformance();

    const socialLinks = [
        {
            name: "Instagram",
            url: "https://www.instagram.com/gibranmikail_",
            hoverColor: "hover:text-pink-400",
            icon: FaInstagram,
        },
        {
            name: "TikTok",
            url: "https://www.tiktok.com/@prodhite.exe",
            hoverColor: "hover:text-white",
            icon: FaTiktok,
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/gibranmikail",
            hoverColor: "hover:text-blue-400",
            icon: FaLinkedin,
        },
        {
            name: "Discord",
            url: "https://discord.gg/Ash5eZMVxM",
            hoverColor: "hover:text-indigo-400",
            icon: FaDiscord,
        },
    ];

    useEffect(() => {
        if (!sectionRef.current) return;

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

        const ctx = gsap.context(() => {
            if (contentRef.current && !shouldReduceMotion) {
                gsap.to(contentRef.current, {
                    y: -100,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }
        }, sectionRef);

        return () => {
            trigger.kill();
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen flex items-center pl-6 md:pl-28 pr-6 md:pr-12"
        >
            <AnimatedNoise opacity={0.03} />

            {/* Main content */}
            <div ref={contentRef} className="flex-1 w-full">
                <SplitFlapAudioProvider>
                    <div className="relative">
                        <SplitFlapText text="AGENT G" speed={50} />
                        <div className="mt-4">
                            <SplitFlapMuteToggle />
                        </div>
                    </div>
                </SplitFlapAudioProvider>

                {/* Name with Scramble Effect - H1 for SEO and Performance */}
                <h1 className="font-[var(--font-bebas)] text-muted-foreground/60 text-[clamp(1rem,3vw,2rem)] mt-4 tracking-wide">
                    <ScrambleEffect text="Gibran Mikail, S.Kom." trigger={effectTrigger} speed={35} />
                </h1>

                {/* Description with Typing Effect - resets on scroll */}
                <p className="mt-12 max-w-md font-mono text-sm text-muted-foreground leading-relaxed">
                    <TypingEffect
                        text="I’m a UI/UX Designer and Front-End Developer passionate about creating intuitive and visually engaging digital experiences. I focus on designing user-friendly interfaces and bringing them to life with clean, responsive front-end development, while continuously learning and improving to stay aligned with modern design and technology trends."
                        trigger={effectTrigger}
                        speed={5}
                    />
                </p>

                <div className="mt-16 flex flex-wrap items-center gap-8">
                    <a
                        href="#about"
                        className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
                    >
                        <ScrambleTextOnHover text="View More" as="span" duration={0.6} />
                        <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
                    </a>

                    {/* Social Media Buttons */}
                    <div className="flex gap-2 min-[400px]:gap-3">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group inline-flex items-center border border-foreground/20 p-2.5 min-[400px]:p-3 md:px-4 md:py-2 font-mono text-[11px] uppercase tracking-wider text-foreground/80 transition-all duration-200 hover:border-accent ${social.hoverColor}`}
                                    title={social.name}
                                >
                                    <span className="hidden md:inline">
                                        <ScrambleTextOnHover text={social.name} as="span" duration={0.5} />
                                    </span>
                                    <span className="md:hidden">
                                        <Icon size={16} />
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Floating info tag */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
                <div className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Version 3.2.1
                </div>
            </div>
        </section>
    );
}
