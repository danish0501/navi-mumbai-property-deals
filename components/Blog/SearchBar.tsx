"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
    onFocusChange?: (isFocused: boolean) => void;
}

const SearchBar = ({ onFocusChange }: SearchBarProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [isFocused, setIsFocused] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        onFocusChange?.(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
            onFocusChange?.(false);
        }, 200);
    };

    // Sync query when URL changes (e.g., forward/back button)
    useEffect(() => {
        const urlQuery = searchParams.get("q") || "";
        if (urlQuery !== query) {
            setQuery(urlQuery);
        }
    }, [searchParams]);

    // Real-time search effect
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            const currentQ = searchParams.get("q") || "";

            if (query.trim()) {
                if (query.trim() !== currentQ) {
                    params.set("q", query.trim());
                    router.push(`?${params.toString()}`, { scroll: false });
                }
            } else if (currentQ) {
                params.delete("q");
                router.push(`?${params.toString()}`, { scroll: false });
            }
        }, 150); // Small debounce for smooth typing

        return () => clearTimeout(delayDebounceFn);
    }, [query, router, searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Logical search already handled by useEffect, but we can trigger a visual feedback
        setIsSearching(true);
        setTimeout(() => setIsSearching(false), 500);
    };

    const handleClear = () => {
        setQuery("");
        const params = new URLSearchParams(searchParams.toString());
        params.delete("q");
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-4xl"
        >
            <form onSubmit={handleSearch} className="relative group">
                {/* Advanced Multi-layer Glow Effect */}
                <div
                    className={`absolute -inset-1 bg-gradient-to-r from-brand-primary via-amber-400 to-brand-primary rounded-[2rem] transition-all duration-700 opacity-0 ${isFocused ? 'opacity-0 scale-105' : 'group-hover:opacity-0'
                        }`}
                    aria-hidden="true"
                />
                <div
                    className={`absolute inset-0 bg-brand-primary/20 rounded-[2rem] blur-2xl transition-all duration-700 opacity-0 ${isFocused ? 'opacity-30' : ''
                        }`}
                    aria-hidden="true"
                />

                {/* Main Search Container */}
                <div className={`relative flex items-center bg-brand-dark/80 backdrop-blur-xl border rounded-full transition-all duration-500 overflow-hidden ${isFocused
                    ? 'border-brand-primary ring-2 ring-brand-primary/20'
                    : 'border-white/10 group-hover:border-white/20'
                    } max-[426px]:mx-1`}>

                    {/* Search Icon with Animation */}
                    <div className="pl-6 max-[426px]:pl-5 flex items-center justify-center">
                        <motion.div
                            animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
                            transition={isSearching ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                            className={`${isFocused ? 'text-brand-primary' : 'text-zinc-500'} transition-colors duration-300`}
                        >
                            {isSearching ? (
                                <Loader2 className="w-6 max-[426px]:w-5 h-6 max-[426px]:h-5" />
                            ) : (
                                <Search className="w-6 max-[426px]:w-5 h-6 max-[426px]:h-5" />
                            )}
                        </motion.div>
                    </div>

                    {/* Input Field */}
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Search Blogs..."
                        className="w-full bg-transparent border-none outline-none px-5 max-[426px]:px-3 py-5 max-[426px]:py-4 text-white text-lg max-[426px]:text-base placeholder:font-light max-[426px]:placeholder:text-zinc-500 font-medium selection:bg-brand-primary selection:text-zinc-950"
                    />

                    {/* Interactive Elements on Right */}
                    <div className="flex items-center pr-3 max-[426px]:pr-2 gap-3 max-[426px]:gap-2">
                        <AnimatePresence>
                            {query && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    type="button"
                                    onClick={handleClear}
                                    className="p-2 text-zinc-500 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer max-[426px]:p-1"
                                    title="Clear search"
                                >
                                    <X className="w-5 h-5 max-[426px]:w-4 max-[426px]:h-4" />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* Search Button */}
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(186, 163, 96, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="relative overflow-hidden bg-brand-primary hover:bg-brand-primary-hover text-brand-white px-8 max-[426px]:px-5 py-4 max-[426px]:py-3 rounded-full font-black max-[426px]:font-extrabold text-sm max-[426px]:text-xs uppercase tracking-widest max-[426px]:tracking-wider transition-all duration-300 cursor-pointer group/btn"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Search
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"
                                aria-hidden="true"
                            />
                        </motion.button>
                    </div>
                </div>
            </form>

            {/* Trending / Quick Tags */}
            <AnimatePresence>
                {!searchParams.get("q") && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 48 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex flex-wrap items-center gap-6 max-[426px]:gap-3 px-4 max-[426px]:px-2 overflow-hidden max-[426px]:mt-10"
                    >
                        <span className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] max-[426px]:tracking-widest">Popular:</span>
                        <div className="flex flex-wrap gap-4 max-[426px]:gap-2">
                            {['Market ROI 2026', 'Atal Setu Impact', 'Ulwe Properties', 'NMIA Timeline'].map((tag, idx) => (
                                <motion.button
                                    key={tag}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    className="group relative flex items-center text-[12px] max-[426px]:text-[13px] text-zinc-400 font-bold max-[426px]:font-semibold transition-all whitespace-nowrap"
                                    onClick={() => setQuery(tag)}
                                >
                                    <span className="text-brand-primary/60 mr-1 group-hover:text-brand-primary transition-colors">#</span>
                                    <span className="group-hover:text-white transition-colors">{tag}</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary transition-all duration-300 group-hover:w-full" />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SearchBar;
