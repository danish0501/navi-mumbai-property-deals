"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp,
    BarChart3,
    Zap,
    SlidersHorizontal,
    BadgeCheck,
    ChevronRight,
    ChevronLeft,
    Home,
    MapPin,
    X,
    Train,
    Plane,
    Building2,
    ArrowRight,
    Target,
} from "lucide-react";

import PropertyCard from "./PropertyCard";
import {
    listingProperties,
    localityMetrics,
    localityInsight,
    type ListingMode,
    type ListingProperty,
} from "./listingData";

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────

interface HubProps {
    mode: ListingMode;
    pageTitle: string;
    pageSubtitle: string;
    /** Optional: filter properties by slug/keyword */
    filterKeyword?: string;
}

type BudgetFilter = "all" | "under60L" | "60L-1Cr" | "1Cr-2Cr" | "2Cr-5Cr" | "above5Cr";
type ConfigFilter = "all" | "1bhk" | "2bhk" | "3bhk" | "4bhk+" | "studio" | "commercial" | "plot";
type StatusFilter = "all" | "ready-to-move" | "under-construction" | "new-launch";

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────

const modeAccent: Record<ListingMode, { gradient: string; border: string; bg: string; text: string }> = {
    buy: {
        gradient: "from-[#baa360] to-[#8f7b44]",
        border: "border-[#baa360]/30",
        bg: "bg-[#baa360]/10",
        text: "text-[#baa360]",
    },
    rent: {
        gradient: "from-[#4c8ef7] to-[#3666c9]",
        border: "border-[#4c8ef7]/30",
        bg: "bg-[#4c8ef7]/10",
        text: "text-[#4c8ef7]",
    },
    sell: {
        gradient: "from-[#22c55e] to-[#15803d]",
        border: "border-[#22c55e]/30",
        bg: "bg-[#22c55e]/10",
        text: "text-[#22c55e]",
    },
};

const modeLabel: Record<ListingMode, string> = {
    buy: "Buy",
    rent: "Rent",
    sell: "Sell",
};

function pricePasses(property: ListingProperty, budget: BudgetFilter): boolean {
    if (budget === "all") return true;
    // Very lightweight parsing — extract numeric lakhs/crore value
    const raw = property.price.replace(/[₹,\s]/g, "");
    let crore = 0;
    if (raw.includes("Cr")) crore = parseFloat(raw.replace("Cr", ""));
    else if (raw.includes("L")) crore = parseFloat(raw.replace("L", "")) / 100;
    if (budget === "under60L") return crore < 0.6;
    if (budget === "60L-1Cr") return crore >= 0.6 && crore < 1;
    if (budget === "1Cr-2Cr") return crore >= 1 && crore < 2;
    if (budget === "2Cr-5Cr") return crore >= 2 && crore < 5;
    if (budget === "above5Cr") return crore >= 5;
    return true;
}

// ─────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────

// Metrics bar card
function MetricCard({
    icon,
    label,
    value,
    sub,
    mode,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    sub?: string;
    mode: ListingMode;
}) {
    const accent = modeAccent[mode];
    return (
        <div
            className={`flex items-center gap-4 flex-1 min-w-[200px]
                       bg-white rounded-2xl px-5 py-4
                       border ${accent.border}
                       shadow-[0_2px_20px_rgba(0,0,0,0.04)]`}
        >
            <div className={`w-11 h-11 rounded-xl ${accent.bg} flex items-center justify-center flex-shrink-0`}>
                {icon}
            </div>
            <div>
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">{label}</p>
                <p className="text-[19px] font-black text-zinc-900 leading-none">{value}</p>
                {sub && <p className="text-[11px] font-semibold text-zinc-400 mt-0.5">{sub}</p>}
            </div>
        </div>
    );
}

