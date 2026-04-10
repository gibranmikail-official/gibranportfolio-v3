"use client";

import { useState, useEffect } from "react";

export function usePerformance() {
    const [isLowPower, setIsLowPower] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile
        const mql = window.matchMedia("(max-width: 768px)");
        setIsMobile(mql.matches);

        const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener("change", handleChange);

        // Detect low power / data saver mode (where supported)
        if ("connection" in navigator) {
            const conn = (navigator as any).connection;
            if (conn.saveData) {
                setIsLowPower(true);
            }
        }

        return () => mql.removeEventListener("change", handleChange);
    }, []);

    return { isLowPower, isMobile, shouldReduceMotion: isLowPower || isMobile };
}
