"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, Handshake, Headset } from "lucide-react";

const values = [
    {
        icon: <ShieldCheck className="w-12 h-12" />,
        title: "100% RERA Accuracy",
        description: "In an industry of promises, we provide proof. Every project on our platform is cross-verified for RERA compliance and legal title clearance.",
    },
    {
        icon: <Eye className="w-12 h-12" />,
        title: "Radical Transparency",
        description: "No hidden charges, no obscured floor plans. We provide the full picture—rental yields, hidden costs, and future node development roadmaps.",
    },
    {
        icon: <Handshake className="w-12 h-12" />,
        title: "Advocacy Over Sales",
        description: "We don't just sell property; we advocate for your financial growth. Our advisors are incentivized on client satisfaction, not just transaction volume.",
    },
    {
        icon: <Headset className="w-12 h-12" />,
        title: "Lifetime Relationship",
        description: "Our service doesn't end at registration. We assist in leasing, resale, and property management, ensuring your asset performs for years.",
    }
];

export default function CoreValues() {
    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-zinc-950 mb-6"
                    >
                        Built on a Foundation of <span className="text-brand-primary">Integrity.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-600 text-lg"
                    >
                        Our business model is simple: provide more value, better data, and absolute honesty in every interaction.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-6 ring-4 ring-brand-primary/5 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 mb-4">{value.title}</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
