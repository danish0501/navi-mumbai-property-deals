"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronRight, Home, Users, BriefcaseBusiness, MapPin, BookOpenText, TrendingUp } from 'lucide-react';
import { rentMegaMenuData, RentCategory } from './navData';

const categoryIcons: Record<RentCategory, React.ReactNode> = {
    "Rent A Home": <Home size={18} strokeWidth={2} />,
    "PG/Co-Living": <Users size={18} strokeWidth={2} />,
    "Commercial": <BriefcaseBusiness size={18} strokeWidth={2} />,
    "Popular Areas": <MapPin size={18} strokeWidth={2} />,
    "Blogs and Articles": <BookOpenText size={18} strokeWidth={2} />
};

const rentMarketStats: Record<string, string> = {
    "Rent A Home": "Avg ₹22,500/month",
    "PG/Co-Living": "Avg ₹8,500/bed",
    "Commercial": "Avg ₹65/sqft",
    "Popular Areas": "Highly Demanded",
    "Blogs and Articles": "Expert Insights"
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.1 } }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
};

const RentMegaMenu = () => {
    const [activeCategory, setActiveCategory] = useState<RentCategory>("Rent A Home");
    const categories = Object.keys(rentMegaMenuData) as RentCategory[];

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[min(900px,95vw)] bg-white border border-zinc-200/80 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col z-[110]"
        >
            <div className="flex w-full relative">
                {/* Left Sidebar */}
                <div className="w-1/3 bg-zinc-50 border-r border-zinc-200 flex flex-col p-5 relative z-10">
                    <div className="mb-4 px-2">
                        <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">Localized Hierarchy</span>
                        <div className="flex items-center gap-1 mt-1 text-[11px] text-zinc-500 font-medium">
                            <span>Home</span>
                            <ChevronRight size={10} />
                            <span>Rent</span>
                            <ChevronRight size={10} />
                            <span className="text-brand-primary">{activeCategory}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 relative" role="tablist" aria-orientation="vertical">
                        {categories.map((category) => {
                            const isActive = activeCategory === category;
                            return (
                                <div
                                    key={category}
                                    role="tab"
                                    tabIndex={0}
                                    aria-selected={isActive}
                                    onMouseEnter={() => setActiveCategory(category)}
                                    className={`relative flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-colors duration-200 group z-10 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${isActive ? "text-brand-primary" : "text-zinc-900 hover:text-brand-primary"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-rent-category-bg"
                                            className="absolute inset-0 bg-white shadow-sm border border-zinc-200/60 rounded-2xl -z-10"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    <div className="flex items-center gap-3">
                                        <div className={`transition-transform duration-300 ${isActive ? "scale-110" : "text-zinc-400 group-hover:text-brand-primary group-hover:scale-110"}`}>
                                            {categoryIcons[category]}
                                        </div>
                                        <span className={`font-bold text-sm ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                                            {category}
                                        </span>
                                    </div>
                                    <ChevronRight
                                        size={16}
                                        className={`transition-all duration-300 ${isActive ? "opacity-100 text-brand-primary translate-x-0" : "opacity-0 -translate-x-2 text-zinc-300"}`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-2/3 p-8 bg-white relative flex flex-col z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col"
                        >
                            <motion.h3
                                variants={itemVariants}
                                className="text-2xl font-extrabold text-zinc-900 mb-6 flex items-center gap-3"
                            >
                                <span className="bg-brand-primary/10 text-brand-primary p-2 rounded-xl">
                                    {categoryIcons[activeCategory]}
                                </span>
                                {activeCategory}
                            </motion.h3>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-5 mt-2">
                                {rentMegaMenuData[activeCategory].map((item) => (
                                    <motion.div variants={itemVariants} key={item.title}>
                                        <Link
                                            href={item.href}
                                            title={item.seoTitle}
                                            className="group flex flex-col gap-1 text-sm font-semibold text-zinc-900 hover:text-brand-primary transition-colors py-1 outline-none"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-brand-primary group-hover:scale-150 transition-all duration-300"></div>
                                                <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1 origin-left">
                                                    {item.title}
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Bar Footer */}
            <div className="w-full bg-zinc-900 text-white py-4 px-8 flex items-center justify-between z-20">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">Rental Market Stats</span>
                        <span className="text-white font-extrabold text-lg leading-tight">
                            {activeCategory === "Popular Areas" ? "Real-time Locality Rates" : `Navi Mumbai ${activeCategory} Insights`}
                        </span>
                    </div>
                    <div className="h-10 w-px bg-zinc-700 mx-2 hidden md:block"></div>
                    <div className="hidden md:flex items-center gap-3">
                        <TrendingUp size={20} className="text-brand-primary" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase">Expertise Signal</span>
                            <span className="text-xs font-bold text-zinc-100 italic">{rentMarketStats[activeCategory] || "High Yield Area"}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link href={rentMegaMenuData[activeCategory][0]?.href || "/rent"}>
                        <button className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 text-sm cursor-pointer whitespace-nowrap">
                            View All {activeCategory}
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default RentMegaMenu;
