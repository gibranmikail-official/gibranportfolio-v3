"use client";

import { useRef, useEffect, useState, ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaTiktok, FaLinkedin, FaDiscord } from "react-icons/fa";
import { IconType } from "react-icons";

gsap.registerPlugin(ScrollTrigger);

interface ScrambleTextOnHoverProps {
    text: string;
    as?: ElementType;
    duration?: number;
    className?: string;
}

const ScrambleTextOnHover = ({
    text,
    as: Component = "span",
    duration = 0.6,
    className = "",
}: ScrambleTextOnHoverProps) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    useEffect(() => {
        if (isHovering) {
            let iterations = 0;
            const maxIterations = text.length;

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

                if (iterations >= maxIterations) {
                    clearInterval(intervalRef.current!);
                    setDisplayText(text);
                }
            }, 30);
        } else {
            setDisplayText(text);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isHovering, text]);

    const ComponentProps = {
        className,
        onMouseEnter: () => setIsHovering(true),
        onMouseLeave: () => setIsHovering(false),
    };

    return <Component {...ComponentProps}>{displayText}</Component>;
};

export function FooterSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const sections = [
        { id: "hero", label: "Home" },
        { id: "principles", label: "Principles" },
        { id: "about", label: "About" },
        { id: "testimonials", label: "Testimonials" },
        { id: "achievements", label: "Achievement" },
        { id: "contact", label: "Contact" },
        { id: "services", label: "Services" },
        { id: "footer", label: "Footer" },
        { id: "projects", label: "Projects" },
    ];

    interface SocialLink {
        icon: IconType;
        url: string;
        label: string;
        color: string;
    }

    const socialLinks: SocialLink[] = [
        {
            icon: FaInstagram,
            url: "https://www.instagram.com/gibranmikail_",
            label: "Instagram",
            color: "hover:text-pink-400",
        },
        {
            icon: FaTiktok,
            url: "https://www.tiktok.com/@prodhite.exe",
            label: "TikTok",
            color: "hover:text-white",
        },
        {
            icon: FaLinkedin,
            url: "https://www.linkedin.com/in/gibranmikail/",
            label: "LinkedIn",
            color: "hover:text-blue-400",
        },
        {
            icon: FaDiscord,
            url: "https://discord.gg/Ash5eZMVxM",
            label: "Discord",
            color: "hover:text-indigo-400",
        },
    ];

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (!sectionRef.current || !contentRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                },
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={sectionRef}
            id="footer"
            className="relative py-20 md:py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
        >
            <div ref={contentRef} className="max-w-[1400px] mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Logo & Description */}
                    <div>
                        <h3 className="font-[var(--font-bebas)] text-3xl md:text-4xl text-accent mb-4">
                            GIBRAN MIKAIL
                        </h3>
                        <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                            UI/UX Designer & Front-End Developer passionate about creating intuitive and
                            visually engaging digital experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4">
                            Quick Links
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className="font-mono text-xs text-left text-muted-foreground hover:text-accent transition-colors duration-200 group"
                                >
                                    <ScrambleTextOnHover
                                        text={section.label}
                                        as="span"
                                        duration={0.5}
                                        className="inline-block"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4">
                            Connect
                        </h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 rounded-full bg-white/5 border border-white/10 text-muted-foreground ${social.color} transition-all duration-300 hover:bg-white/10 hover:border-accent/30`}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                        © 2026 Gibran Mikail. All rights reserved.
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground flex items-center gap-2">
                        Designed with intention. Built with precision.
                    </p>
                </div>
            </div>
        </footer>
    );
}
