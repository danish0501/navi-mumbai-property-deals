"use client";
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileSearchBar = ({ setIsSearchOpen }: { setIsSearchOpen: (val: boolean) => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-zinc-100 overflow-hidden"
        >
            <div className="px-6 py-4">
                <div className="relative w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-button group-focus-within:text-brand-button transition-colors" size={20} strokeWidth={2} />
                    <input
                        type="text"
                        placeholder="Search products, brands and more..."
                        className="w-full bg-zinc-100/80 border-2 border-transparent focus:border-brand-button focus:bg-white rounded-full py-2.5 pl-12 pr-12 text-brand-heading placeholder:text-brand-paragraph/60 outline-none transition-all shadow-inner"
                        autoFocus
                    />
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-zinc-200 text-brand-button hover:text-brand-heading rounded-full transition-all active:scale-90 cursor-pointer"
                        title="Close Search"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MobileSearchBar;
