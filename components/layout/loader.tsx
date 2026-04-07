"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { splitChars } from "@/lib/splitText";

const Loader = () => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const strokeRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const maskFillRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!strokeRef.current || !fillRef.current) return;

        const strokeChars = splitChars(strokeRef.current);
        const fillChars = splitChars(fillRef.current);

        gsap.set([...strokeChars, ...fillChars], {
            transformOrigin: "center bottom",
        });

        // Teks: "GIBRAN MIKAIL" (Gibran occupies index 0-5, space is 6, Mikail is 7-12)
        fillChars.forEach((span, index) => {
            if (index < 6) {
                span.style.background = "oklch(0.7 0.2 45)"; // Warna accent (orange)
            } else {
                span.style.background = "oklch(0.95 0 0)"; // Warna foreground (putih/terang)
            }

            span.style.backgroundClip = "text";
            span.style.webkitBackgroundClip = "text";
            span.style.color = "transparent";
        });

        const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
        });

        tl.timeScale(0.75);

        tl.from(strokeChars, {
            opacity: 0,
            y: 10,
            duration: 0.6,
            stagger: 0.03,
        });

        tl.fromTo(
            strokeRef.current,
            { clipPath: "inset(0 100% 0 0)" },
            {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.1,
            },
            "-=0.4",
        );

        tl.fromTo(
            maskFillRef.current,
            { width: "0%" },
            {
                width: "100%",
                duration: 1.2,
            },
            "-=0.9",
        );

        tl.fromTo(
            progressRef.current,
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 1.4,
                ease: "power1.out",
            },
            "-=1.2",
        );

        tl.to(overlayRef.current, {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.7,
            delay: 0.1,
            onComplete: () => {
                if (overlayRef.current) {
                    overlayRef.current.style.display = "none";
                    overlayRef.current.style.visibility = "hidden";
                }
                window.dispatchEvent(new Event("loader-finished"));
                document.body.style.overflow = "auto";
            },
        });

        // Prevent scrolling while loader is active
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background elements matched with website theme */}
            <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
            <div className="noise-overlay" aria-hidden="true" />

            <div className="relative flex flex-col items-center gap-6 z-10">
                {/* Logo */}
                <div className="relative">
                    <div
                        ref={strokeRef}
                        className="text-4xl sm:text-5xl md:text-6xl font-[var(--font-bebas)] tracking-[0.08em] leading-none text-transparent select-none whitespace-nowrap"
                        style={{
                            textShadow: `
                                0 0 0.5px rgba(255,255,255,0.4),
                                0 0 1px rgba(255,255,255,0.2)
                            `,
                        }}
                    >
                        AGENT G
                    </div>

                    <div className="absolute inset-0 pointer-events-none">
                        <div ref={maskFillRef} className="overflow-hidden inline-block whitespace-nowrap">
                            <div
                                ref={fillRef}
                                className="text-4xl sm:text-5xl md:text-6xl font-[var(--font-bebas)] tracking-[0.08em] leading-none whitespace-nowrap"
                            >
                                AGENT G
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="w-48 h-[1.5px] bg-foreground/10 overflow-hidden">
                    <div
                        ref={progressRef}
                        className="h-full w-full origin-left relative"
                        style={{
                            background: "linear-gradient(to right, oklch(0.7 0.2 45), oklch(0.95 0 0))",
                        }}
                    />
                </div>

                {/* Tagline */}
                <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase text-center max-w-[280px]">
                    WELCOME
                </p>
            </div>
        </div>
    );
};

export default Loader;
