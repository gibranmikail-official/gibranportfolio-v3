"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Komponen untuk efek scramble
const ScrambleEffect = ({ text, trigger, speed = 30 }: { text: string; trigger: any; speed?: number }) => {
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

export default function TestimonialSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [effectTrigger, setEffectTrigger] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: "alphaworks.id",
            project: "Beyond 9 to 5",
            rating: 5,
            image: "/02-testi-pp/Yudha-Rizky.jpg",
            text: "Discord server yang dibuat sangat rapi dan profesional. Member jadi lebih aktif dan sistemnya mudah digunakan.",
        },
        {
            id: 2,
            name: "Yuda Purboyo Sunu",
            project: "YPS",
            rating: 5,
            image: "/02-testi-pp/yps.jpg",
            text: "masprodhitee server devnya gacor banget responsif, botnya useful, layoutnya juga simple tapi mudah dipahamin buat pemula, navigasinya juga terarah banget dan menyesuaikan user, pokonya gacorrr server developernya",
        },
        {
            id: 3,
            name: "Juan Herman",
            project: "JUCROD",
            rating: 5,
            image: "/02-testi-pp/Juan-Herman.jpg",
            text: "Mantap! Server JUCROD sekarang jauh lebih tertata, ringan, dan keliatan ‘hidup’. Event, announcement, sampai sistem leveling dibuat otomatis. Mudah dikelola, tinggal jalanin komunitasnya aja. Recommended!",
        },
        {
            id: 4,
            name: "CaptSiren",
            project: "Indo Sky",
            rating: 5,
            image: "/02-testi-pp/CaptSiren.png",
            text: "Bhaappp!! Ini seriuss server gwe jadi sebagus inii?? Jujurr jadi enak di pandang dan bnyk fitur, tiada dua GGENK selalu di hati, dan di ampela",
        },
        {
            id: 5,
            name: "Yummy Tails",
            project: "Quackers",
            rating: 5,
            image: "/02-testi-pp/Yummy.jpeg",
            text: "Sat Set No Debat (Paling Cepat dan Best!). Gila, hasilnya literally sat set sat set! Anti-ribet, gak pake mikir keras. Plus point-nya? Effort-ku nol, tapi hasilnya mantul abis. Padahal cuma ngirim - ngirim video TikTok seamless aja langsung jadi, mantulityyyyy!",
        },
        {
            id: 6,
            name: "Rhyz",
            project: "Nimbus Bobax",
            rating: 5,
            image: "/02-testi-pp/rhyz.png",
            text: "Terimakasih bang, discordnya jadi tertata rapih dan termanage dengan baik. Easy look and easy to navigate untuk community. 100% recommended",
        },
    ];

    const [index, setIndex] = useState(0);
    const [perView, setPerView] = useState(3);

    // responsive
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setPerView(1);
            else if (window.innerWidth < 1024) setPerView(2);
            else setPerView(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + perView >= testimonials.length ? 0 : prev + perView));
        }, 7000);
        return () => clearInterval(interval);
    }, [perView, testimonials.length]);

    const visible = Array.from({ length: perView }, (_, i) => {
        return testimonials[(index + i) % testimonials.length];
    });

    const totalPages = Math.ceil(testimonials.length / perView);
    const currentPage = Math.floor(index / perView);

    // GSAP ScrollTrigger untuk efek scramble
    useEffect(() => {
        if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

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

        const cards = gridRef.current?.querySelectorAll("article");
        let cardsAnimation: gsap.core.Animation | null = null;
        if (cards && cards.length > 0) {
            cardsAnimation = gsap.fromTo(
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
        }

        return () => {
            trigger.kill();
            if (headerAnimation) headerAnimation.kill();
            if (cardsAnimation) cardsAnimation.kill();
        };
    }, []);

    return (
        <section
            id="testimonials"
            ref={sectionRef}
            className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
        >
            {/* Section header */}
            <div ref={headerRef} className="mb-16 pr-6 md:pr-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    07 / Testimonials
                </span>
                <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
                    WHAT MY CLIENTS SAY
                </h2>
            </div>

            {/* Grid container */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visible.map((testimonial, idx) => (
                    <TestimonialCard
                        key={`${testimonial.id}-${index}-${idx}`}
                        testimonial={testimonial}
                        index={(index + idx) % testimonials.length}
                        trigger={effectTrigger}
                    />
                ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-10">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i * perView)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i === currentPage
                                ? "bg-accent scale-125"
                                : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}

function TestimonialCard({
    testimonial,
    index,
    trigger,
}: {
    testimonial: any;
    index: number;
    trigger: number;
}) {
    return (
        <article
            className={cn(
                "group relative",
                "transition-transform duration-500 ease-out",
                "hover:-translate-y-2",
            )}
        >
            {/* Card with paper texture effect */}
            <div className="relative bg-card border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-6 h-full flex flex-col min-h-[380px]">
                {/* Top torn edge effect */}
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

                {/* Issue number - editorial style with decorative slash */}
                <div className="flex items-baseline justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/40">
                            / / / / /
                        </span>
                    </div>
                </div>

                {/* Client Info with Scramble Effect */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-accent/10 flex-shrink-0">
                        <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm font-semibold truncate">
                            <ScrambleEffect text={testimonial.name} trigger={trigger} speed={35} />
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            <ScrambleEffect text={testimonial.project} trigger={trigger} speed={35} />
                        </p>
                    </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                            key={i}
                            className={cn(
                                "text-[10px]",
                                i < testimonial.rating ? "text-accent" : "text-muted-foreground/30",
                            )}
                        />
                    ))}
                </div>

                {/* Quote icon */}
                <div className="mb-2">
                    <svg className="w-6 h-6 text-accent/30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                </div>

                {/* Divider line */}
                <div className="w-12 h-px bg-accent/60 mb-4 group-hover:w-full transition-all duration-500" />

                {/* Text - No Typing Effect, langsung tampil */}
                <p className="font-mono text-xs text-foreground/80 leading-relaxed flex-grow">
                    "{testimonial.text}"
                </p>

                {/* Bottom right corner fold effect */}
                <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
                </div>
            </div>

            {/* Shadow/depth layer */}
            <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </article>
    );
}
