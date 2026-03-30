"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Data projects
const projects = [
    {
        id: "project1",
        title: "Dashboard 360 - GIS",
        service: "UI/UX Design",
        description: "Dashboard 360 – Interactive Data Visualization Platform for National Monitoring",
        thumbnail: "/01-projects/01-d360/d360.png",
        gallery: [
            "/01-projects/01-d360/d360-1.png",
            "/01-projects/01-d360/d360-2.png",
            "/01-projects/01-d360/d360-3.png",
            "/01-projects/01-d360/d360-4.png",
            "/01-projects/01-d360/d360-5.png",
            "/01-projects/01-d360/d360-6.png",
            "/01-projects/01-d360/d360-7.png",
            "/01-projects/01-d360/d360-8.png",
            "/01-projects/01-d360/d360-9.png",
            "/01-projects/01-d360/d360-10.png",
            "/01-projects/01-d360/d360-11.png",
            "/01-projects/01-d360/d360-12.png",
            "/01-projects/01-d360/d360-13.png",
            "/01-projects/01-d360/d360-14.png",
            "/01-projects/01-d360/d360-15.png",
        ],
        tags: ["React.JS", "Node.JS", "BNPB", "BMKG", "BPS", "PostgreSQL"],
        fullDescription:
            "Dashboard 360 adalah platform visualisasi data interaktif berbasis web yang saya kembangkan untuk memantau dan menganalisis data Food Estate, bencana alam, perumahan rakyat, dan hasil survei masyarakat di seluruh wilayah Indonesia. Dashboard ini menyajikan informasi berbasis peta, grafik, dan tabel yang responsif dan user-friendly. Peran Saya dalam Proyek Ini adalah Mendesain dan mengembangkan seluruh tampilan antarmuka pengguna (UI)",
        challenges: "-",
        outcome: "-",
    },
    {
        id: "project2",
        title: "Horas Inang - Irma Hutabarat",
        service: "Video Editor & Live Stream Operator",
        description: "Multimedia Production & Live Streaming for YouTube Content",
        thumbnail: "/01-projects/02-ythi/YTHS-3.png",
        gallery: [
            "/01-projects/02-ythi/YTHS-3.png",
            "/01-projects/02-ythi/YTHS-1.png",
            "/01-projects/02-ythi/YTHS-2.png",
            "/01-projects/02-ythi/YTHS-3.png",
            "/01-projects/02-ythi/YTHS-4.jpg",
            "/01-projects/02-ythi/YTHS-5.jpg",
            "/01-projects/02-ythi/YTHS-6.jpg",
            "/01-projects/02-ythi/YTHS-7.jpg",
        ],
        tags: ["Adobe Premiere", "Adobe Photoshop", "Capcut", "OBS Studio"],
        fullDescription:
            "Proyek produksi multimedia yang berfokus pada pembuatan konten video berkualitas tinggi dan pengelolaan sesi live streaming untuk penayangan di YouTube. Menangani seluruh alur kerja produksi video, mulai dari pra-produksi hingga pasca-produksi, guna memastikan penyampaian cerita visual yang menarik dan eksekusi siaran langsung yang lancar.",
        challenges: "-",
        outcome: "-",
    },
    {
        id: "project3",
        title: "GGENK Community",
        service: "UI/UX & Front-end Development",
        description: "-",
        thumbnail: "/01-projects/03-ggenk/gg.png",
        gallery: [
            "/01-projects/03-ggenk/gg.png",
            "/01-projects/03-ggenk/gg-01.png",
            "/01-projects/03-ggenk/gg-02.png",
            "/01-projects/03-ggenk/gg-03.png",
            "/01-projects/03-ggenk/gg-04.png",
            "/01-projects/03-ggenk/gg-05.png",
            "/01-projects/03-ggenk/gg-06.png",
            "/01-projects/03-ggenk/gg-07.png",
            "/01-projects/03-ggenk/gg-08.png",
            "/01-projects/03-ggenk/gg-09.png",
            "/01-projects/03-ggenk/gg-10.png",
            "/01-projects/03-ggenk/gg-11.png",
            "/01-projects/03-ggenk/gg-12.png",
            "/01-projects/03-ggenk/gg-13.png",
        ],
        tags: ["VS Code", "React.JS", "Tailwind.CSS", "Github", "Netlify"],
        fullDescription: "-",
        challenges: "-",
        outcome: "-",
    },
    {
        id: "project4",
        title: "Yuda Purboyo Sunu",
        service: "Discord Server Development",
        description: "Yuda Purboyo Sunu Discord – Structured Community Server",
        thumbnail: "/01-projects/04-yps/yps.png",
        gallery: [
            "/01-projects/04-yps/yps.png",
            "/01-projects/04-yps/yps-01.png",
            "/01-projects/04-yps/yps-02.png",
            "/01-projects/04-yps/yps-03.png",
            "/01-projects/04-yps/yps-04.png",
            "/01-projects/04-yps/yps-05.png",
            "/01-projects/04-yps/yps-06.png",
            "/01-projects/04-yps/yps-07.png",
            "/01-projects/04-yps/yps-08.png",
            "/01-projects/04-yps/yps-09.png",
            "/01-projects/04-yps/yps-10.png",
            "/01-projects/04-yps/yps-11.png",
            "/01-projects/04-yps/yps-12.png",
            "/01-projects/04-yps/yps-13.png",
        ],
        tags: ["Discord", "Webhook", "BOTS"],
        fullDescription:
            "Server Discord resmi komunitas Yuda Purboyo Sunu yang dibangun dengan sistem komunitas yang rapi dan terstruktur. Server ini dilengkapi dengan berbagai fitur otomatisasi seperti auto-role, bot moderasi, sistem notifikasi, serta manajemen channel yang tertata untuk memudahkan interaksi antar member.",
        challenges: "-",
        outcome: "-",
    },
    {
        id: "project5",
        title: "Quackers by Yummy Tails",
        service: "Discord Server Development",
        description: "Quackers Discord Server – Automated Community System",
        thumbnail: "/01-projects/05-yummytails/YT.png",
        gallery: [
            "/01-projects/05-yummytails/YT.png",
            "/01-projects/05-yummytails/YT-01.png",
            "/01-projects/05-yummytails/YT-02.png",
            "/01-projects/05-yummytails/YT-03.png",
            "/01-projects/05-yummytails/YT-04.png",
            "/01-projects/05-yummytails/YT-05.png",
            "/01-projects/05-yummytails/YT-06.png",
            "/01-projects/05-yummytails/YT-07.png",
            "/01-projects/05-yummytails/YT-08.png",
            "/01-projects/05-yummytails/YT-09.png",
            "/01-projects/05-yummytails/YT-10.png",
            "/01-projects/05-yummytails/YT-11.png",
            "/01-projects/05-yummytails/YT-12.png",
            "/01-projects/05-yummytails/YT-13.png",
            "/01-projects/05-yummytails/YT-14.png",
            "/01-projects/05-yummytails/YT-15.png",
            "/01-projects/05-yummytails/YT-16.png",
            "/01-projects/05-yummytails/YT-17.png",
            "/01-projects/05-yummytails/YT-18.png",
            "/01-projects/05-yummytails/YT-19.png",
            "/01-projects/05-yummytails/YT-20.png",
            "/01-projects/05-yummytails/YT-21.png",
            "/01-projects/05-yummytails/YT-22.png",
            "/01-projects/05-yummytails/YT-23.png",
            "/01-projects/05-yummytails/YT-24.png",
            "/01-projects/05-yummytails/YT-25.png",
            "/01-projects/05-yummytails/YT-26.png",
        ],
        tags: ["Discord", "Webhook", "BOTS"],
        fullDescription:
            "Server Discord Quackers — freshly baked & siap dipakai! Dibangun dengan sistem otomatisasi modern untuk pengalaman komunitas yang rapi, nyaman, dan interaktif. Mulai dari auto-role, custom bot, hingga pengelolaan channel yang efisien — semuanya diracik khusus agar komunitas Yummy Tails terasa lebih hidup.",
        challenges: "-",
        outcome: "-",
    },
    {
        id: "project6",
        title: "Juan Herman : JUCROD",
        service: "Discord Server Development",
        description: "JUCROD – Gaming Community Hub",
        thumbnail: "/01-projects/06-jucrod/JH.png",
        gallery: [
            "/01-projects/06-jucrod/JH.png",
            "/01-projects/06-jucrod/JH-01.png",
            "/01-projects/06-jucrod/JH-02.png",
            "/01-projects/06-jucrod/JH-03.png",
            "/01-projects/06-jucrod/JH-04.png",
            "/01-projects/06-jucrod/JH-05.png",
            "/01-projects/06-jucrod/JH-06.png",
            "/01-projects/06-jucrod/JH-07.png",
            "/01-projects/06-jucrod/JH-08.png",
            "/01-projects/06-jucrod/JH-09.png",
            "/01-projects/06-jucrod/JH-10.png",
            "/01-projects/06-jucrod/JH-11.png",
            "/01-projects/06-jucrod/JH-12.png",
        ],
        tags: ["Discord", "Webhook", "BOTS"],
        fullDescription:
            "JUCROD adalah server komunitas untuk para gamer dan penonton Juan Herman yang ingin main bareng, ngobrol santai, dan bangun komunitas yang solid. Server ini dirancang sebagai tempat nongkrong yang nyaman, dengan sistem yang rapi untuk mendukung interaksi, mabar, event, dan aktivitas komunitas sehari-hari.",
        challenges: "-",
        outcome: "-",
    },
    {
        id: "project7",
        title: "IndoSky",
        service: "Discord Server Development",
        description: "IndoSky Discord – Roblox Community Server",
        thumbnail: "/01-projects/07-indosky/IS.png",
        gallery: [
            "/01-projects/07-indosky/IS-23.png",
            "/01-projects/07-indosky/IS-24.png",
            "/01-projects/07-indosky/IS-25.png",
            "/01-projects/07-indosky/IS-26.png",
            "/01-projects/07-indosky/IS-27.png",
            "/01-projects/07-indosky/IS-13.png",
            "/01-projects/07-indosky/IS-14.png",
            "/01-projects/07-indosky/IS-15.png",
            "/01-projects/07-indosky/IS-16.png",
            "/01-projects/07-indosky/IS-17.png",
            "/01-projects/07-indosky/IS-1.png",
            "/01-projects/07-indosky/IS-2.png",
            "/01-projects/07-indosky/IS-3.png",
            "/01-projects/07-indosky/IS-4.png",
            "/01-projects/07-indosky/IS-5.png",
            "/01-projects/07-indosky/IS-6.png",
            "/01-projects/07-indosky/IS-7.png",
            "/01-projects/07-indosky/IS-8.png",
            "/01-projects/07-indosky/IS-9.png",
            "/01-projects/07-indosky/IS-10.png",
            "/01-projects/07-indosky/IS-11.png",
            "/01-projects/07-indosky/IS-12.png",
            "/01-projects/07-indosky/IS-18.png",
            "/01-projects/07-indosky/IS-19.png",
            "/01-projects/07-indosky/IS-20.png",
            "/01-projects/07-indosky/IS-21.png",
            "/01-projects/07-indosky/IS-22.png",
        ],
        tags: ["Discord", "Webhook", "BOTS"],
        fullDescription:
            "Server Discord resmi komunitas Roblox IndoSky dengan lebih dari 2000+ member aktif! Dilengkapi sistem otomatisasi canggih seperti auto-role, bot custom, ticketing system, hingga manajemen channel yang rapi. Tempat terbaik untuk berkumpul, berdiskusi, dan menikmati pengalaman komunitas Roblox yang seru dan terorganisir.",
        challenges: "-",
        outcome: "-",
    },
    {
        id: "project8",
        title: "Beyond 9 To 5",
        service: "Discord Server Development",
        description: "Freelancer Discord – Community Server System",
        thumbnail: "/01-projects/08-b925/b925-1.png",
        gallery: [
            "/01-projects/08-b925/b925-1.png",
            "/01-projects/08-b925/b925-2.png",
            "/01-projects/08-b925/b925-3.png",
            "/01-projects/08-b925/b925-4.png",
            "/01-projects/08-b925/b925-5.png",
            "/01-projects/08-b925/b925-6.png",
            "/01-projects/08-b925/b925-7.png",
            "/01-projects/08-b925/b925-8.png",
            "/01-projects/08-b925/b925-9.png",
            "/01-projects/08-b925/b925-10.png",
            "/01-projects/08-b925/b925-11.png",
            "/01-projects/08-b925/b925-12.png",
            "/01-projects/08-b925/b925-13.png",
            "/01-projects/08-b925/b925-14.png",
        ],
        tags: ["Discord", "Webhook", "BOTS"],
        fullDescription:
            "Pengembangan Discord server untuk komunitas freelancer dengan 5000+ member. Dilengkapi dengan sistem role otomatis, bot custom, dan channel management yang terorganisir. ",
        challenges:
            "Mengelola interaksi anggota dalam skala besar sambil menjaga stabilitas server sangatlah penting. Menerapkan pembatasan laju dan kueri basis data yang efisien untuk menangani operasi bersamaan.",
        outcome:
            "Server tersebut berkembang hingga memiliki lebih dari 5000 anggota aktif dengan tingkat retensi 90%. Moderasi otomatis mengurangi beban kerja admin hingga 70%.",
    },
    {
        id: "project9",
        title: "Nimbus Bobax",
        service: "Discord Server Development",
        description: "Nimbus Bobax – Robux Top-Up Server",
        thumbnail: "/01-projects/09-NimbusBobax/NB.png",
        gallery: [
            "/01-projects/09-NimbusBobax/NB.png",
            "/01-projects/09-NimbusBobax/NB.png",
            "/01-projects/09-NimbusBobax/NB-01.png",
            "/01-projects/09-NimbusBobax/NB-02.png",
            "/01-projects/09-NimbusBobax/NB-03.png",
            "/01-projects/09-NimbusBobax/NB-04.png",
            "/01-projects/09-NimbusBobax/NB-05.png",
            "/01-projects/09-NimbusBobax/NB-06.png",
            "/01-projects/09-NimbusBobax/NB-07.png",
            "/01-projects/09-NimbusBobax/NB-08.png",
        ],
        tags: ["Discord", "Webhook", "BOTS"],
        fullDescription:
            "Server Discord Nimbus Bobax digunakan sebagai tempat layanan top up Robux dengan sistem yang tertata dan mudah digunakan. Server ini dilengkapi dengan otomatisasi dasar untuk mendukung proses akses market, pengelolaan role, serta komunikasi antara admin dan user agar transaksi berjalan lebih rapi dan efisien.",
        challenges: "-",
        outcome: "-",
    },
];

