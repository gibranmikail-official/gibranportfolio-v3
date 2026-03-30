"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ScrambleTextOnHover } from "@/components/scramble-text";

gsap.registerPlugin(ScrollTrigger);

// Type definitions
type BaseItem = {
    id: string;
    label: string;
    period: string;
    location: string;
    description: string;
};

type Education = BaseItem & {
    type: "education";
    institution: string;
    degree: string;
    title: string;
};

type Experience = BaseItem & {
    type: "experience";
    company: string;
    position: string;
    responsibilities: string[];
};

// Type guard functions
const isEducation = (item: Education | Experience): item is Education => {
    return item.type === "education";
};

const isExperience = (item: Education | Experience): item is Experience => {
    return item.type === "experience";
};

// Data About
const aboutData = {
    paragraph1:
        "I'm Gibran Mikail, a Frontend Developer and UI/UX Designer focused on creating intuitive, user-centered digital experiences. I specialize in React, Next.js, and modern JavaScript, combining strong design skills with problem-solving, communication, and collaboration to build impactful products.",
    paragraph2:
        "My passion lies in bridging the gap between design and development, ensuring that every project I work on not only looks great but also performs seamlessly. I'm constantly exploring new technologies and methodologies to stay at the forefront of web development and deliver exceptional results.",
};

// Data Pendidikan
const educationData: Education[] = [
    {
        id: "Course",
        type: "education",
        label: "Course",
        institution: "Classified",
        degree: "Classified",
        title: "Classified",
        period: "Classified",
        location: "Classified",
        description: "NO DATA FOUND",
    },
    {
        id: "S1",
        type: "education",
        label: "Bachelor's Degree",
        institution: "STMIK Jakarta STI&K",
        degree: "Bachelor of Computer Science",
        title: "Information System",
        period: "2021 - 2026",
        location: "Jakarta, Indonesia",
        description:
            "Learned on Software Development include Frontend and Relational Database fundamental, Information System Management & Business, Network Architecture, etc. Gained hands-on experience in software development focusing on C++ and JavaScript, with a solid understanding of frontend development, relational databases, and structured information systems.",
    },
    {
        id: "SMK",
        type: "education",
        label: "Vocational School",
        institution: "SMK Nusantara 01",
        degree: "RPL (Software Engineering)",
        title: "SMK Nusantara 01 Ciputat",
        period: "2017 - 2020",
        location: "South Tangerang, Indonesia",
        description:
            "Focused on software development, algorithmic thinking, and programming fundamentals. Developed strong skills in designing, building, testing, and deploying software applications using various tools and technologies.",
    },
];

