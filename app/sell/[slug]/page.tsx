import { notFound } from 'next/navigation';
import { sellPropertyCategories } from '@/components/common/Navbar/navData';
import SaleSection from '@/components/Home/SaleSection';

interface PageProps {
    params: {
        slug: string;
    };
}

export default function SellPropertyPage({ params }: PageProps) {
    const { slug } = params;
    const allLinks = Object.values(sellPropertyCategories).flat();
    const linkData = allLinks.find(link => link.href === `/sell/${slug}`);

    if (!linkData) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-24">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-brand-heading mb-3">
                        {linkData.title}
                    </h1>
                    <p className="text-zinc-600 max-w-3xl text-lg">
                        {linkData.seoTitle}
                    </p>
                </div>

                <SaleSection />
            </div>
        </div>
    );
}
