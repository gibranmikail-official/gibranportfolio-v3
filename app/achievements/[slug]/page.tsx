import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAchievementBySlug, getAllAchievementSlugs } from "@/lib/achievements";
import { AchievementDetailClient } from "@/app/achievements/[slug]/AchievementDetailClient";

interface AchievementPageProps {
    params: {
        slug: string;
    };
}

// Generate static paths at build time
export async function generateStaticParams() {
    const slugs = getAllAchievementSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

// Generate metadata for each achievement
export async function generateMetadata({ params }: AchievementPageProps): Promise<Metadata> {
    const achievement = getAchievementBySlug(params.slug);

    if (!achievement) {
        return {
            title: "Achievement Not Found",
        };
    }

    return {
        title: `${achievement.name} | Certifications & Badges`,
        description: `${achievement.name} - ${achievement.issuing_organization} (${achievement.issue_date})`,
        openGraph: {
            title: achievement.name,
            description: `Certificate from ${achievement.issuing_organization}`,
            images: [achievement.image],
        },
    };
}

export default function AchievementPage({ params }: AchievementPageProps) {
    const achievement = getAchievementBySlug(params.slug);

    // Return 404 if achievement not found
    if (!achievement) {
        notFound();
    }

    return <AchievementDetailClient achievement={achievement} />;
}
