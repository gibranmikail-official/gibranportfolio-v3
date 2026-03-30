import { HeroSection } from "@/Modules/hero-section";
import AboutSection from "@/Modules/about-section";
import SkillsSection from "@/Modules/skills-section";
import { AchievementsSection } from "@/Modules/achievements-section";
import { ServicesSection } from "@/Modules/services-section";
import { ProjectSection } from "@/Modules/project-section";
import { PrinciplesSection } from "@/Modules/principles-section";
import TestimonialSection from "@/Modules/testimonial-section";
import { ContactSection } from "@/Modules/contact-section";
import { FooterSection } from "@/Modules/footer-section";
import { SideNav } from "@/Modules/side-nav";

export default function Page() {
    return (
        <main className="relative min-h-screen">
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
