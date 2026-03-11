"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
    { label: "Properties Handled", value: "2,500+", subtext: "Commercial & Residential" },
    { label: "Investor Retained", value: "85%", subtext: "Repeat Investment Rate" },
    { label: "Verified Projects", value: "100%", subtext: "RERA Compliant Only" },
    { label: "Market Experience", value: "12+", subtext: "Years in Navi Mumbai" }
];

export default function CompanyImpact() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section ref={containerRef} className="py-16 bg-brand-primary-hover relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2 pointer-events-none" />

            <motion.div
                style={{ scale, opacity }}
                className="container mx-auto px-6 relative"
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="lg:w-1/2 text-white">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-[0.2em] mb-6"
                        >
                            Our Real-World Impact
                        </motion.span>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                            Quantifying the <span className="text-brand-white italic">Difference</span> we make Every Day.
                        </h2>
                        <p className="text-brand-white text-xl leading-relaxed">
                            Data doesn't lie. Our growth is a direct reflection of the success our clients experience in the Navi Mumbai real estate market.
                        </p>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 bg-white rounded-3xl shadow-2xl flex flex-col justify-center border border-white/20"
                            >
                                <span className="text-4xl md:text-5xl font-black text-brand-primary mb-2">
                                    {stat.value}
                                </span>
                                <span className="text-lg font-bold text-zinc-900 mb-1">
                                    {stat.label}
                                </span>
                                <span className="text-sm text-brand-muted font-medium">
                                    {stat.subtext}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
