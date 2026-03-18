import { notFound } from 'next/navigation';
import { rentMegaMenuData } from '@/components/common/Navbar/navData';
import UniversalListingHub from '@/components/Listing/UniversalListingHub';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function RentPropertyPage({ params }: PageProps) {
    const { slug } = await params;
    const allLinks = Object.values(rentMegaMenuData).flat();
    const linkData = allLinks.find(link => link.href === `/rent/${slug}`);

    if (!linkData) {
        notFound();
    }

    return (
        <UniversalListingHub
            mode="rent"
            pageTitle={linkData.title}
            pageSubtitle={linkData.seoTitle}
            filterKeyword={slug}
        />
    );
}
