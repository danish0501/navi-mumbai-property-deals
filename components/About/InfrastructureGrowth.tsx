"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Plane, Train, Route, CheckCircle2, Zap, Globe, TrendingUp } from "lucide-react";

const drivers = [
    {
        icon: <Plane className="w-6 h-6" aria-hidden="true" />,
        title: "NMIA International Airport",
        description: "Set for late 2025 operations, this Adani-led project overseen by CIDCO will handle 60M passengers annually, elevating Panvel and Ulwe to global aviation gateways.",
        status: "Phase 1 Operational 2025",
        color: "from-blue-500 to-cyan-400"
    },
    {
        icon: <Route className="w-6 h-6" aria-hidden="true" />,
        title: "Atal Setu (MTHL)",
        description: "India's longest sea bridge, connected by MMRDA, has slashed travel time from Chirle to Sewri to 22 minutes, bridging the price gap in Dronagiri and Ulwe properties.",
        status: "Connectivity Milestone",
        color: "from-amber-500 to-orange-400"
    },
    {
        icon: <Train className="w-6 h-6" aria-hidden="true" />,
        title: "Navi Mumbai Metro",
        description: "The Line 1 (Belapur-Kharghar-Taloja) is now operational. CIDCO's Phase 2-3 will connect the upcoming airport to the existing local rail network.",
        status: "Smart Rail Connectivity",
        color: "from-emerald-500 to-teal-400"
    },
    {
        icon: <Globe className="w-6 h-6" aria-hidden="true" />,
        title: "NAINA Smart City",
        description: "A 600 sq. km. planned city by CIDCO (1.5x larger than Mumbai) featuring integrated townships in the influence area of the Navi Mumbai International Airport.",
        status: "The New Urban Frontier",
        color: "from-purple-500 to-indigo-400"
    },
    {
        icon: <Zap className="w-6 h-6" aria-hidden="true" />,
        title: "Coastal Road Project",
        description: "The upcoming 7km sea-link connecting NMIA to MTHL will provide high-speed, signal-free transit, further unlocking real estate value in the Dronagiri node.",
        status: "Infrastructure Surge",
        color: "from-orange-500 to-yellow-400"
    }
];

