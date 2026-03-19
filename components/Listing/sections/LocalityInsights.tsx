"use client";
import { motion, Variants } from "framer-motion";
import { Building2, Train, Plane, Zap } from "lucide-react";
import { ListingMode } from "./types";
import { LocalityInsight } from "../listingData";

interface LocalityInsightsProps {
    mode: ListingMode;
    insight: LocalityInsight;
}

export default function LocalityInsights({ mode, insight }: LocalityInsightsProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const headingText = {
        buy: "Why Invest",
        rent: "Why Live",
        sell: "Why Sell"
    };

    return (
        <section
            aria-labelledby="locality-insights-heading"
            className="relative overflow-hidden bg-[#fafafa] py-16"
        >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#baa360]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px]" />
            </div>

            <div className="container relative mx-auto px-4 sm:px-6">
                {/* Heading */}
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#baa360]/10 border border-[#baa360]/20 shadow-sm backdrop-blur-sm">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#baa360] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#baa360]"></span>
                            </div>
                            <span className="text-[#baa360] text-[10px] font-black uppercase tracking-[0.2em]">Market Intelligence Pulse</span>
                        </div>
                    </motion.div>

                    <div className="max-w-4xl relative">
                        {/* Interactive Background Shape for Heading */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#baa360]/10 rounded-full blur-[60px] pointer-events-none opacity-50"></div>

                        <motion.h2
                            id="locality-insights-heading"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-heading tracking-tighter leading-[1.05] mb-6"
                        >
                            {headingText[mode]} in {" "}
                            <span className="relative inline-block mt-2">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-[#8f7b44] to-brand-primary bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                                    {insight.location}
                                </span>
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1, duration: 1 }}
                                    className="absolute -bottom-2 left-0 h-[8px] bg-brand-primary/20 -z-0 rounded-full"
                                ></motion.span>
                            </span>
                            <span className="text-brand-primary">?</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-brand-paragraph text-lg font-medium max-w-2xl mx-auto leading-relaxed"
                        >
                            Deep dive into the regional fundamentals, infrastructure growth, and connectivity maps of India's fastest-growing residential corridor.
                        </motion.p>
                    </div>
                </div>

                {/* Insights Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {/* Market Overview */}
                    <motion.article
                        variants={itemVariants}
                        whileHover="hover"
                        initial="initial"
                        animate="initial"
                        onHoverStart={() => { }}
                        className="group relative flex flex-col h-full bg-white rounded-[32px] p-8 border border-zinc-100 shadow-sm transition-all duration-500 hover:border-[#baa360]/30"
                        style={{
                            boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.05)"
                        }}
                    >
                        <motion.div
                            variants={{
                                initial: { y: 0 },
                                hover: { y: -8 }
                            }}
                            className="flex flex-col h-full"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                    <Building2 className="w-5 h-5 text-brand-primary" aria-hidden="true" />
                                </div>
                                <span className="text-[14px] font-bold text-brand-muted uppercase tracking-widest">
                                    Market Overview
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-brand-heading mb-4 transition-colors">Strategic Advantage</h3>
                            <p className="text-brand-paragraph text-[15px] font-medium leading-relaxed mb-6">
                                {insight.whyInvest}
                            </p>

                            {insight.highlights && insight.highlights.length > 0 && (
                                <div className="space-y-3 mt-auto pt-6 border-t border-brand-muted/20">
                                    <span className="text-[12px] font-black uppercase tracking-widest text-brand-primary">Investment Highlights</span>
                                    {insight.highlights.map((highlight, index) => (
                                        <div key={index} className="flex items-start gap-2 mt-4">
                                            <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0 transition-colors">
                                                <Zap className="w-3 h-3 text-brand-primary" />
                                            </div>
                                            <span className="text-brand-paragraph text-[14px] font-medium leading-tight">
                                                {highlight}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.article>

                    {/* Connectivity */}
                    <motion.article
                        variants={itemVariants}
                        whileHover="hover"
                        initial="initial"
                        animate="initial"
                        className="group relative flex flex-col h-full bg-white rounded-[32px] p-8 border border-zinc-100 shadow-sm transition-all duration-500 hover:border-blue-200"
                        style={{
                            boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.05)"
                        }}
                    >
                        <motion.div
                            variants={{
                                initial: { y: 0 },
                                hover: { y: -8 }
                            }}
                            className="flex flex-col h-full"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                    <Train className="w-5 h-5 text-blue-500" aria-hidden="true" />
                                </div>
                                <span className="text-[14px] font-bold text-brand-muted uppercase tracking-widest">
                                    Connectivity
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-brand-heading mb-4 transition-colors">Seamless Access</h3>
                            <p className="text-brand-paragraph text-[15px] leading-relaxed font-medium mb-8 flex-grow">
                                {insight.connectivity}
                            </p>

                            {insight.connectivityHighlights && insight.connectivityHighlights.length > 0 && (
                                <div className="space-y-3 pt-6 border-t border-brand-muted/20">
                                    <span className="text-[12px] font-black uppercase tracking-widest text-blue-500/60">Transport Highlights</span>
                                    {insight.connectivityHighlights.map((highlight, index) => (
                                        <div key={index} className="flex items-start gap-2 mt-4">
                                            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 transition-colors">
                                                <Zap className="w-3 h-3 text-blue-500" />
                                            </div>
                                            <span className="text-brand-paragraph text-[14px] font-medium leading-tight">
                                                {highlight}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.article>

                    {/* Infrastructure */}
                    <motion.article
                        variants={itemVariants}
                        whileHover="hover"
                        initial="initial"
                        animate="initial"
                        className="group relative flex flex-col h-full bg-white rounded-[32px] p-8 border border-zinc-100 shadow-sm transition-all duration-500 hover:border-violet-200"
                        style={{
                            boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.05)"
                        }}
                    >
                        <motion.div
                            variants={{
                                initial: { y: 0 },
                                hover: { y: -8 }
                            }}
                            className="flex flex-col h-full"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                    <Plane className="w-5 h-5 text-violet-500" aria-hidden="true" />
                                </div>
                                <span className="text-[14px] font-bold text-brand-muted uppercase tracking-widest">
                                    Infrastructure
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-brand-heading mb-4 group-hover:text-violet-500 transition-colors">Future Growth</h3>
                            <p className="text-brand-paragraph text-[15px] leading-relaxed font-medium mb-8 flex-grow">
                                {insight.infrastructure}
                            </p>

                            {insight.infraHighlights && insight.infraHighlights.length > 0 && (
                                <div className="space-y-3 pt-6 border-t border-brand-muted/20">
                                    <span className="text-[12px] font-black uppercase tracking-widest text-violet-500/60">Development Highlights</span>
                                    {insight.infraHighlights.map((highlight, index) => (
                                        <div key={index} className="flex items-start gap-2 mt-4">
                                            <div className="w-5 h-5 rounded-full bg-violet-50 flex items-center justify-center flex-shrink-0 transition-colors">
                                                <Zap className="w-2.5 h-2.5 text-violet-500" />
                                            </div>
                                            <span className="text-brand-paragraph text-[14px] font-medium leading-tight">
                                                {highlight}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.article>
                </motion.div>
            </div>
        </section>
    );
}
