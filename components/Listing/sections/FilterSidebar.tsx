"use client";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, BadgeCheck } from "lucide-react";
import FilterGroup from "./FilterGroup";
import FilterPill from "./FilterPill";
import { BudgetFilter, ConfigFilter, StatusFilter } from "./types";

interface FilterSidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    budget: BudgetFilter;
    setBudget: (budget: BudgetFilter) => void;
    config: ConfigFilter;
    setConfig: (config: ConfigFilter) => void;
    status: StatusFilter;
    setStatus: (status: StatusFilter) => void;
    reraOnly: boolean;
    setReraOnly: (reraOnly: boolean) => void;
    hasActiveFilters: boolean;
    resetFilters: () => void;
}

export default function FilterSidebar({
    sidebarOpen,
    setSidebarOpen,
    budget,
    setBudget,
    config,
    setConfig,
    status,
    setStatus,
    reraOnly,
    setReraOnly,
    hasActiveFilters,
    resetFilters,
}: FilterSidebarProps) {
    return (
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
    );
}
