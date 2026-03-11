"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { TrendingUp, BadgeCheck, Users, Landmark, Zap } from "lucide-react";

const features = [
    {
        icon: <TrendingUp className="w-5 h-5" />,
        title: "15% Annual Appreciation",
        description: "Capital values in nodes like Ulwe and Kharghar are outpacing Mumbai averages due to MTHL impact.",
        stat: "+15.2%"
    },
    {
        icon: <Landmark className="w-5 h-5" />,
        title: "CIDCO Planned Growth",
        description: "Navi Mumbai is the world's largest planned city, ensuring sustainable long-term infrastructure.",
        stat: "100% Planned"
    },
    {
        icon: <Zap className="w-5 h-5" />,
        title: "MTHL & Airport Core",
        description: "Strategic proximity to the Atal Setu and upcoming International Airport drives rental demand.",
        stat: "Tier 1 Hub"
    },
    {
        icon: <BadgeCheck className="w-5 h-5" />,
        title: "RERA Verified Inventory",
        description: "Our legal team verifies every project's RERA status and title history for secure investments.",
        stat: "100% Secure"
    }
];

export default function AboutInfo() {
    return (
        <section className="py-16 bg-white relative overflow-hidden" aria-labelledby="about-heading">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230054A5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />

            <div className="container mx-auto px-2 relative">
                <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-center">

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-100">
                            <Image
                                src="/luxury_about_interior.png"
                                alt="Navi Mumbai Real Estate Investment Excellence"
                                width={800}
                                height={800}
                                className="object-cover aspect-[5/5] hover:scale-105 transition-transform duration-1000"
                                priority
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

                            {/* Floating Analytics Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="absolute top-10 -right-4 md:right-10 p-6 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-w-[220px] hidden md:block"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                        <TrendingUp size={20} />
                                    </div>
                                    <span className="font-bold text-zinc-900">Live Trend</span>
                                </div>
                                <p className="text-xs text-zinc-600 leading-relaxed">
                                    Navi Mumbai yields are <span className="text-green-600 font-bold">2.4% higher</span> than MMR average in Q1 2026.
                                </p>
                            </motion.div>
                        </div>

                        {/* Experience Counter Badge */}
                        <div className="absolute -bottom-6 -left-6 p-8 bg-brand-primary rounded-[2rem] text-white shadow-xl flex items-center gap-5">
                            <div className="text-4xl font-black">12+</div>
                            <div className="text-xs uppercase tracking-widest font-bold leading-tight opacity-80">
                                Years of Local<br />Market Mastery
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-10"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-black uppercase tracking-widest mb-6 border border-brand-primary/10">
                                <Users size={14} /> Expertise & Trust
                            </span>
                            <h2 id="about-heading" className="text-4xl md:text-6xl font-black text-zinc-950 leading-[1.1] mb-6 tracking-tight">
                                Your Gateway to <span className="text-brand-primary italic">Navi Mumbai's</span> Premier Assets.
                            </h2>
                            <p className="text-zinc-600 text-lg leading-relaxed mb-4">
                                Navigating the Navi Mumbai real estate landscape requires more than just listings; it requires <strong className="text-brand-paragraph">deep-node market intelligence</strong>. Since 2014, we have helped thousands find value in Mumbai's most planned satellite city.
                            </p>
                            <p className="text-zinc-500 text-base leading-relaxed mb-4">
                                From the luxury high-rises on <strong className="text-brand-paragraph">Palm Beach Road</strong> to high-growth commercial plots in <strong className="text-brand-paragraph">South Navi Mumbai</strong>, our data-backed approach ensures every investment is verified, compliant, and positioned for growth.
                            </p>
                            <p className="text-zinc-500 text-lg leading-relaxed">
                                As we move further into 2026, the operationalization of the <strong className="text-brand-paragraph">Atal Setu (MTHL)</strong> and the final phase of the <strong className="text-brand-paragraph">Navi Mumbai International Airport</strong> have transformed the region from a satellite city into India’s premier growth engine.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    {features.map((feature, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-brand-primary/20 hover:shadow-xl transition-all duration-500 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-lg shadow-brand-primary/20 group-hover:rotate-6 transition-transform">
                                    {feature.icon}
                                </div>
                                <span className="text-[11px] font-black text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-md uppercase">
                                    {feature.stat}
                                </span>
                            </div>
                            <h3 className="text-brand-heading font-bold text-lg mb-2 group-hover:text-brand-primary transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-brand-paragraph text-base !leading-normal">
                                {feature.description}
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}