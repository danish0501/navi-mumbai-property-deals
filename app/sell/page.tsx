import SaleSection from '@/components/Home/SaleSection';
import React from 'react';

export default function SellPage() {
    return (
        <div className="min-h-screen pt-24">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-brand-heading mb-3">
                        Sell Your Property in Navi Mumbai
                    </h1>
                    <p className="text-zinc-600 max-w-3xl text-lg">
                        List your residential or commercial property with Navi Mumbai's most trusted real estate platform. Reach thousands of verified buyers and get the best value for your property.
                    </p>
                </div>
                <SaleSection />
            </div>
        </div>
    );
}
