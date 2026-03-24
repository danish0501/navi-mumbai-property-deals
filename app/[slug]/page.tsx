import { notFound } from 'next/navigation';
import { buyMegaMenuData, rentMegaMenuData } from '@/components/common/Navbar/navData';
import BuySection from '@/components/Home/BuySection';
import RentSection from '@/components/Home/RentSection';


interface PageProps {
    params: {
        slug: string;
    };
}

export default function DynamicPropertyPage({ params }: PageProps) {
    const { slug } = params;
    const decodedSlug = `/${slug}`;

    // Find if the slug exists in any of our menu data
    const allLinks = [
        ...Object.values(buyMegaMenuData).flat(),
        ...Object.values(rentMegaMenuData).flat()
    ];

    const linkData = allLinks.find(link => link.href === decodedSlug);

    if (!linkData) {
        // Specifically allow /buy, /rent, /sale if they are requested
        if (!['buy', 'rent', 'sale'].includes(slug)) {
            notFound();
        }
    }

    const title = linkData?.title || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="min-h-screen pt-24">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-extrabold text-brand-heading mb-4">
                    {title}
                </h1>
                <p className="text-zinc-600 mb-8 max-w-2xl">
                    Explore the best {title.toLowerCase()} in Navi Mumbai. Our verified listings are updated daily to provide you with the most accurate market data.
                </p>

                {/* Dynamically show relevant section based on slug/type */}
                {decodedSlug.includes('sale') || decodedSlug.includes('buy') ? (
                    <BuySection />
                ) : decodedSlug.includes('rent') ? (
                    <RentSection />
                ) : (
                    <BuySection />
                )}
            </div>
        </div>
    );
}
