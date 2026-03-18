import { notFound } from 'next/navigation';
import { sellPropertyCategories } from '@/components/common/Navbar/navData';
import UniversalListingHub from '@/components/Listing/UniversalListingHub';

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export default async function SellPropertyPage({ params }: PageProps) {
    const { slug } = await params;

    // All sell property links (flat)
    const allLinks = Object.values(sellPropertyCategories).flat();

    // URL patterns:
    //   /sell/owner/residential/flats-for-sell-in-navi-mumbai  → slug = ["owner","residential","flats-for-sell-in-navi-mumbai"]
    //   /sell/real-estate-blogs-for-sellers                    → slug = ["real-estate-blogs-for-sellers"]
    // navData hrefs for property items: "flats-for-sell-in-navi-mumbai" (no prefix)
    // navData hrefs for blogs: "/sell/real-estate-blogs-for-sellers" (with /sell/ prefix)

    const fullPath = `/sell/${slug.join('/')}`;

    const linkData = allLinks.find(link => {
        if (link.href.startsWith('/sell/')) {
            // Blog/article links — match full path
            return link.href === fullPath;
        }
        // Property links — match just the last segment (the actual slug)
        return link.href === slug[slug.length - 1];
    });

    if (!linkData) {
        notFound();
    }

    // Derive user type and category from slug segments (if present)
    const userType = slug.length >= 3 ? slug[0] : null;   // "owner" | "builder"
    const category = slug.length >= 3 ? slug[1] : null;   // "residential" | "commercial" | "plots"

    // Build a human-readable subtitle prefix
    const userTypeLabel = userType
        ? `${userType.charAt(0).toUpperCase() + userType.slice(1)} · ${category ? category.charAt(0).toUpperCase() + category.slice(1) : ''}`
        : null;

    return (
        <UniversalListingHub
            mode="sell"
            pageTitle={linkData.title}
            pageSubtitle={userTypeLabel ? `${userTypeLabel} — ${linkData.seoTitle}` : linkData.seoTitle}
            filterKeyword={slug[slug.length - 1]}
        />
    );
}
