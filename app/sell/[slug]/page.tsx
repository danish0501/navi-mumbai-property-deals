import { notFound } from 'next/navigation';
import { sellPropertyCategories } from '@/components/common/Navbar/navData';
import UniversalListingHub from '@/components/Listing/UniversalListingHub';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function SellPropertyPage({ params }: PageProps) {
    const { slug } = await params;
    const allLinks = Object.values(sellPropertyCategories).flat();

    // Sell data hrefs may or may not have /sell/ prefix — handle both
    const linkData = allLinks.find(
        link =>
            link.href === `/sell/${slug}` ||
            link.href === slug
    );

    if (!linkData) {
        notFound();
    }

    return (
        <UniversalListingHub
            mode="sell"
            pageTitle={linkData.title}
            pageSubtitle={linkData.seoTitle}
            filterKeyword={slug}
        />
    );
}
