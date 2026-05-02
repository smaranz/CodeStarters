import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Sponsorship prospectus | Fire Hacks",
    description:
        "Fire Hacks sponsorship tiers, benefits, and impact — view online or download the prospectus.",
    openGraph: {
        title: "Sponsorship prospectus | Fire Hacks",
        description: "Partnership details for the Bay Area high school hackathon by CodeStarters.",
        type: "website",
    },
};

export default function FireHacksProspectusLayout({ children }: { children: ReactNode }) {
    return children;
}
