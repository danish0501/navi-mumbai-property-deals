"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { ListingProperty, ListingMode } from "../listingData";

interface HandpickedCarouselProps {
    carouselRef: React.RefObject<HTMLDivElement | null>;
    carouselProgress: number;
    handpicked: ListingProperty[];
    mode: ListingMode;
    scrollCarousel: (dir: "left" | "right") => void;
}

export default function HandpickedCarousel({
    carouselRef,
    handpicked,
    mode,
    scrollCarousel,
}: HandpickedCarouselProps) {
    return (
        <section
            aria-labelledby="recommendations-heading"
            className="bg-[#fafaf9] py-16 overflow-x-clip"
        >
            <div className="container mx-auto px-4 sm:px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-8 relative"
                >
                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                                       bg-white/40 backdrop-blur-md border border-brand-primary/30 
                                       shadow-[0_2px_10px_-3px_rgba(186,163,96,0.2)] mb-5 group/badge cursor-default"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-primary-hover">
                                Curated Collection
                            </span>
                        </motion.div>

                        <div className="relative group/title">
                            <h2
                                id="recommendations-heading"
                                className="text-3xl sm:text-5xl font-black text-brand-heading tracking-tighter leading-none"
                            >
                                <motion.span
                                    className="inline-block text-brand-primary mr-3 filter drop-shadow-[0_0_8px_rgba(186,163,96,0.3)]"
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    whileHover={{ scale: 1.2, rotate: 180 }}
                                >
                                    ✦
                                </motion.span>
                                <span className="relative inline-block overflow-hidden pb-1">
                                    Handpicked
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary-hover bg-[length:200%_auto] animate-shimmer">
                                        {" "}Recommendations
                                    </span>
                                    {/* Interactive Underline */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-[3px] bg-brand-primary/30 w-full rounded-full"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        transition={{ delay: 0.5, duration: 1 }}
                                    />
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-[3px] bg-brand-primary w-24 rounded-full"
                                        initial={{ x: -100 }}
                                        whileInView={{ x: 0 }}
                                        transition={{ delay: 0.8, duration: 0.8 }}
                                    />
                                </span>
                            </h2>
                        </div>

                        <div className="flex items-center gap-4 mt-5 transition-transform duration-300 group-hover/title:translate-x-1">
                            <p className="text-brand-paragraph text-sm sm:text-lg font-medium max-w-3xl">
                                Expertly vetted properties defined by <span className="text-brand-heading font-bold">luxury & comfort.</span>
                            </p>
                        </div>
                    </div>

                    {/* Carousel controls */}
                    <div
                        className="flex items-center gap-3"
                        role="group"
                        aria-label="Carousel navigation"
                    >
                        <button
                            onClick={() => scrollCarousel("left")}
                            className="group/btn w-12 h-12 rounded-2xl bg-white border border-brand-muted/20
                                       flex items-center justify-center hover:border-brand-primary hover:bg-white
                                       transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                            aria-label="Scroll carousel left"
                        >
                            <ChevronLeft className="w-5 h-5 text-brand-paragraph group-hover/btn:text-brand-primary transition-colors" aria-hidden="true" />
                        </button>
                        <button
                            onClick={() => scrollCarousel("right")}
                            className="group/btn w-12 h-12 rounded-2xl bg-white border border-brand-muted/20
                                       flex items-center justify-center hover:border-brand-primary hover:bg-white
                                       transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                            aria-label="Scroll carousel right"
                        >
                            <ChevronRight className="w-5 h-5 text-brand-paragraph group-hover/btn:text-brand-primary transition-colors" aria-hidden="true" />
                        </button>
                    </div>
                </motion.div>

                {/* Carousel track */}
                <div
                    ref={carouselRef}
                    className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6 scroll-smooth"
                    style={{ WebkitOverflowScrolling: "touch" }}
                    role="list"
                    aria-label="Recommended properties carousel"
                >
                    {handpicked.map((prop, i) => (
                        <div
                            key={prop.id}
                            className="min-w-[88vw] sm:min-w-[340px] lg:min-w-[310px] flex-shrink-0 snap-center"
                            role="listitem"
                        >
                            <PropertyCard property={prop} index={i} mode={mode} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
