import { notFound } from 'next/navigation';
import { buyMegaMenuData } from '@/components/common/Navbar/navData';
import UniversalListingHub from '@/components/Listing/UniversalListingHub';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BuyPropertyPage({ params }: PageProps) {
    const { slug } = await params;
    const allLinks = Object.values(buyMegaMenuData).flat();
    const linkData = allLinks.find(link => link.href === `/buy/${slug}`);

    if (!linkData) {
        notFound();
    }

    return (
        <UniversalListingHub
            mode="buy"
            pageTitle={linkData.title}
            pageSubtitle={linkData.seoTitle}
            filterKeyword={slug}
        />
    );
}
