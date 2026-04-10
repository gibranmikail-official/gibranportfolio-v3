"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/modules/hero-section";
import { SideNav } from "@/components/layout/side-nav";

// Dynamic imports for below-the-fold content
const LoadingPlaceholder = () => <div className="min-h-[200px] animate-pulse bg-background/50 rounded-lg" />;

const AboutSection = dynamic(() => import("@/components/modules/about-section"), {
    loading: () => <div className="min-h-screen animate-pulse bg-background" />,
});
const SkillsSection = dynamic(() => import("@/components/modules/skills-section"), {
    loading: () => <LoadingPlaceholder />,
});
const AchievementsSection = dynamic(
    () => import("@/components/modules/achievements-section").then((mod) => mod.AchievementsSection),
    { loading: () => <LoadingPlaceholder /> },
);
const ServicesSection = dynamic(
    () => import("@/components/modules/services-section").then((mod) => mod.ServicesSection),
    { loading: () => <LoadingPlaceholder /> },
);
const ProjectSection = dynamic(
    () => import("@/components/modules/project-section").then((mod) => mod.ProjectSection),
    { loading: () => <LoadingPlaceholder /> },
);
const PrinciplesSection = dynamic(
    () => import("@/components/modules/principles-section").then((mod) => mod.PrinciplesSection),
    { loading: () => <LoadingPlaceholder /> },
);
const TestimonialSection = dynamic(() => import("@/components/modules/testimonial-section"), {
    loading: () => <LoadingPlaceholder />,
});
const ContactSection = dynamic(
    () => import("@/components/modules/contact-section").then((mod) => mod.ContactSection),
    { loading: () => <LoadingPlaceholder /> },
);
const FooterSection = dynamic(
    () => import("@/components/modules/footer-section").then((mod) => mod.FooterSection),
    { loading: () => <LoadingPlaceholder /> },
);

export default function Page() {
    return (
        <main className="relative min-h-screen">
            {/* <Loader /> */}
            <SideNav />
            <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

            <div className="relative z-10">
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <AchievementsSection />
                <ServicesSection />
                <ProjectSection />
                <PrinciplesSection />
                <TestimonialSection />
                <ContactSection />
                <FooterSection />
            </div>
        </main>
    );
}
