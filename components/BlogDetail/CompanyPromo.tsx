"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Phone, ArrowUpRight } from "lucide-react";

const CompanyPromo = () => {
    return (
        <aside className="hidden xl:block w-72 shrink-0 h-fit sticky top-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-[2rem] bg-white border border-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group"
            >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-brand-primary/10 transition-colors duration-500" />

                {/* Company Logo/Name */}
                <div className="relative mb-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-4 rounded-2xl bg-neutral-50 flex items-center justify-center p-3">
                        {/* Fallback Logo Icon */}
                        <Home className="w-full h-full text-brand-primary" />
                    </div>
                    <h4 className="text-xl font-black text-brand-heading uppercase tracking-tight">
                        Shreeji Ventures
                    </h4>
                    <div className="h-0.5 w-12 bg-brand-primary/20 mt-2" />
                </div>

                <div className="space-y-6 relative">
                    <div className="text-center">
                        <p className="text-xs font-black text-brand-primary uppercase tracking-[0.2em] mb-2">Exclusive Offer</p>
                        <h5 className="text-lg font-bold text-brand-heading leading-snug">
                            Visit Shreeji Divine
                        </h5>
                    </div>

                    <p className="text-sm text-brand-paragraph/80 text-center leading-relaxed">
                        Luxurious 6.5, 5.5, 4.5, 4, 3 and 2 BHK flats in Kharghar.
                    </p>

                    <div className="pt-4 space-y-3">
                        <button className="w-full py-4 px-6 rounded-2xl bg-brand-primary text-white font-black text-sm uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 group/btn">
                            Book Site Visit
                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </button>

                        <button className="w-full py-4 px-6 rounded-2xl bg-neutral-50 text-brand-heading font-black text-sm uppercase tracking-widest hover:bg-neutral-100 transition-all flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            Enquire Now
                        </button>
                    </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-8 pt-8 border-t border-neutral-100 flex items-center justify-center gap-6">
                    <div className="text-center">
                        <p className="text-[10px] font-black text-brand-heading">15+</p>
                        <p className="text-[8px] font-bold text-neutral-400 uppercase">Years</p>
                    </div>
                    <div className="w-px h-6 bg-neutral-100" />
                    <div className="text-center">
                        <p className="text-[10px] font-black text-brand-heading">5000+</p>
                        <p className="text-[8px] font-bold text-neutral-400 uppercase">Families</p>
                    </div>
                    <div className="w-px h-6 bg-neutral-100" />
                    <div className="text-center">
                        <p className="text-[10px] font-black text-brand-heading">RERA</p>
                        <p className="text-[8px] font-bold text-neutral-400 uppercase">Certified</p>
                    </div>
                </div>
            </motion.div>
        </aside>
    );
};

export default CompanyPromo;
