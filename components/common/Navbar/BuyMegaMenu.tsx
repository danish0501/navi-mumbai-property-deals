"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronRight, Home, Map, BriefcaseBusiness, MapPin, BookOpenText, MoveRight } from 'lucide-react';
import { buyMegaMenuData, Category } from './navData';

const categoryIcons: Record<Category, React.ReactNode> = {
    "Buy a Home": <Home size={18} strokeWidth={2} />,
    "Land/Plot": <Map size={18} strokeWidth={2} />,
    "Commercial": <BriefcaseBusiness size={18} strokeWidth={2} />,
    "Popular Areas": <MapPin size={18} strokeWidth={2} />,
    "Blogs and Articles": <BookOpenText size={18} strokeWidth={2} />
};

// Animation Variants
const menuVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.98, filter: 'blur(5px)' },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: { type: "spring", stiffness: 400, damping: 25, staggerChildren: 0.05 }
    },
    exit: { opacity: 0, y: 10, scale: 0.98, filter: 'blur(5px)', transition: { duration: 0.2 } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.07, delayChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { duration: 0.1 } }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
        opacity: 1, x: 0,
        transition: { type: "spring", stiffness: 350, damping: 25 }
    }
};

const BuyMegaMenu = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("Buy a Home");

    const categories = Object.keys(buyMegaMenuData) as Category[];

    return (
        <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[850px] bg-white/95 backdrop-blur-2xl border border-zinc-200/60 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex z-[110]"
        >
            {/* Top pointing triangle/arrow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 bg-white/95 border-l border-t border-zinc-200/60 rotate-45 transform origin-center"></div>

            {/* Left Sidebar */}
            <div className="w-1/3 bg-zinc-50/70 border-r border-zinc-200/60 flex flex-col p-5 relative z-10">
                <div className="mb-4 px-2">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Explore Options</span>
                </div>

                <div className="flex flex-col gap-1 relative">
                    {categories.map((category) => {
                        const isActive = activeCategory === category;

                        return (
                            <div
                                key={category}
                                onMouseEnter={() => setActiveCategory(category)}
                                className={`relative flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-colors duration-200 group z-10 ${isActive ? "text-brand-primary" : "text-brand-heading hover:text-brand-primary"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-category-bg"
                                        className="absolute inset-0 bg-white shadow-sm border border-zinc-200/60 rounded-2xl -z-10"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}

                                <div className="flex items-center gap-3">
                                    <div className={`transition-transform duration-300 ${isActive ? "scale-110" : "text-zinc-400 group-hover:text-brand-primary group-hover:scale-110"}`}>
                                        {categoryIcons[category]}
                                    </div>
                                    <span className={`font-bold text-sm transition-all duration-300 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                                        {category}
                                    </span>
                                </div>
                                <ChevronRight
                                    size={16}
                                    className={`transition-all duration-300 ${isActive
                                        ? "opacity-100 text-brand-primary translate-x-0"
                                        : "opacity-0 -translate-x-2 text-zinc-300 group-hover:opacity-100 group-hover:translate-x-0"
                                        }`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-2/3 p-8 bg-gradient-to-br from-white/60 to-white/30 relative min-h-[420px] flex flex-col justify-between z-10">
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
                            className="text-2xl font-extrabold text-brand-heading mb-6 flex items-center gap-3"
                        >
                            <span className="bg-brand-primary/10 text-brand-primary p-2 rounded-xl">
                                {categoryIcons[activeCategory]}
                            </span>
                            {activeCategory}
                        </motion.h3>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-5 mt-2">
                            {buyMegaMenuData[activeCategory].map((item) => (
                                <motion.div variants={itemVariants} key={item.title}>
                                    <Link
                                        href={item.href}
                                        className="group flex flex-col gap-1 text-sm font-semibold text-brand-heading hover:text-brand-primary transition-colors py-1"
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

                {/* Bottom Call To Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="pt-6 mt-6 border-t border-zinc-200/50 flex justify-between items-center"
                >
                    <p className="text-sm text-brand-paragraph">
                        Showing top results for <strong className="text-brand-heading">{activeCategory}</strong>
                    </p>
                    <Link
                        href={`/buy/${activeCategory.toLowerCase().replace(/[\s/]+/g, '-')}`}
                        className="group flex items-center gap-2 text-sm font-bold text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10 px-4 py-2 rounded-xl transition-colors"
                    >
                        View all
                        <MoveRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-brand-primary/5 rounded-full blur-3xl -z-10 translate-y-1/2"></div>
        </motion.div>
    );
};

export default BuyMegaMenu;
