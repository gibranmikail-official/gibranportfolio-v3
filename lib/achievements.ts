export interface Achievement {
    id: string;
    slug: string;
    name: string;
    issuing_organization: string;
    issue_date: string;
    image: string;
    type: "Certificate" | "Badge";
    category: string;
    credential_id: string;
    fullDescription: string;
    skills?: string[]; // Optional: add skills gained
    duration?: string; // Optional: add course duration
}

export const achievements: Achievement[] = [
    // Add your real achievements here with proper slugs
    {
        id: "cert1",
        slug: "coming-soon-1",
        name: "Coming Soon",
        issuing_organization: "Classified",
        issue_date: "No Date",
        image: "/CS.png",
        type: "Certificate",
        category: "No Data",
        credential_id: "-",
        fullDescription: "No Data",
    },
    {
        id: "cert2",
        slug: "coming-soon-2",
        name: "Coming Soon",
        issuing_organization: "Classified",
        issue_date: "No Date",
        image: "/CS.png",
        type: "Certificate",
        category: "No Data",
        credential_id: "-",
        fullDescription: "No Data",
    },
    {
        id: "cert3",
        slug: "coming-soon-3",
        name: "Coming Soon",
        issuing_organization: "Classified",
        issue_date: "No Date",
        image: "/CS.png",
        type: "Badge",
        category: "No Data",
        credential_id: "-",
        fullDescription: "No Data",
    },
    {
        id: "cert4",
        slug: "coming-soon-4",
        name: "Coming Soon",
        issuing_organization: "Classified",
        issue_date: "No Date",
        image: "/CS.png",
        type: "Certificate",
        category: "No Data",
        credential_id: "-",
        fullDescription: "No Data",
    },
    {
        id: "cert5",
        slug: "coming-soon-5",
        name: "Coming Soon",
        issuing_organization: "Classified",
        issue_date: "No Date",
        image: "/CS.png",
        type: "Certificate",
        category: "No Data",
        credential_id: "-",
        fullDescription: "No Data",
    },
    {
        id: "cert6",
        slug: "coming-soon-6",
        name: "Coming Soon",
        issuing_organization: "Classified",
        issue_date: "No Date",
        image: "/CS.png",
        type: "Certificate",
        category: "No Data",
        credential_id: "-",
        fullDescription: "No Data",
    },
];

// Helper function to get achievement by slug
export function getAchievementBySlug(slug: string): Achievement | undefined {
    return achievements.find((achievement) => achievement.slug === slug);
}

// Helper function to get all achievement slugs for static generation
export function getAllAchievementSlugs(): string[] {
    return achievements.map((achievement) => achievement.slug);
}
