"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Eye, Handshake, Headset, CheckCircle2, TrendingUp, Search, UserCheck } from "lucide-react";

const valueCards = [
    {
        icon: <ShieldCheck className="w-10 h-10" aria-hidden="true" />,
        title: "100% RERA Compliance",
        subtitle: "Verified Assets Only",
        description: "We don't just list properties; we audit them. Our in-house legal team verifies RERA numbers, land titles, and OC status before any property goes live.",
        features: ["Title Deed Verification", "Construction Progress Audits", "Developer Track Record Check"],
        color: "blue"
    },
    {
        icon: <Eye className="w-10 h-10" aria-hidden="true" />,
        title: "Zero Hidden Charges",
        subtitle: "A Radical Transparency Policy",
        description: "Hidden costs are the enemy of trust. From stamp duty to society charges, we provide a full breakdown of the Total Cost of Ownership (TCO) upfront.",
        features: ["All-Inclusive Pricing", "Tax Advisory", "Mortgage Transparency"],
        color: "gold"
    },
    {
        icon: <Handshake className="w-10 h-10" aria-hidden="true" />,
        title: "Client-First Advocacy",
        subtitle: "Consultants, Not Salesmen",
        description: "Our advisors are structured to prioritize your long-term wealth. We often advise clients NOT to buy if a project doesn't meet our ROI benchmarks.",
        features: ["ROI Projection Reports", "Micro-market Analysis", "Resale Velocity Math"],
        color: "emerald"
    },
    {
        icon: <Headset className="w-10 h-10" aria-hidden="true" />,
        title: "Post-Sale Ecosystem",
        subtitle: "Lifetime Support Lifecycle",
        description: "Registration is just the beginning. We provide a full suite of property management, rental assistance, and resale services to ensure asset performance.",
        features: ["Rental Management", "Property Maintenance", "Legal Documentation Support"],
        color: "indigo"
    }
];

export default function CoreValues() {
    return (
        <section className="py-16 bg-white relative overflow-hidden">
            {/* Soft Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] -mr-64 -mt-32 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[100px] -ml-40 -mb-20 pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto px-6 relative">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <UserCheck size={14} aria-hidden="true" /> Our Ethics & standards
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-zinc-950 leading-[1.1] mb-6"
                    >
                        Integrity that <span className="text-brand-primary italic">Shields</span> Wealth.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto"
                    >
                        In an unregulated landscape, we provide a haven of <strong className="text-zinc-900 font-bold">transparency, data, and integrity.</strong>
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {valueCards.map((card, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-1 bg-white hover:bg-gradient-to-br hover:from-brand-primary/20 hover:to-transparent rounded-[2.5rem] transition-all duration-500 shadow-sm hover:shadow-2xl"
                        >
                            <div className="h-full bg-white rounded-[2.4rem] p-8 md:p-10 border border-zinc-100 flex flex-col md:flex-row gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 rounded-2xl bg-zinc-50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-inner group-hover:rotate-6">
                                        {card.icon}
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <span className="text-brand-primary font-bold text-xs uppercase tracking-widest mb-2 block">
                                        {card.subtitle}
                                    </span>
                                    <h3 className="text-2xl font-black text-zinc-900 mb-4 group-hover:translate-x-1 transition-transform">
                                        {card.title}
                                    </h3>
                                    <p className="text-zinc-500 leading-relaxed mb-8">
                                        {card.description}
                                    </p>

                                    <div className="grid sm:grid-cols-1 gap-3">
                                        {card.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-center gap-3 text-sm font-bold text-zinc-700">
                                                <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                                    <CheckCircle2 size={14} aria-hidden="true" />
                                                </div>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Trust Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 p-8 rounded-3xl bg-zinc-50 border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-lg shadow-brand-primary/20">
                            <TrendingUp size={24} aria-hidden="true" />
                        </div>
                        <div>
                            <h4 className="font-black text-zinc-900 text-lg">Predicting Value, Ensuring Performance.</h4>
                            <p className="text-zinc-500 text-sm">Every recommendation is backed by 12 years of micro-market data.</p>
                        </div>
                    </div>
                    <Link
                        href="/blogs"
                        title="Explore our data-backed real estate approach in Navi Mumbai"
                        aria-label="Learn about our data-backed approach to real estate investments"
                        className="px-8 py-3 bg-zinc-950 text-white font-bold rounded-xl hover:bg-brand-primary-hover transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/20 flex items-center gap-2 group whitespace-nowrap cursor-pointer"
                    >
                        <Search size={18} className="group-hover:scale-125 transition-transform" aria-hidden="true" />
                        Explore Our Approach
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
