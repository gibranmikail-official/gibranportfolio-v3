"use client";

import { useRef, useState, useEffect, ElementType } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    FaEnvelope,
    FaPaperPlane,
    FaCheckCircle,
    FaRegSmile,
    FaBuilding,
    FaPhone,
    FaUser,
    FaDiscord,
} from "react-icons/fa";
gsap.registerPlugin(ScrollTrigger);

const ScrambleEffect = ({ text, trigger, speed = 30 }: { text: string; trigger: any; speed?: number }) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    useEffect(() => {
        if (trigger > 0) {
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
        <span className="inline-block">
            {displayText}
            {isTyping && <span className="inline-block animate-pulse text-accent ml-0.5">|</span>}
        </span>
    );
};

const ScrambleTextOnHover = ({
    text,
    as: Component = "span",
    duration = 0.5,
    className = "",
}: {
    text: string;
    as?: ElementType;
    duration?: number;
    className?: string;
}) => {
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

    return (
        <Component
            className={className}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {displayText}
        </Component>
    );
};

export function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [effectTrigger, setEffectTrigger] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        organisation: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    useEffect(() => {
        if (!sectionRef.current) return;

        const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 80%",
            onEnter: () => {
                setEffectTrigger((prev) => prev + 1);
            },
            onEnterBack: () => {
                setEffectTrigger((prev) => prev + 1);
            },
        });

        return () => trigger.kill();
    }, []);

    useEffect(() => {
        if (!sectionRef.current || !headerRef.current || !contentRef.current) return;

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

        const contentAnimation = gsap.fromTo(
            contentRef.current,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            },
        );

        return () => {
            headerAnimation.kill();
            contentAnimation.kill();
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("loading");

        setTimeout(() => {
            setFormStatus("success");
            setFormData({
                name: "",
                organisation: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
            setTimeout(() => setFormStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-20 md:py-32 pl-4 sm:pl-6 md:pl-28 pr-4 sm:pr-6 md:pr-12 border-t border-border/30"
        >
            {/* Section header */}
            <div ref={headerRef} className="mb-12 md:mb-16 pr-4 sm:pr-6 md:pr-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    08 / Contact
                </span>
                <h2 className="mt-4 font-[var(--font-bebas)] text-4xl sm:text-5xl md:text-7xl tracking-tight">
                    GET IN TOUCH
                </h2>
                <p className="mt-4 font-mono text-sm text-muted-foreground max-w-2xl">
                    <TypingEffect
                        text="Have a project in mind? Let's bring your ideas to life. Reach out and let's create something amazing together."
                        trigger={effectTrigger}
                        speed={20}
                    />
                </p>
            </div>

            {/* Contact Content */}
            <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Left Column - Contact Info */}
                <div className="space-y-6 md:space-y-8">
                    {/* Email Card */}
                    <div className="bg-card border border-border/50 rounded-lg p-5 md:p-6 hover:border-accent/30 transition-all duration-300 group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-full bg-accent/10 text-accent group-hover:scale-110 transition-transform duration-300">
                                <FaEnvelope size={20} />
                            </div>
                            <h3 className="font-[var(--font-bebas)] text-xl md:text-2xl text-accent">
                                <ScrambleEffect text="Email Me" trigger={effectTrigger} speed={40} />
                            </h3>
                        </div>
                        <p className="font-mono text-xs md:text-sm text-muted-foreground mb-4">
                            <TypingEffect
                                text="For project inquiries, collaborations, or just to say hello."
                                trigger={effectTrigger}
                                speed={15}
                            />
                        </p>
                        <a
                            href="mailto:gibranmikail.business@gmail.com"
                            className="inline-flex items-center gap-2 font-mono text-xs md:text-sm text-foreground/80 hover:text-accent transition-colors duration-200 group/link"
                            suppressHydrationWarning
                        >
                            <ScrambleTextOnHover
                                text="gibranmikail.business@gmail.com"
                                as="span"
                                duration={0.6}
                            />
                            <FaPaperPlane className="text-xs group-hover/link:translate-x-1 transition-transform duration-200" />
                        </a>
                    </div>

                    {/* Availability Card */}
                    <div className="bg-card border border-border/50 rounded-lg p-5 md:p-6 hover:border-accent/30 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-full bg-green-500/10 text-green-500">
                                <FaRegSmile size={20} />
                            </div>
                            <h3 className="font-[var(--font-bebas)] text-xl md:text-2xl text-accent">
                                <ScrambleEffect text="Availability" trigger={effectTrigger} speed={40} />
                            </h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="font-mono text-xs md:text-sm text-foreground/80">
                                    <TypingEffect
                                        text="Available for freelance work"
                                        trigger={effectTrigger}
                                        speed={15}
                                    />
                                </span>
                            </div>
                            <p className="font-mono text-[10px] md:text-xs text-muted-foreground mt-2">
                                Response time: Within 24-48 hours
                            </p>
                        </div>
                    </div>

                    {/* Discord Card - Join Community */}
                    <div className="bg-card border border-border/50 rounded-lg p-5 md:p-6 hover:border-accent/30 transition-all duration-300 group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                                <FaDiscord size={20} />
                            </div>
                            <h3 className="font-[var(--font-bebas)] text-xl md:text-2xl text-accent">
                                <ScrambleEffect
                                    text="Join the Community"
                                    trigger={effectTrigger}
                                    speed={40}
                                />
                            </h3>
                        </div>
                        <p className="font-mono text-xs md:text-sm text-muted-foreground mb-4">
                            <TypingEffect
                                text="Connect with like-minded creators, get updates, and be part of an amazing community."
                                trigger={effectTrigger}
                                speed={15}
                            />
                        </p>
                        <a
                            href="https://discord.gg/Ash5eZMVxM"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs md:text-sm text-foreground/80 hover:text-indigo-400 transition-colors duration-200 group/link"
                            suppressHydrationWarning
                        >
                            <ScrambleTextOnHover text="Join Discord Server →" as="span" duration={0.6} />
                        </a>
                    </div>
                </div>

                {/* Right Column - Contact Form */}
                <div className="bg-card border border-border/50 rounded-lg p-5 md:p-8 hover:border-accent/30 transition-all duration-300">
                    <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl text-accent mb-6">
                        <ScrambleEffect text="Send a Message" trigger={effectTrigger} speed={40} />
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block font-mono text-[10px] md:text-xs text-muted-foreground mb-1.5"
                                >
                                    <FaUser className="inline mr-1 text-accent/70" size={10} />
                                    Your Name <span className="text-accent">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 md:px-4 py-2.5 md:py-3 font-mono text-xs md:text-sm text-foreground focus:outline-none focus:border-accent/50 transition-colors duration-200"
                                    placeholder="John Doe"
                                    suppressHydrationWarning
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="organisation"
                                    className="block font-mono text-[10px] md:text-xs text-muted-foreground mb-1.5"
                                >
                                    <FaBuilding className="inline mr-1 text-accent/70" size={10} />
                                    Organisation / Company
                                </label>
                                <input
                                    type="text"
                                    id="organisation"
                                    name="organisation"
                                    value={formData.organisation}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 md:px-4 py-2.5 md:py-3 font-mono text-xs md:text-sm text-foreground focus:outline-none focus:border-accent/50 transition-colors duration-200"
                                    placeholder="Company Name"
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block font-mono text-[10px] md:text-xs text-muted-foreground mb-1.5"
                                >
                                    <FaEnvelope className="inline mr-1 text-accent/70" size={10} />
                                    Email Address <span className="text-accent">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 md:px-4 py-2.5 md:py-3 font-mono text-xs md:text-sm text-foreground focus:outline-none focus:border-accent/50 transition-colors duration-200"
                                    placeholder="john@example.com"
                                    suppressHydrationWarning
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block font-mono text-[10px] md:text-xs text-muted-foreground mb-1.5"
                                >
                                    <FaPhone className="inline mr-1 text-accent/70" size={10} />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 md:px-4 py-2.5 md:py-3 font-mono text-xs md:text-sm text-foreground focus:outline-none focus:border-accent/50 transition-colors duration-200"
                                    placeholder="+62 812 3456 7890"
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="block font-mono text-[10px] md:text-xs text-muted-foreground mb-1.5"
                            >
                                Subject <span className="text-accent">*</span>
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 md:px-4 py-2.5 md:py-3 font-mono text-xs md:text-sm text-foreground focus:outline-none focus:border-accent/50 transition-colors duration-200"
                                placeholder="Project Inquiry"
                                suppressHydrationWarning
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block font-mono text-[10px] md:text-xs text-muted-foreground mb-1.5"
                            >
                                Message <span className="text-accent">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 md:px-4 py-2.5 md:py-3 font-mono text-xs md:text-sm text-foreground focus:outline-none focus:border-accent/50 transition-colors duration-200 resize-none"
                                placeholder="Tell me about your project..."
                                suppressHydrationWarning
                            />
                        </div>

                        {/* Note with Typing Effect */}
                        <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 md:p-4">
                            <p className="font-mono text-[9px] md:text-[10px] text-muted-foreground leading-relaxed">
                                📝 <span className="text-accent">Note:</span>{" "}
                                <TypingEffect
                                    text="Typical response time is 24–48 hours. If your matter is urgent, please clearly indicate it in your message. For faster follow-up, we recommend including your phone number."
                                    trigger={effectTrigger}
                                    speed={12}
                                />
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={formStatus === "loading"}
                            suppressHydrationWarning
                            className={cn(
                                "w-full py-3 rounded-lg font-mono text-xs md:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2",
                                formStatus === "loading"
                                    ? "bg-accent/50 cursor-not-allowed"
                                    : "bg-accent hover:bg-accent/80 text-white hover:scale-[1.02] active:scale-[0.98]",
                            )}
                        >
                            {formStatus === "loading" && (
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    suppressHydrationWarning
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            )}
                            {formStatus === "success" && <FaCheckCircle className="h-4 w-4" />}
                            {formStatus === "idle" && "Send Message →"}
                            {formStatus === "loading" && "Sending..."}
                            {formStatus === "success" && "Message Sent!"}
                        </button>

                        {formStatus === "success" && (
                            <p className="text-center text-[10px] md:text-xs text-green-500 mt-2 animate-pulse">
                                ✓ Thank you! I'll get back to you soon.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