// Filter pill
function FilterPill({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-bold
                       border transition-all duration-250 whitespace-nowrap
                       ${active
                    ? "bg-[#baa360] text-white border-[#baa360] shadow-md"
                    : "bg-white text-zinc-600 border-zinc-200 hover:border-[#baa360]/50 hover:text-[#baa360]"
                }`}
        >
            {label}
        </button>
    );
}

// Sidebar filter group
function FilterGroup({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="pb-5 mb-5 border-b border-zinc-100 last:border-0 last:pb-0 last:mb-0">
            <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-3">{title}</p>
            {children}
        </div>
    );
}

// ─────────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────────

export default function UniversalListingHub({
    mode,
    pageTitle,
    pageSubtitle,
    filterKeyword,
}: HubProps) {
    // ── Filters ──────────────────────────────
    const [budget, setBudget] = useState<BudgetFilter>("all");
    const [config, setConfig] = useState<ConfigFilter>("all");
    const [status, setStatus] = useState<StatusFilter>("all");
    const [reraOnly, setReraOnly] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // ── Carousel ─────────────────────────────
    const carouselRef = useRef<HTMLDivElement>(null);
    const [carouselProgress, setCarouselProgress] = useState(0);

    const handleCarouselScroll = useCallback(() => {
        const el = carouselRef.current;
        if (!el) return;
        const progress = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
        setCarouselProgress(progress);
    }, []);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        el.addEventListener("scroll", handleCarouselScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleCarouselScroll);
    }, [handleCarouselScroll]);

    const scrollCarousel = (dir: "left" | "right") => {
        const el = carouselRef.current;
        if (!el) return;
        el.scrollBy({ left: dir === "right" ? 360 : -360, behavior: "smooth" });
    };

    const accent = modeAccent[mode];
    const metrics = localityMetrics[mode];
    const insight = localityInsight;

    // ── Filtered properties ───────────────────
    const filtered = listingProperties.filter((p) => {
        if (!pricePasses(p, budget)) return false;
        if (config !== "all" && p.configuration !== config) return false;
        if (status !== "all" && p.constructionStatus !== status) return false;
        if (reraOnly && !p.isReraVerified) return false;
        // If a keyword is provided (from slug), loosely filter by location/title
        if (filterKeyword) {
            const kw = filterKeyword.toLowerCase();
            const match =
                p.location.toLowerCase().includes(kw) ||
                p.title.toLowerCase().includes(kw) ||
                p.configuration.toLowerCase().includes(kw);
            if (!match) return true; // don't filter too aggressively — show all if no match
        }
        return true;
    });

    // Featured (for carousel)
    const handpicked = listingProperties.slice(0, 5);

    const resetFilters = () => {
        setBudget("all");
        setConfig("all");
        setStatus("all");
        setReraOnly(false);
    };

    const hasActiveFilters = budget !== "all" || config !== "all" || status !== "all" || reraOnly;

    // ─────────────────────────────────────────
    //  Render
    // ─────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#fafaf9] relative">
            {/* ══════════════════════════════
                Mesh background
            ══════════════════════════════ */}
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-[0.018]"
                aria-hidden="true"
                style={{
                    backgroundImage: "radial-gradient(#000 0.7px, transparent 0.7px)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Ambient glow blobs */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] right-[-8%] w-[600px] h-[600px] bg-[#baa360]/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-[#baa360]/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
                {/* ══════════════════════════════
                    HERO HEADER
                ══════════════════════════════ */}
                <header
                    className="bg-white border-b border-zinc-100
                               shadow-[0_1px_16px_rgba(0,0,0,0.04)]"
                    role="banner"
                >
                    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
                        {/* Mode badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                                       border text-[11px] font-black uppercase tracking-widest mb-4
                                       backdrop-blur-sm"
                            style={{
                                background:
                                    mode === "buy"
                                        ? "rgba(186,163,96,0.08)"
                                        : mode === "rent"
                                            ? "rgba(76,142,247,0.08)"
                                            : "rgba(34,197,94,0.08)",
                                borderColor:
                                    mode === "buy"
                                        ? "rgba(186,163,96,0.3)"
                                        : mode === "rent"
                                            ? "rgba(76,142,247,0.3)"
                                            : "rgba(34,197,94,0.3)",
                                color:
                                    mode === "buy"
                                        ? "#baa360"
                                        : mode === "rent"
                                            ? "#4c8ef7"
                                            : "#22c55e",
                            }}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                style={{
                                    backgroundColor:
                                        mode === "buy" ? "#baa360" : mode === "rent" ? "#4c8ef7" : "#22c55e",
                                }}
                                aria-hidden="true"
                            />
                            {modeLabel[mode]} · Navi Mumbai
                        </div>

                        {/* H1 */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900
                                      leading-[1.12] tracking-tight mb-3 max-w-3xl">
                            {pageTitle}
                        </h1>

                        <p className="text-zinc-500 text-[15px] sm:text-[16px] font-medium
                                     leading-relaxed max-w-2xl mb-2">
                            {pageSubtitle}
                        </p>

                        {/* Result count */}
                        <p className="text-[13px] text-zinc-400 font-semibold">
                            <span className="text-zinc-700 font-extrabold">{filtered.length}</span> properties
                            found&nbsp;
                            {hasActiveFilters && (
                                <button
                                    onClick={resetFilters}
                                    className="ml-1 text-[#baa360] underline hover:text-[#8f7b44]
                                               transition-colors"
                                >
                                    (clear filters)
                                </button>
                            )}
                        </p>
                    </div>
                </header>

                {/* ══════════════════════════════
                    QUICK METRICS BAR  (E-E-A-T)
                ══════════════════════════════ */}
                <section
                    aria-label="Market metrics for this locality"
                    className="bg-white border-b border-zinc-100"
                >
                    <div className="container mx-auto px-4 sm:px-6 py-5">
                        <div className="flex gap-3 overflow-x-auto no-scrollbar">
                            <MetricCard
                                mode={mode}
                                icon={
                                    <BarChart3
                                        className={`w-5 h-5 ${accent.text}`}
                                        aria-hidden="true"
                                    />
                                }
                                label="Avg. Locality Price"
                                value={metrics.avgPricePsf}
                                sub="Per sq.ft — Q1 2026"
                            />
                            <MetricCard
                                mode={mode}
                                icon={
                                    <TrendingUp
                                        className={`w-5 h-5 ${accent.text}`}
                                        aria-hidden="true"
                                    />
                                }
                                label="1-Year Growth"
                                value={metrics.yearlyGrowth}
                                sub="YoY · Navi Mumbai avg."
                            />
                            <MetricCard
                                mode={mode}
                                icon={
                                    <Zap
                                        className={`w-5 h-5 ${accent.text}`}
                                        aria-hidden="true"
                                    />
                                }
                                label="Demand Index"
                                value={metrics.demandIndex}
                                sub={metrics.demandLabel}
                            />
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════
                    SIDEBAR + GRID LAYOUT
                ══════════════════════════════ */}
                <main className="container mx-auto px-4 sm:px-6 py-8" aria-label="Property listings">
                    <div className="flex gap-6 relative">

                        {/* ── Mobile filter toggle ── */}
                        <div className="lg:hidden mb-4 w-full">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="flex items-center gap-2 px-5 py-3 bg-white border border-zinc-200
                                           rounded-2xl text-[14px] font-bold text-zinc-700
                                           shadow-sm hover:border-[#baa360]/50 transition-colors"
                                aria-expanded={sidebarOpen}
                                aria-controls="filter-sidebar"
                            >
                                <SlidersHorizontal className="w-4 h-4 text-[#baa360]" aria-hidden="true" />
                                Filters
                                {hasActiveFilters && (
                                    <span className="ml-1 w-5 h-5 rounded-full bg-[#baa360] text-white
                                                   text-[10px] font-black flex items-center justify-center">
                                        !
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* ── SIDEBAR ── */}
                        {/* Desktop: sticky aside | Mobile: overlay drawer */}
                        <>
                            {/* Mobile overlay backdrop */}
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.div
                                        key="overlay"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
                                        onClick={() => setSidebarOpen(false)}
                                        aria-hidden="true"
                                    />
                                )}
                            </AnimatePresence>

                            <aside
                                id="filter-sidebar"
                                aria-label="Property filters"
                                className={`
                                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                                    fixed lg:static top-0 left-0 h-full lg:h-auto z-50 lg:z-auto
                                    w-[300px] lg:w-[260px] xl:w-[280px] flex-shrink-0
                                    transition-transform duration-300 ease-out lg:transition-none
                                `}
                            >
                                <div
                                    className="bg-white h-full lg:h-auto rounded-none lg:rounded-[22px]
                                               border-r lg:border border-zinc-100
                                               shadow-xl lg:shadow-[0_2px_24px_rgba(0,0,0,0.05)]
                                               overflow-y-auto lg:overflow-visible
                                               lg:sticky lg:top-28 p-6"
                                >
                                    {/* Sidebar header */}
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-2">
                                            <SlidersHorizontal
                                                className="w-4 h-4 text-[#baa360]"
                                                aria-hidden="true"
                                            />
                                            <span className="text-[15px] font-extrabold text-zinc-900">
                                                Filters
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {hasActiveFilters && (
                                                <button
                                                    onClick={resetFilters}
                                                    className="text-[12px] font-bold text-[#baa360]
                                                               hover:underline"
                                                >
                                                    Reset all
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setSidebarOpen(false)}
                                                className="lg:hidden w-7 h-7 rounded-full bg-zinc-100
                                                           flex items-center justify-center
                                                           text-zinc-500 hover:bg-zinc-200 transition-colors"
                                                aria-label="Close filters panel"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Budget filter */}
                                    <FilterGroup title="Budget">
                                        <div className="flex flex-wrap gap-2">
                                            {(
                                                [
                                                    ["all", "Any"],
                                                    ["under60L", "< ₹60L"],
                                                    ["60L-1Cr", "₹60L–1Cr"],
                                                    ["1Cr-2Cr", "₹1–2Cr"],
                                                    ["2Cr-5Cr", "₹2–5Cr"],
                                                    ["above5Cr", "> ₹5Cr"],
                                                ] as [BudgetFilter, string][]
                                            ).map(([val, lbl]) => (
                                                <FilterPill
                                                    key={val}
                                                    label={lbl}
                                                    active={budget === val}
                                                    onClick={() => setBudget(val)}
                                                />
                                            ))}
                                        </div>
                                    </FilterGroup>

                                    {/* Configuration filter */}
                                    <FilterGroup title="Configuration">
                                        <div className="flex flex-wrap gap-2">
                                            {(
                                                [
                                                    ["all", "Any"],
                                                    ["1bhk", "1 BHK"],
                                                    ["2bhk", "2 BHK"],
                                                    ["3bhk", "3 BHK"],
                                                    ["4bhk+", "4 BHK+"],
                                                    ["studio", "Studio"],
                                                    ["commercial", "Commercial"],
                                                    ["plot", "Plot"],
                                                ] as [ConfigFilter, string][]
                                            ).map(([val, lbl]) => (
                                                <FilterPill
                                                    key={val}
                                                    label={lbl}
                                                    active={config === val}
                                                    onClick={() => setConfig(val)}
                                                />
                                            ))}
                                        </div>
                                    </FilterGroup>

                                    {/* Construction Status filter */}
                                    <FilterGroup title="Construction Status">
                                        <div className="flex flex-col gap-2">
                                            {(
                                                [
                                                    ["all", "Any Status"],
                                                    ["ready-to-move", "Ready to Move"],
                                                    ["under-construction", "Under Construction"],
                                                    ["new-launch", "New Launch"],
                                                ] as [StatusFilter, string][]
                                            ).map(([val, lbl]) => (
                                                <button
                                                    key={val}
                                                    onClick={() => setStatus(val)}
                                                    className={`text-left px-4 py-2.5 rounded-xl text-[13px]
                                                               font-bold border transition-all duration-200
                                                               ${status === val
                                                            ? "bg-[#baa360] text-white border-[#baa360]"
                                                            : "bg-white text-zinc-600 border-zinc-200 hover:border-[#baa360]/50"
                                                        }`}
                                                >
                                                    {lbl}
                                                </button>
                                            ))}
                                        </div>
                                    </FilterGroup>

                                    {/* RERA Toggle */}
                                    <FilterGroup title="Quality">
                                        <label
                                            htmlFor="rera-toggle"
                                            className="flex items-center justify-between
                                                       cursor-pointer group/toggle"
                                        >
                                            <div className="flex items-center gap-2">
                                                <BadgeCheck
                                                    className="w-4 h-4 text-emerald-500"
                                                    aria-hidden="true"
                                                />
                                                <span className="text-[13px] font-bold text-zinc-700
                                                               group-hover/toggle:text-zinc-900 transition-colors">
                                                    RERA Verified only
                                                </span>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    id="rera-toggle"
                                                    checked={reraOnly}
                                                    onChange={(e) => setReraOnly(e.target.checked)}
                                                    className="sr-only"
                                                    aria-label="Show only RERA verified properties"
                                                />
                                                <div
                                                    className={`w-11 h-6 rounded-full transition-colors duration-300 flex items-center
                                                               ${reraOnly ? "bg-emerald-500" : "bg-zinc-200"}`}
                                                >
                                                    <div
                                                        className={`w-5 h-5 rounded-full bg-white shadow-md
                                                                   transition-transform duration-300
                                                                   ${reraOnly ? "translate-x-5.5" : "translate-x-0.5"}`}
                                                    />
                                                </div>
                                            </div>
                                        </label>
                                    </FilterGroup>
                                </div>
                            </aside>
                        </>

                        {/* ── PROPERTY GRID ── */}
                        <div className="flex-1 min-w-0">
                            <AnimatePresence mode="wait">
                                {filtered.length === 0 ? (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center py-24 gap-4"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center">
                                            <Target className="w-8 h-8 text-zinc-400" />
                                        </div>
                                        <p className="text-[17px] font-bold text-zinc-600">
                                            No properties match your filters.
                                        </p>
                                        <button
                                            onClick={resetFilters}
                                            className="px-5 py-2.5 bg-[#baa360] text-white text-[14px]
                                                       font-bold rounded-full hover:bg-[#8f7b44] transition-colors"
                                        >
                                            Reset Filters
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="grid"
                                        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                                        role="list"
                                        aria-label={`${modeLabel[mode]} property listings`}
                                    >
                                        {filtered.map((prop, i) => (
                                            <div key={prop.id} role="listitem">
                                                <PropertyCard
                                                    property={prop}
                                                    index={i}
                                                    mode={mode}
                                                />
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </main>

                {/* ══════════════════════════════
                    SEO LOCALITY INSIGHTS
                ══════════════════════════════ */}
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

                {/* ══════════════════════════════
                    HANDPICKED CAROUSEL
                ══════════════════════════════ */}
                <section
                    aria-labelledby="recommendations-heading"
                    className="bg-[#fafaf9] border-t border-zinc-100 py-12 overflow-x-clip"
                >
                    <div className="container mx-auto px-4 sm:px-6">
                        {/* Section header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2
                                    id="recommendations-heading"
                                    className="text-xl sm:text-2xl font-extrabold text-zinc-900"
                                >
                                    ✦ Handpicked Recommendations
                                </h2>
                                <p className="text-zinc-500 text-[13px] font-medium mt-0.5">
                                    Curated by our property experts
                                </p>
                            </div>

                            {/* Carousel controls */}
                            <div
                                className="hidden sm:flex items-center gap-2"
                                role="group"
                                aria-label="Carousel navigation"
                            >
                                <button
                                    onClick={() => scrollCarousel("left")}
                                    className="w-9 h-9 rounded-full bg-white border border-zinc-200
                                               flex items-center justify-center
                                               hover:border-[#baa360]/50 hover:bg-[#baa360]/5
                                               transition-all shadow-sm active:scale-95"
                                    aria-label="Scroll carousel left"
                                >
                                    <ChevronLeft className="w-4 h-4 text-zinc-600" aria-hidden="true" />
                                </button>
                                <button
                                    onClick={() => scrollCarousel("right")}
                                    className="w-9 h-9 rounded-full bg-white border border-zinc-200
                                               flex items-center justify-center
                                               hover:border-[#baa360]/50 hover:bg-[#baa360]/5
                                               transition-all shadow-sm active:scale-95"
                                    aria-label="Scroll carousel right"
                                >
                                    <ChevronRight className="w-4 h-4 text-zinc-600" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        {/* Carousel track */}
                        <div
                            ref={carouselRef}
                            className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory
                                       pb-6 scroll-smooth"
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

                            {/* "See all" card */}
                            <div
                                className="min-w-[200px] flex-shrink-0 snap-center flex items-center justify-center"
                                role="listitem"
                                aria-label="View all properties"
                            >
                                <Link
                                    href={`/${mode}`}
                                    className="flex flex-col items-center gap-3 p-8 bg-white
                                               rounded-[22px] border border-zinc-100 shadow-sm
                                               hover:border-[#baa360]/40 hover:shadow-md
                                               transition-all duration-300 group/see-all"
                                >
                                    <div
                                        className="w-12 h-12 rounded-full bg-[#baa360]/10
                                                   flex items-center justify-center
                                                   group-hover/see-all:bg-[#baa360]/20
                                                   transition-colors"
                                    >
                                        <ArrowRight
                                            className="w-5 h-5 text-[#baa360]
                                                      group-hover/see-all:translate-x-0.5
                                                      transition-transform"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <span className="text-[14px] font-bold text-zinc-700 text-center">
                                        View All
                                        <br />
                                        Properties
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Progress indicator */}
                        <div
                            className="mt-2 h-[2px] bg-zinc-200/60 rounded-full overflow-hidden max-w-[160px]"
                            role="progressbar"
                            aria-valuenow={carouselProgress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        >
                            <motion.div
                                className="h-full bg-[#baa360] rounded-full"
                                style={{ width: `${carouselProgress}%` }}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
