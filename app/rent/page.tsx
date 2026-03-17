import RentSection from '@/components/Home/RentSection';

export default function RentPage() {
    return (
        <div className="min-h-screen pt-24">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-brand-heading mb-3">
                        Properties for Rent in Navi Mumbai
                    </h1>
                    <p className="text-zinc-600 max-w-3xl text-lg">
                        Find the perfect rental property. Browse through wide range of flats, apartments, and commercial spaces available for rent across Navi Mumbai.
                    </p>
                </div>
                <RentSection />
            </div>
        </div>
    );
}
