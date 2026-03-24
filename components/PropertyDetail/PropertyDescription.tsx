"use client";
import { motion } from 'framer-motion';
import type { ListingProperty } from '../Listing/listingData';
import { fadeUp } from './variants';

interface Props {
    property: ListingProperty;
}

const PropertyDescription = ({ property }: Props) => {
    return (
        <motion.div variants={fadeUp} className="bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100">
            <h2 className="text-2xl font-extrabold text-brand-heading mb-6 border-b border-zinc-100 pb-4">Detailed Property Description</h2>
            <h3 className="text-xl font-bold text-zinc-900 mb-1">{property.title} - Your Dream Home in {property.location}</h3>
            <p className="text-base font-semibold text-zinc-500 mb-6 flex items-center gap-1.5 leading-relaxed">
                Looking for a premium address? This {property.bhk} in {property.location} is situated at {property.address}, offering unbeatable convenience.
            </p>
            <div className="prose prose-zinc max-w-none text-brand-paragraph font-medium leading-relaxed space-y-4">
                <p>
                    Experience luxurious living in this thoughtfully designed <strong>{property.bhk} {property.propertyType}</strong>.
                    Spanning a generous super built-up area of <strong>{property.area}</strong>, this {property.furnishing} residence
                    perfectly captures the essence of modern urban life in Navi Mumbai.
                </p>

                <h3 className="text-lg font-bold text-brand-heading pt-4">Why choosing this property makes sense:</h3>
                <ul className="list-disc pl-5 space-y-2 marker:text-brand-primary">
                    <li>Developed by the prestigious <strong>{property.builder}</strong>, known for architectural excellence.</li>
                    <li>{property.isReraVerified ? "Fully RERA-verified project, ensuring transparency, security, and peace of mind for buyers." : "High investment potential in a rapidly developing node of Navi Mumbai."}</li>
                    <li>Strategic {property.facing}-facing layout designed for maximum natural light and cross-ventilation.</li>
                    <li>Located in the heart of {property.location.split(',')[0]}, one of the most sought-after and stable real estate markets in the Mumbai Metropolitan Region (MMR).</li>
                </ul>

                <p className="mt-6 text-zinc-600 italic">
                    Whether you are an investor looking for high rental yields or a homebuyer seeking an upgraded lifestyle,
                    this {property.bhk} property offers modern conveniences and superior connectivity to major business hubs,
                    educational institutions, and healthcare centers across Navi Mumbai.
                </p>
            </div>
        </motion.div>
    );
};


export default PropertyDescription;