export default function InfrastructureGrowth() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const titleRef = useRef(null);
    const isTitleInView = useInView(titleRef, { once: true });

    return (
        <section ref={sectionRef} className="py-16 bg-brand-dark relative overflow-hidden text-white selection:bg-brand-primary/30" aria-labelledby="infra-heading">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 opacity-50" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-30" aria-hidden="true" />

                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" aria-hidden="true" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Centered Heading Section */}
                <div className="text-center max-w-4xl mx-auto mb-20 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8"
                    >
                        <Zap className="w-3 h-3 animate-pulse" aria-hidden="true" />
                        CIDCO & MMRDA Future Roadmap
                    </motion.div>

                    <div ref={titleRef} className="mb-8">
                        <motion.h2
                            id="infra-heading"
                            className="text-7xl max-[769px]:text-5xl max-[426px]:text-4xl max-[376px]:text-3xl max-[321px]:text-2xl font-black !text-brand-white leading-[1.05] tracking-tighter"
                        >
                            {["Future", "Infrastructure", "Hub"].map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                                    className="inline-block mr-4 last:mr-0"
                                >
                                    {word}
                                </motion.span>
                            ))}
                            <br />
                            <motion.span
                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                animate={isTitleInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                                transition={{ delay: 0.6, duration: 1 }}
                                className="text-brand-primary italic"
                            >
                                2026 Edition
                            </motion.span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className="text-zinc-400 text-lg md:text-xl max-[426px]:text-lg leading-relaxed mx-auto max-w-4xl"
                    >
                        Navi Mumbai nodes like Kharghar and Panvel are evolving into global economic powerhouses under the vision of CIDCO and MMRDA.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 max-[769px]:gap-4 items-center">
                    {/* Left Content Side */}
                    <div className="order-2 lg:order-1">
                        <div className="relative space-y-4">
                            {drivers.map((driver, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: index * 0.15 }}
                                    whileHover={{ x: 10 }}
                                    className="flex gap-6 max-[426px]:gap-4 max-[321px]:gap-2 p-4 max-[426px]:p-2 max-[321px]:p-0 rounded-3xl group hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/10 relative"
                                >
                                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-gradient-to-br ${driver.color} transition-all duration-500 overflow-hidden relative shadow-lg group-hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
                                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                                        <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                                            {driver.icon}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h3 className="text-xl max-[376px]:text-lg font-bold !text-brand-white group-hover:text-white transition-colors">
                                                {driver.title}
                                            </h3>
                                            <span className={`text-[10px] font-black bg-white/5 text-zinc-400 group-hover:bg-gradient-to-r ${driver.color} group-hover:text-white px-2.5 py-1 rounded-full uppercase tracking-tighter transition-all`}>
                                                {driver.status}
                                            </span>
                                        </div>
                                        <p className="text-zinc-500 text-sm leading-relaxed max-w-md group-hover:text-zinc-300 transition-colors">
                                            {driver.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Visual Side */}
                    <div className="order-1 lg:order-2 relative h-[500px] md:h-[700px] max-[426px]:h-[400px]">
                        <motion.div
                            style={{ y: y1 }}
                            className="relative h-full w-full"
                        >
                            {/* Main Image Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative h-full w-full rounded-[3.5rem] overflow-hidden border border-white/10 group shadow-2xl"
                            >
                                <Image
                                    src="/navi_mumbai_airport_render_1773210621205.png"
                                    alt="Aerial view of upcoming Navi Mumbai International Airport (NMIA) infrastructure project in Panvel"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" aria-hidden="true" />

                                {/* Scanning Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent h-[200%] -top-[100%] group-hover:animate-scan pointer-events-none" aria-hidden="true" />

                                {/* Interactive Hotspots */}
                                <div className="absolute top-1/4 left-1/3 group">
                                    <div className="relative">
                                        <div className="absolute inset-0 w-8 h-8 bg-brand-primary rounded-full animate-ping opacity-75" aria-hidden="true" />
                                        <div className="w-8 h-8 bg-brand-primary rounded-full border-4 border-white/20 flex items-center justify-center text-white scale-75">
                                            <TrendingUp size={16} aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Stats Overlay */}
                                <motion.div
                                    initial={{ y: 40, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute bottom-6 left-6 right-6 p-8 max-[426px]:p-4 bg-zinc-900/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-3xl overflow-hidden group/card"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover/card:bg-brand-primary/20 transition-colors" aria-hidden="true" />

                                    <div className="flex items-center gap-5 mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-brand-primary/20 flex items-center justify-center text-brand-primary ring-1 ring-brand-primary/20">
                                            <CheckCircle2 size={24} aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase text-brand-primary tracking-[0.2em] max-[321px]:tracking-[0em] mb-1 max-[426px]:mb-0">Expert Verdict</p>
                                            <p className="text-2xl max-[321px]:text-lg font-black !text-brand-white">Prime Growth</p>
                                        </div>
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed relative z-10">
                                        With infrastructure parity reaching critical mass in CIDCO nodes, Navi Mumbai offers <span className="text-brand-primary font-bold">~40% lower entry points</span> than MMR averages.
                                    </p>
                                </motion.div>
                            </motion.div>

                            {/* Secondary Floating Image */}
                            <motion.div
                                style={{ y: y2 }}
                                className="absolute -top-12 -right-12 w-56 h-56 rounded-[2.5rem] overflow-hidden border-8 border-zinc-950 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] hidden xl:block z-20"
                            >
                                <Image
                                    src="/mthl_atal_setu_night_1773210593397.png"
                                    alt="Modern engineering of Atal Setu (MTHL) connecting Mumbai to Navi Mumbai at night"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay" aria-hidden="true" />
                            </motion.div>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-[80px] -z-10" aria-hidden="true" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}


