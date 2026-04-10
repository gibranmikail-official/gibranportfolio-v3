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
    // Real Achievements Data
    {
        id: "cert1",
        slug: "asia-sistem-indonesia-1",
        name: "UI/UX Design & Technical Writer",
        issuing_organization: "Asia Sistem Indonesia",
        issue_date: "ISSUED ON JANUARY 2025",
        image: "/03-achievements/asi-dir-1-2025.png",
        type: "Certificate",
        category: "Internship",
        credential_id: "009/ASI-DIR/I/2025",
        fullDescription:
            "Contributed as a UI/UX Designer by creating user-centered interface designs, wireframes, and prototypes to improve usability and user experience. Also worked as a Technical Writer by producing clear documentation, user guides, and written content to support product understanding and development processes.",
    },
    {
        id: "cert2",
        slug: "asia-sistem-indonesia-2",
        name: "UI/UX Design & Technical Writer",
        issuing_organization: "Asia Sistem Indonesia",
        issue_date: "ISSUED ON JULY 2025",
        image: "/03-achievements/asi-dir-10-2025.png",
        type: "Certificate",
        category: "Internship",
        credential_id: "348/ASI-DIR/X/2025",
        fullDescription:
            "Contributed as a UI/UX Designer by creating user-centered interface designs, wireframes, and prototypes to improve usability and user experience. Also worked as a Technical Writer by producing clear documentation, user guides, and written content to support product understanding and development processes.",
    },
    {
        id: "cert3",
        slug: "asia-sistem-indonesia-3",
        name: "IT Support - Helpdesk",
        issuing_organization: "Asia Sistem Indonesia",
        issue_date: "ISSUED ON JULY 2026",
        image: "/CS.png",
        type: "Certificate",
        category: "Internship",
        credential_id: "-",
        fullDescription:
            "Provided technical support by troubleshooting hardware and software issues, assisting users with system-related problems, and ensuring smooth daily operations. Also handled ticketing systems, performed basic system maintenance, and guided users through technical solutions.",
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

export function getAchievementBySlug(slug: string): Achievement | undefined {
    return achievements.find((achievement) => achievement.slug === slug);
}

export function getAllAchievementSlugs(): string[] {
    return achievements.map((achievement) => achievement.slug);
}
