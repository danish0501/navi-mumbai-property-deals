"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MegaMenu from './BuyMegaMenu';
import RentMegaMenu from './RentMegaMenu';
import SellMegaMenu from './SellMegaMenu';

interface PredefinedLink {
    name: string;
    href: string;
}

const NavLinks = ({ navLinks }: { navLinks: PredefinedLink[] }) => {
    const pathname = usePathname();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    return (
        <motion.div
            key="nav-links"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1"
        >
            {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isBuyLink = link.name.toLowerCase() === 'buy';
                const isRentLink = link.name.toLowerCase() === 'rent';
                const isSellLink = link.name.toLowerCase() === 'sell';

                return (
                    <div
                        key={link.name}
                        className="relative group"
                        onMouseEnter={() => setHoveredLink(link.name)}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        <Link
                            href={link.href}
                            className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 block ${isActive ? 'text-brand-primary-hover' : 'text-brand-paragraph hover:text-brand-primary-hover'
                                }`}
                        >
                            <span className="flex items-center gap-1">
                                {link.name}
                                {(isBuyLink || isRentLink || isSellLink) && (
                                    <ChevronDown
                                        size={16}
                                        className="transition-transform duration-300 group-hover:rotate-180"
                                    />
                                )}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-underline"
                                    className="absolute bottom-1 left-4 right-4 h-0.5 bg-brand-button"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>

                        {/* Mega Menus */}
                        <AnimatePresence>
                            {isBuyLink && hoveredLink === link.name && (
                                <MegaMenu />
                            )}
                            {isRentLink && hoveredLink === link.name && (
                                <RentMegaMenu />
                            )}
                            {isSellLink && hoveredLink === link.name && (
                                <SellMegaMenu />
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </motion.div>
    );
};

export default NavLinks;
