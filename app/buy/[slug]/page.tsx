import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buyMegaMenuData } from '@/components/common/Navbar/navData';
import UniversalListingHub from '@/components/Listing/UniversalListingHub';
import { listingProperties } from '@/components/Listing/listingData';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const allLinks = Object.values(buyMegaMenuData).flat();
    const linkData = allLinks.find(link => link.href === `/buy/${slug}`);

    if (!linkData) return { title: 'Property Not Found' };

    const title = `${linkData.title} | Navi Mumbai Property Deals`;
    const description = `Explore verified ${linkData.title} in Navi Mumbai. Get detailed insights on premium properties, RERA status, and investment potential.`;

    return {
        title,
        description,
        alternates: {
            canonical: `https://navimumbaipropertydeals.com/buy/${slug}`,
        },
    };
}

export default async function BuyPropertyPage({ params }: PageProps) {
    const { slug } = await params;
    const allLinks = Object.values(buyMegaMenuData).flat();
    const linkData = allLinks.find(link => link.href === `/buy/${slug}`);

    if (!linkData) {
        notFound();
    }

    // Server-side: Get initial properties for SEO
    const initialProperties = listingProperties.filter(p => {
        const kw = slug.toLowerCase();
        return p.location.toLowerCase().includes(kw) ||
            p.title.toLowerCase().includes(kw) ||
            p.configuration.toLowerCase().includes(kw);
    }).slice(0, 10);

    return (
        <UniversalListingHub
            mode="buy"
            pageTitle={linkData.title}
            pageSubtitle={linkData.seoTitle}
            filterKeyword={slug}
            initialProperties={initialProperties}
        />
    );
}
