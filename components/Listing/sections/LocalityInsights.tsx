"use client";
import { MapPin, Building2, Train, Plane } from "lucide-react";
import { ListingMode } from "./types";
import { LocalityInsight } from "../listingData";

interface LocalityInsightsProps {
    mode: ListingMode;
    insight: LocalityInsight;
}

export default function LocalityInsights({ mode, insight }: LocalityInsightsProps) {
    return (
        <section
            aria-labelledby="locality-insights-heading"
            className="bg-white border-t border-zinc-100 mt-4"
        >
            <div className="container mx-auto px-4 sm:px-6 py-12">
                {/* Section header */}
                <div className="flex items-start gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-[#baa360]/10 flex items-center
                                   justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5 text-[#baa360]" aria-hidden="true" />
                    </div>
                    <div>
                        <h2
                            id="locality-insights-heading"
                            className="text-2xl sm:text-[28px] font-extrabold text-zinc-900 leading-tight"
                        >
                            Why {mode === "buy" ? "Invest" : mode === "rent" ? "Live" : "Sell"}{" "}
                            in {insight.location}?
                        </h2>
                        <p className="text-zinc-500 text-[14px] mt-1 font-medium">
                            Local market intelligence for informed decisions
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Market Overview */}
                    <article
                        className="md:col-span-1 bg-gradient-to-br from-[#baa360]/8 to-[#8f7b44]/5
                                  rounded-[22px] border border-[#baa360]/15 p-6"
                        aria-label="Market overview"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Building2
                                className="w-4 h-4 text-[#baa360]"
                                aria-hidden="true"
                            />
                            <span className="text-[11px] font-black uppercase tracking-widest
                                           text-[#baa360]">
                                Market Overview
                            </span>
                        </div>
                        <p className="text-zinc-700 text-[14px] leading-relaxed font-medium">
                            {insight.whyInvest}
                        </p>
                    </article>

                    {/* Connectivity */}
                    <article
                        className="bg-white rounded-[22px] border border-zinc-100 p-6
                                  shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
                        aria-label="Connectivity information"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Train className="w-4 h-4 text-[#4c8ef7]" aria-hidden="true" />
                            <span className="text-[11px] font-black uppercase tracking-widest
                                           text-[#4c8ef7]">
                                Connectivity
                            </span>
                        </div>
                        <p className="text-zinc-700 text-[14px] leading-relaxed font-medium">
                            {insight.connectivity}
                        </p>
                    </article>

                    {/* Infrastructure */}
                    <article
                        className="bg-white rounded-[22px] border border-zinc-100 p-6
                                  shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
                        aria-label="Future infrastructure"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Plane className="w-4 h-4 text-violet-500" aria-hidden="true" />
                            <span className="text-[11px] font-black uppercase tracking-widest
                                           text-violet-500">
                                Future Infrastructure
                            </span>
                        </div>
                        <p className="text-zinc-700 text-[14px] leading-relaxed font-medium">
                            {insight.infrastructure}
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
}
