import { notFound } from 'next/navigation';
import { buyMegaMenuData, rentMegaMenuData } from '@/components/common/Navbar/navData';
import BuySection from '@/components/Home/BuySection';
import RentSection from '@/components/Home/RentSection';
import PropertyDetails from '@/components/Listing/sections/PropertyDetails';
import { listingProperties, titleToSlug } from '@/components/Listing/listingData';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    
    // Check if it's a dynamic property page based on the navbar clicked
    // Property URLs are formatted as: /{propertyName}-{categoryName}
    const property = listingProperties.find(p => {
        const prefix = titleToSlug(p.title) + '-';
        return slug.startsWith(prefix) && slug.includes('-in-navi-mumbai');
    });

    if (property) {
        return {
            title: `${property.title} in ${property.location} | Navi Mumbai Property Deals`,
            description: `View details for ${property.bhk} ${property.propertyType} for sale/rent at ${property.location}. Price: ${property.price}. RERA Verified.`,
        };
    }

    // Default metadata for other dynamic pages (or you could query your content)
    const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return {
        title: `${title} | Navi Mumbai Property Deals`
    };
}

export default async function DynamicPropertyPage({ params }: PageProps) {
    const { slug } = await params;
    const decodedSlug = `/${slug}`;

    // 1. PROPERTY ROUTE HANDLING
    // The propertyURL structure maps to /{propertyName}-{categoryName-in-navi-mumbai}
    const matchingProperty = listingProperties.find(p => {
        const prefix = titleToSlug(p.title) + '-';
        return slug.startsWith(prefix) && slug.includes('-in-navi-mumbai');
    });

    if (matchingProperty) {
        return (
            <div className="min-h-screen bg-zinc-50 pt-[100px]">
                <PropertyDetails property={matchingProperty} />
            </div>
        );
    }


    // 2. NAV MENU ROUTE HANDLING 
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
