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
});
const ibmPlexMono = IBM_Plex_Mono({
    weight: ["400", "500"],
    subsets: ["latin"],
    variable: "--font-ibm-plex-mono",
});
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });

export const metadata: Metadata = {
    title: "Gibran Mikail - Portfolio",
    description:
        "UI/UX Designer & Front-End Developer passionate about creating intuitive and visually engaging digital experiences.",
    icons: {
        icon: [
            {
                url: "/icon.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/icon.png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/icon.png",
                type: "image/svg+xml",
            },
        ],
        apple: "/apple-icon.png",
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
