import { notFound } from 'next/navigation';
import { rentMegaMenuData } from '@/components/common/Navbar/navData';
import RentSection from '@/components/Home/RentSection';

interface PageProps {
    params: {
        slug: string;
    };
}

export default function RentPropertyPage({ params }: PageProps) {
    const { slug } = params;
    const allLinks = Object.values(rentMegaMenuData).flat();
    const linkData = allLinks.find(link => link.href === `/rent/${slug}`);

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

                <RentSection />
            </div>
        </div>
    );
}