// Image Gallery Slideshow Component
const ImageGallery = ({ images, title }: { images: string[]; title: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToImage = (index: number) => {
        setCurrentIndex(index);
        if (isAutoPlaying) {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
            autoPlayRef.current = setInterval(nextImage, 3000);
        }
    };

    useEffect(() => {
        if (isAutoPlaying && images.length > 1) {
            autoPlayRef.current = setInterval(nextImage, 3000);
        }
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [isAutoPlaying, images.length]);

    const handleMouseEnter = () => {
        setIsAutoPlaying(false);
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };

    const handleMouseLeave = () => {
        setIsAutoPlaying(true);
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        autoPlayRef.current = setInterval(nextImage, 3000);
    };

    if (!images || images.length === 0) return null;

    return (
        <div
            className="relative w-full h-48 sm:h-56 md:h-80 overflow-hidden rounded-t-lg bg-black/50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Main Image */}
            <div className="relative w-full h-full">
                <Image
                    src={images[currentIndex]}
                    alt={`${title} - Image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && !isMobile && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-accent/80 transition-all duration-200 backdrop-blur-sm rounded"
                    >
                        <svg
                            className="w-4 h-4 md:w-5 md:h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-accent/80 transition-all duration-200 backdrop-blur-sm rounded"
                    >
                        <svg
                            className="w-4 h-4 md:w-5 md:h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </>
            )}

            {/* Mobile swipe hint */}
            {images.length > 1 && isMobile && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/50 backdrop-blur-sm text-white text-[10px] font-mono">
                    ← {currentIndex + 1} / {images.length} →
                </div>
            )}

            {/* Image Counter for desktop */}
            {images.length > 1 && !isMobile && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/50 backdrop-blur-sm text-white text-xs font-mono">
                    {currentIndex + 1} / {images.length}
                </div>
            )}

            {/* Thumbnails - hidden on mobile */}
            {images.length > 1 && !isMobile && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 px-2 py-1 rounded bg-black/50 backdrop-blur-sm">
                    {images.slice(0, 8).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToImage(idx)}
                            className={cn(
                                "w-1.5 h-1.5 rounded-full transition-all duration-200",
                                currentIndex === idx ? "bg-accent w-3" : "bg-white/50 hover:bg-white/80",
                            )}
                        />
                    ))}
                    {images.length > 8 && (
                        <span className="text-white/50 text-[8px] ml-1">+{images.length - 8}</span>
                    )}
                </div>
            )}

            {/* Auto-play indicator */}
            {images.length > 1 && !isMobile && (
                <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/50 backdrop-blur-sm text-white text-[10px] font-mono">
                    {isAutoPlaying ? "▶ Auto" : "⏸ Paused"}
                </div>
            )}
        </div>
    );
};

// Modal Component - Optimized for mobile
const ProjectModal = ({
    project,
    isOpen,
    onClose,
}: {
    project: any;
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

    if (!isOpen || !project) return null;

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
                        className="absolute top-2 right- sm:top-8 sm:right-2 z-20 p-1.5 sm:p-2 bg-black/50 hover:bg-accent/80 transition-colors duration-200 backdrop-blur-sm rounded"
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

                    {/* Image Gallery Slideshow */}
                    <ImageGallery images={project.gallery} title={project.title} />

                    {/* Content */}
                    <div className="p-4 sm:p-6 md:p-8">
                        {/* Title */}
                        <h3 className="font-[var(--font-bebas)] text-2xl sm:text-3xl md:text-4xl text-accent mb-2 break-words">
                            {project.title}
                        </h3>

                        {/* Service */}
                        <p className="font-mono text-[10px] sm:text-xs text-muted-foreground mb-4 break-words">
                            {project.service}
                        </p>

                        {/* Divider */}
                        <div className="w-12 h-px bg-accent/60 mb-4 sm:mb-6" />

                        {/* Full Description */}
                        <p className="font-mono text-xs sm:text-sm text-foreground/80 leading-relaxed mb-4 sm:mb-6 break-words">
                            {project.fullDescription !== "-" ? project.fullDescription : project.description}
                        </p>

                        {/* Challenges */}
                        {project.challenges && project.challenges !== "-" && (
                            <div className="mb-4 sm:mb-6">
                                <h4 className="font-mono text-[10px] sm:text-xs text-accent mb-2 uppercase tracking-wider">
                                    Challenges & Solutions
                                </h4>
                                <p className="font-mono text-xs sm:text-sm text-foreground/70 leading-relaxed break-words">
                                    {project.challenges}
                                </p>
                            </div>
                        )}

                        {/* Outcome */}
                        {project.outcome && project.outcome !== "-" && (
                            <div className="mb-4 sm:mb-6">
                                <h4 className="font-mono text-[10px] sm:text-xs text-accent mb-2 uppercase tracking-wider">
                                    Outcome
                                </h4>
                                <p className="font-mono text-xs sm:text-sm text-foreground/70 leading-relaxed break-words">
                                    {project.outcome}
                                </p>
                            </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-border/20">
                            {project.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="font-mono text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground/70 bg-accent/5 px-2 py-1 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function ProjectSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [effectTrigger, setEffectTrigger] = useState(0);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAllProjects, setShowAllProjects] = useState(false);

    const truncateText = (text: string, maxLength: number = 80) => {
        if (!text || text === "-") return "No description available";
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

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
    }, [showAllProjects, effectTrigger]);

    const handleCardClick = (project: any) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <>
            <section
                id="projects"
                ref={sectionRef}
                className="relative py-20 sm:py-32 pl-4 sm:pl-6 md:pl-28 pr-4 sm:pr-6 md:pr-12 border-t border-border/30"
            >
                {/* Section header */}
                <div ref={headerRef} className="mb-12 sm:mb-16 pr-4 sm:pr-6 md:pr-12">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                        05 / Projects
                    </span>
                    <h2 className="mt-4 font-[var(--font-bebas)] text-4xl sm:text-5xl md:text-7xl tracking-tight break-words">
                        SELECTED WORK
                    </h2>
                </div>

                {/* Grid container */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                >
                    {displayedProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            trigger={effectTrigger}
                            onClick={() => handleCardClick(project)}
                            truncateText={truncateText}
                        />
                    ))}
                </div>

                {/* See More / See Less Button */}
                <div className="flex justify-center mt-12 sm:mt-16">
                    <button
                        onClick={() => setShowAllProjects(!showAllProjects)}
                        className="group relative px-8 sm:px-10 py-3 sm:py-4 bg-transparent border border-accent/40 hover:border-accent transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10 font-mono text-xs sm:text-sm uppercase tracking-wider text-accent group-hover:text-background transition-colors duration-300">
                            {showAllProjects ? "See Less Projects" : "See More Projects"}
                        </span>
                        <div className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </button>
                </div>
            </section>

            {/* Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}

function ProjectCard({
    project,
    index,
    onClick,
    truncateText,
}: {
    project: any;
    index: number;
    trigger: number;
    onClick: () => void;
    truncateText: (text: string, maxLength: number) => string;
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
                <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                    {/* Issue number */}
                    <div className="flex items-baseline justify-between mb-3 sm:mb-4">
                        <div className="flex items-baseline gap-1 sm:gap-2">
                            <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                                No. {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.3em] text-accent/40">
                                / / / / /
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-[var(--font-bebas)] text-xl sm:text-2xl tracking-tight mb-1 sm:mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                        {project.title}
                    </h3>

                    {/* Service */}
                    <p className="font-mono text-[8px] sm:text-[10px] text-accent/70 mb-2 sm:mb-3 uppercase tracking-wider line-clamp-1">
                        {project.service}
                    </p>

                    {/* Divider line */}
                    <div className="w-8 sm:w-12 h-px bg-accent/60 mb-3 sm:mb-4 group-hover:w-full transition-all duration-500" />

                    {/* Description */}
                    <p className="font-mono text-[10px] sm:text-xs text-muted-foreground leading-relaxed mb-3 sm:mb-4 flex-grow line-clamp-3">
                        {truncateText(project.description, 80)}
                    </p>

                    {/* See Details button */}
                    <div className="mt-2 pt-1 sm:pt-2 border-t border-border/20">
                        <span className="inline-block font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-accent group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300">
                            See Details →
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