// Data Pekerjaan
const workExperienceData: Experience[] = [
    {
        id: "classified",
        type: "experience",
        label: "Classified Operative",
        company: "Classified Operative",
        position: "***** - **********",
        period: "Classified Period",
        location: "Restricted Area",
        description: "Classified Information",
        responsibilities: [
            "Access Restricted",
            "Access Restricted",
            "Access Restricted",
            "Access Restricted",
        ],
    },
    {
        id: "AsiaSistemIndonesia2",
        type: "experience",
        label: "Asia Sistem Indonesia",
        company: "Asia Sistem Indonesia",
        position: "IT Support - Helpdesk",
        period: "January 2026 - Present",
        location: "Jakarta, Indonesia",
        description:
            "Responsible for maintaining IT systems, providing technical support, and ensuring smooth day-to-day technology operations across the organization.",
        responsibilities: [
            "Provided technical support to users by diagnosing and resolving hardware, software, and network issues",
            "Monitored system performance and ensured all IT equipment functioned properly",
            "Performed routine maintenance, updates, and system backups",
            "Collaborated with other teams to troubleshoot issues and implement IT solutions",
        ],
    },
    {
        id: "AsiaSistemIndonesia1",
        type: "experience",
        label: "Asia Sistem Indonesia",
        company: "Asia Sistem Indonesia",
        position: "UI/UX Design & Technical Writer",
        period: "September 2024 - December 2025",
        location: "Jakarta, Indonesia",
        description:
            "Responsible for designing user-centric interfaces, enhancing user experience, and creating clear, structured technical documentation.",
        responsibilities: [
            "Designed intuitive UI/UX prototypes and wireframes using tools such as Figma and Adobe XD",
            "Conducted user research and usability testing to improve interface efficiency",
            "Created and maintained technical documentation including SOPs, user guides, and system manuals",
            "Collaborated with development teams to align interface designs with backend functionality",
        ],
    },
    {
        id: "HorasInang",
        type: "experience",
        label: "Horas Inang - Irma Hutabarat",
        company: "Horas Inang",
        position: "Video Editor & Live Stream Operator",
        period: "September 2022 - January 2025",
        location: "South Jakarta, Indonesia",
        description:
            "Responsible for producing high-quality video content and managing live streaming sessions for YouTube broadcasts.",
        responsibilities: [
            "Edited video content using Adobe Premiere Pro, After Effects and Capcut",
            "Designed video thumbnails, overlays, and visual assets to enhance viewer engagement",
            "Set up and managed live streaming equipment (cameras, OBS, audio interfaces)",
            "Operated live stream sessions, ensuring smooth transitions and broadcast quality",
        ],
    },
    {
        id: "GarudaVisiNusantara",
        type: "experience",
        label: "Garuda Visi Nusantara",
        company: "Garuda Visi Nusantara",
        position: "Internship - Backend Developer",
        period: "January 2019 - March 2019",
        location: "Jakarta, Indonesia",
        description:
            "Contributed to backend development tasks in a collaborative environment. Assisted in building and maintaining server-side logic.",
        responsibilities: [
            "Assisted in developing RESTful APIs using Node.js and Express",
            "Contributed to backend logic for web applications and internal tools",
            "Worked with relational databases (MySQL, PostgreSQL) for data storage and queries",
            "Participated in designing database schema and optimizing SQL queries",
        ],
    },
    {
        id: "EatSweetSpace",
        type: "experience",
        label: "Eat Sweet Space",
        company: "Eat Sweet Space",
        position: "Baker - Pastry",
        period: "August 2017 - March 2025",
        location: "Jakarta, Indonesia",
        description:
            "Responsible for preparing high-quality pastry products through precise dough preparation, baking, and packaging.",
        responsibilities: [
            "Prepared various types of dough for cookies with attention to recipe accuracy",
            "Operated baking equipment such as ovens, mixers, and proofing machines safely",
            "Monitored baking times and temperatures to ensure consistent product quality",
            "Maintained cleanliness and hygiene standards throughout the production area",
        ],
    },
];

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

// Komponen untuk render content education
const EducationContent = ({ data, trigger }: { data: Education; trigger: number }) => (
    <>
        <h3 className="font-bebas text-xl md:text-2xl text-accent mb-2 break-words">
            <ScrambleEffect text={data.institution} trigger={trigger} speed={40} />
        </h3>
        <p className="font-mono text-xs md:text-sm text-foreground/80 font-semibold mb-1 break-words">
            <ScrambleEffect text={data.degree} trigger={trigger} speed={35} />
        </p>
        <p className="font-mono text-[10px] md:text-xs text-muted-foreground mb-3 break-words">
            <ScrambleEffect text={data.title} trigger={trigger} speed={30} />
        </p>
        <div className="flex flex-col gap-1 mb-4 pb-3 border-b border-white/10">
            <p className="font-mono text-[10px] md:text-xs text-muted-foreground flex items-center gap-2 break-words">
                <span className="text-sm">📅</span>{" "}
                <ScrambleEffect text={data.period} trigger={trigger} speed={30} />
            </p>
            <p className="font-mono text-[10px] md:text-xs text-muted-foreground flex items-center gap-2 break-words">
                <span className="text-sm">📍</span>{" "}
                <ScrambleEffect text={data.location} trigger={trigger} speed={30} />
            </p>
        </div>
        <p className="font-mono text-xs md:text-sm text-foreground/80 leading-relaxed break-words">
            {data.description}
        </p>
    </>
);

