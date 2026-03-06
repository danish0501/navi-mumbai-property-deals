"use client";
import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { User, Building2, Plus, ChevronRight } from 'lucide-react';

const propertyCategories = {
    "Residential": [
        { title: "Flats", href: "/sell/residential/flats" },
        { title: "Apartments", href: "/sell/residential/apartments" },
        { title: "Studio Apartment", href: "/sell/residential/studio-apartment" },
        { title: "Independent House", href: "/sell/residential/independent-house" },
        { title: "Villa", href: "/sell/residential/villa" }
    ],
    "Commercial": [
        { title: "Office Spaces", href: "/sell/commercial/office-spaces" },
        { title: "Shops", href: "/sell/commercial/shops" },
        { title: "Factories", href: "/sell/commercial/factories" },
        { title: "Warehouses", href: "/sell/commercial/warehouses" }
    ],
    "Land/Plots": [
        { title: "Residential Plots", href: "/sell/land-plots/residential-plots" },
        { title: "Industrial Land", href: "/sell/land-plots/industrial-land" },
        { title: "Agricultural Land", href: "/sell/land-plots/agricultural-land" }
    ]
};

const menuVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.98, filter: 'blur(5px)' },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: { type: "spring", stiffness: 400, damping: 25, staggerChildren: 0.1 }
    },
    exit: { opacity: 0, y: 10, scale: 0.98, filter: 'blur(5px)', transition: { duration: 0.2 } }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
        opacity: 1, x: 0,
        transition: { type: "spring", stiffness: 350, damping: 25 }
    }
};

const Section = ({ title, icon, basePath }: { title: string, icon: React.ReactNode, basePath: string }) => (
    <div className="flex-1 p-8 z-10 flex flex-col">
        <motion.h3 variants={itemVariants} className="text-xl font-extrabold text-brand-heading mb-6 flex items-center gap-3">
            <span className="bg-brand-primary/10 text-brand-primary p-2.5 rounded-xl">
                {icon}
            </span>
            {title}
        </motion.h3>

        <div className="flex flex-col gap-6">
            {Object.entries(propertyCategories).map(([categoryName, links]) => (
                <motion.div variants={itemVariants} key={categoryName}>
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                        {categoryName}
                    </h4>
                    <div className="flex flex-col gap-1.5">
                        {links.map(link => (
                            <Link
                                key={link.title}
                                href={`${basePath}${link.href.replace('/sell', '')}`}
                                className="group flex items-center justify-between text-sm font-semibold text-brand-heading hover:text-brand-primary transition-all duration-300 py-1"
                            >
                                <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1 origin-left">
                                    {link.title}
                                </span>
                                <ChevronRight
                                    size={14}
                                    className="opacity-0 -translate-x-2 text-brand-primary transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                                />
                            </Link>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

const SellMegaMenu = () => {
    return (
        <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[750px] bg-white/50 backdrop-blur-xl border border-neutral-border rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col z-[110]"
        >
            {/* Top pointing triangle/arrow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 bg-white/50 backdrop-blur-xl border-l border-t border-neutral-border rotate-45 transform origin-center"></div>

            <div className="flex relative w-full bg-white/70">
                {/* For Owners */}
                <Section title="For Owners" icon={<User size={22} strokeWidth={2} />} basePath="/sell/owner" />

                {/* Vertical Divider */}
                <div className="w-px bg-neutral-border/60 my-8"></div>

                {/* For Builders */}
                <Section title="For Builders" icon={<Building2 size={22} strokeWidth={2} />} basePath="/sell/builder" />
            </div>

            {/* Bottom Bar Footer */}
            <div className="w-full bg-neutral-bg border-t border-neutral-border p-6 flex items-center justify-between z-10">
                <div className="flex flex-col gap-0.5">
                    <span className="text-brand-heading font-extrabold text-xl">Post Property</span>
                    <span className="text-brand-paragraph text-sm font-medium">Start Selling Today</span>
                </div>
                <button className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                    <Plus size={18} strokeWidth={2.5} />
                    Add Property
                </button>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl -z-10 translate-y-1/2"></div>
        </motion.div>
    );
};

export default SellMegaMenu;
