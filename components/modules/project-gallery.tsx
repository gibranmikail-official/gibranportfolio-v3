"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
    images: string[];
    title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

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
            className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-lg bg-black/20"
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    priority
                />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && !isMobile && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-accent/80 transition-all duration-200 backdrop-blur-sm rounded-full"
                        aria-label="Previous image"
                    >
                        <svg
                            className="w-5 h-5 text-white"
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
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-accent/80 transition-all duration-200 backdrop-blur-sm rounded-full"
                        aria-label="Next image"
                    >
                        <svg
                            className="w-5 h-5 text-white"
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

            {/* Image Counter */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-mono">
                    {currentIndex + 1} / {images.length}
                </div>
            )}

            {/* Thumbnails */}
            {images.length > 1 && !isMobile && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-sm">
                    {images.slice(0, 8).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToImage(idx)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-200",
                                currentIndex === idx ? "bg-accent w-6" : "bg-white/50 hover:bg-white/80",
                            )}
                            aria-label={`Go to image ${idx + 1}`}
                        />
                    ))}
                    {images.length > 8 && (
                        <span className="text-white/50 text-xs ml-1">+{images.length - 8}</span>
                    )}
                </div>
            )}

            {/* Auto-play indicator */}
            {images.length > 1 && !isMobile && (
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-mono">
                    {isAutoPlaying ? "▶ Auto" : "⏸ Paused"}
                </div>
            )}
        </div>
    );
}