// Komponen untuk render content experience
const ExperienceContent = ({ data, trigger }: { data: Experience; trigger: number }) => (
    <>
        <h3 className="font-bebas text-xl md:text-2xl text-accent mb-2 break-words">
            <ScrambleEffect text={data.company} trigger={trigger} speed={40} />
        </h3>
        <p className="font-mono text-xs md:text-sm text-foreground/80 font-semibold mb-1 break-words">
            <ScrambleEffect text={data.position} trigger={trigger} speed={35} />
        </p>
        <div className="flex flex-col gap-1 mb-4 pb-3 border-b border-white/10">
            <p className="font-mono text-[10px] md:text-xs text-muted-foreground flex items-center gap-2 break-words">
                <span className="text-sm">📅</span>{" "}
                <ScrambleEffect text={data.period} trigger={trigger} speed={30} />
            </p>
            <p className="font-mono text-[10px] md:text-xs text-muted-foreground flex items-center gap-2 break-words">
                <span className="text-sm">📍</span>{" "}
                <ScrambleEffect text={data.location} trigger={trigger} speed={30} />
            </p>
        </div>
        <p className="font-mono text-xs md:text-sm text-foreground/80 leading-relaxed break-words">
            {data.description}
        </p>
        {data.responsibilities && data.responsibilities.length > 0 && (
            <div className="mt-4 pt-3 border-t border-white/10">
                <p className="font-mono text-[10px] text-accent mb-2">Responsibilities:</p>
                <ul className="space-y-1">
                    {data.responsibilities.map((resp: string, idx: number) => (
                        <li
                            key={idx}
                            className="font-mono text-[10px] md:text-xs text-foreground/70 flex items-start gap-2 break-words"
                        >
                            <span className="text-accent shrink-0">▹</span>
                            {resp}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </>
);

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    const [activeTab, setActiveTab] = useState<"about" | "education" | "work">("about");
    const [activeEducation, setActiveEducation] = useState<Education>(educationData[0]);
    const [activeWork, setActiveWork] = useState<Experience>(workExperienceData[0]);
    const [effectTrigger, setEffectTrigger] = useState(0);

    const menuItems = [
        { id: "about", label: "About" },
        { id: "education", label: "Education" },
        { id: "work", label: "Career" },
    ];

    const handleTabClick = (tab: "about" | "education" | "work") => {
        setActiveTab(tab);
        setEffectTrigger((prev) => prev + 1);
        if (tab === "education") {
            setActiveEducation(educationData[0]);
        } else if (tab === "work") {
            setActiveWork(workExperienceData[0]);
        }
    };

    const handleItemClick = (item: Education | Experience) => {
        if (activeTab === "education" && isEducation(item)) {
            setActiveEducation(item);
        } else if (activeTab === "work" && isExperience(item)) {
            setActiveWork(item);
        }
        setEffectTrigger((prev) => prev + 1);
    };

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            if (headerRef.current) {
                gsap.from(headerRef.current, {
                    x: -60,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            }

            const elements = [leftRef.current, centerRef.current, rightRef.current].filter(Boolean);
            gsap.from(elements, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-20 md:py-32 px-4 md:pl-28 md:pr-12 border-t border-border/30 overflow-hidden"
        >
            {/* Background Running Text */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/2 left-0 w-full whitespace-nowrap opacity-20 -translate-y-1/2">
                    <div className="animate-marquee-right-to-left-slow inline-block font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-accent/30 whitespace-nowrap">
                        UI/UX DESIGN • FRONTEND DEVELOPER • UI/UX DESIGN • FRONTEND DEVELOPER • UI/UX DESIGN •
                        FRONTEND DEVELOPER • UI/UX DESIGN • FRONTEND DEVELOPER • UI/UX DESIGN • FRONTEND
                        DEVELOPER • UI/UX DESIGN • FRONTEND DEVELOPER •
                    </div>
                </div>
                <div className="absolute top-2/3 left-0 w-full whitespace-nowrap opacity-40">
                    <div className="animate-marquee-left-to-right-slow inline-block font-mono text-3xl md:text-5xl font-bold tracking-wider text-accent/20 whitespace-nowrap">
                        GAME • DESIGN • CODE • CREATE • INNOVATE • GAME • DESIGN • CODE • CREATE • INNOVATE •
                        GAME • DESIGN • CODE • CREATE • INNOVATE • GAME • DESIGN • CODE • CREATE • INNOVATE •
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Section Header */}
                <div ref={headerRef} className="mb-12 md:mb-16">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                        01 / About
                    </span>
                    <h2 className="mt-4 font-bebas text-4xl md:text-7xl tracking-tight">GIBRAN MIKAIL</h2>
                </div>

                {/* Main Content: 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                    {/* Left Column: Menu Tabs & Items */}
                    <div ref={leftRef} className="md:col-span-3 space-y-6 overflow-hidden">
                        {/* Menu Tabs */}
                        <div className="flex gap-4 border-b border-white/10 pb-3 overflow-x-auto md:overflow-x-visible">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleTabClick(item.id as "about" | "education" | "work")}
                                    className={`group font-mono text-sm py-2 px-3 rounded transition-all duration-200 whitespace-nowrap ${
                                        activeTab === item.id
                                            ? "text-accent border-b-2 border-accent"
                                            : "text-foreground/60 hover:text-accent"
                                    }`}
                                >
                                    <ScrambleTextOnHover
                                        text={item.label}
                                        as="span"
                                        duration={0.5}
                                        className="inline-block"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Items List - with type narrowing */}
                        {activeTab !== "about" && (
                            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2">
                                {(activeTab === "education" ? educationData : workExperienceData).map(
                                    (item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleItemClick(item)}
                                            className={`group font-mono text-sm text-left py-3 px-4 rounded transition-all duration-200 w-full truncate ${
                                                (activeTab === "education" &&
                                                    activeEducation.id === item.id) ||
                                                (activeTab === "work" && activeWork.id === item.id)
                                                    ? "bg-accent/10 text-accent border-l-2 border-accent"
                                                    : "text-foreground/80 hover:text-accent hover:bg-white/5"
                                            }`}
                                        >
                                            <ScrambleTextOnHover
                                                text={item.label}
                                                as="span"
                                                duration={0.5}
                                                className="inline-block truncate"
                                            />
                                        </button>
                                    ),
                                )}
                            </div>
                        )}
                    </div>

                    {/* Foto Tengah */}
                    <div ref={centerRef} className="md:col-span-6 flex justify-center items-center relative">
                        <div className="relative w-full max-w-md md:max-w-2xl aspect-square z-20">
                            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl bg-black/20 backdrop-blur-sm">
                                <Image
                                    src="/gibran-mikail.png"
                                    alt="Gibran Mikail"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description Card Kanan */}
                    <div ref={rightRef} className="md:col-span-3">
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-white/10 shadow-md hover:border-accent/30 transition-all duration-300 overflow-hidden">
                            {activeTab === "about" ? (
                                <>
                                    <h3 className="font-bebas text-xl md:text-2xl text-accent mb-3 break-words">
                                        <ScrambleEffect text="About Me" trigger={effectTrigger} speed={40} />
                                    </h3>
                                    <div className="space-y-3">
                                        <p className="font-mono text-xs md:text-sm text-foreground/80 leading-relaxed break-words">
                                            {aboutData.paragraph1}
                                        </p>
                                        <p className="font-mono text-xs md:text-sm text-foreground/80 leading-relaxed break-words">
                                            {aboutData.paragraph2}
                                        </p>
                                    </div>
                                </>
                            ) : activeTab === "education" ? (
                                <EducationContent data={activeEducation} trigger={effectTrigger} />
                            ) : (
                                <ExperienceContent data={activeWork} trigger={effectTrigger} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes marquee-right-to-left-slow {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @keyframes marquee-left-to-right-slow {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                .animate-marquee-right-to-left-slow {
                    animation: marquee-right-to-left-slow 30s linear infinite;
                }

                .animate-marquee-left-to-right-slow {
                    animation: marquee-left-to-right-slow 30s linear infinite;
                }
            `}</style>
        </section>
    );
}
