import { HeroSection } from "@/components/modules/hero-section";
import AboutSection from "@/components/modules/about-section";
import SkillsSection from "@/components/modules/skills-section";
import { AchievementsSection } from "@/components//modules/achievements-section";
import { ServicesSection } from "@/components/modules/services-section";
import { ProjectSection } from "@/components/modules/project-section";
import { PrinciplesSection } from "@/components/modules/principles-section";
import TestimonialSection from "@/components/modules/testimonial-section";
import { ContactSection } from "@/components/modules/contact-section";
import { FooterSection } from "@/components/footer-section";
import { SideNav } from "@/components/side-nav";

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
