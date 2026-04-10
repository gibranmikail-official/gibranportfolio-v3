import type React from "react";
import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Bebas_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-ibm-plex-sans",
    display: "swap",
});
const ibmPlexMono = IBM_Plex_Mono({
    weight: ["400", "500"],
    subsets: ["latin"],
    variable: "--font-ibm-plex-mono",
    display: "swap",
});
const bebasNeue = Bebas_Neue({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-bebas",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Gibran Mikail - Portfolio",
    description:
        "UI/UX Designer & Front-End Developer passionate about creating intuitive and visually engaging digital experiences.",
    icons: {
        icon: [
            {
                url: "/icon.png",
                sizes: "32x32",
                type: "image/png",
            },
        ],
        apple: [
            {
                url: "/apple-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark bg-background">
            <body
                className={`${ibmPlexSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable} font-sans antialiased overflow-x-hidden`}
            >
                <div className="noise-overlay" aria-hidden="true" />
                <SmoothScroll>{children}</SmoothScroll>
                <Analytics />
            </body>
        </html>
    );
}
