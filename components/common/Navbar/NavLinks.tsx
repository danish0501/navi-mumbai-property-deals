"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import BuyMegaMenu from './BuyMegaMenu';
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
        <nav
            className="flex items-center gap-1"
            role="tablist"
            aria-label="High-competition Real Estate Navigation"
        >
            {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const normalizedName = link.name.toLowerCase().trim();
                const isBuyLink = normalizedName === 'buy' || normalizedName.includes('buy');
                const isRentLink = normalizedName === 'rent' || normalizedName.includes('rent');
                const isSellLink = normalizedName === 'sell' || normalizedName.includes('sell');
                const hasMegaMenu = isBuyLink || isRentLink || isSellLink;
                const isCurrentlyHovered = hoveredLink === link.name;
                const menuId = `mega-menu-${normalizedName.replace(/\s+/g, '-')}`;

                return (
                    <div
                        key={link.name}
                        className={`relative group h-full py-4 ${hasMegaMenu ? 'cursor-pointer' : ''}`}
                        onMouseEnter={() => setHoveredLink(link.name)}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        {hasMegaMenu ? (
                            <button
                                aria-expanded={isCurrentlyHovered}
                                aria-haspopup="true"
                                aria-controls={menuId}
                                role="tab"
                                aria-selected={isActive}
                                className={`relative px-4 py-2 text-base font-bold transition-colors duration-200 flex items-center gap-1 outline-none focus-visible:text-brand-primary-hover cursor-pointer ${isActive ? 'text-brand-primary-hover' : 'text-zinc-600 hover:text-brand-primary-hover'
                                    }`}
                            >
                                {link.name}
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300 ${isCurrentlyHovered ? 'rotate-180' : ''}`}
                                />
                                {isActive && (
                                    <motion.div
                                        layoutId="active-underline"
                                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-brand-button"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ) : (
                            <Link
                                href={link.href}
                                role="tab"
                                aria-selected={isActive}
                                aria-current={isActive ? "page" : undefined}
                                className={`relative px-4 py-2 text-base font-bold transition-colors duration-200 block outline-none focus-visible:text-brand-primary-hover ${isActive ? 'text-brand-primary-hover' : 'text-zinc-600 hover:text-brand-primary-hover'
                                    }`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-underline"
                                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-brand-button"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        )}

                        {/* Mega Menus */}
                        {hasMegaMenu && (
                            <div
                                id={menuId}
                                className={`absolute top-full left-1/2 -translate-x-1/2 -pt-10 transition-all duration-300 ${isCurrentlyHovered
                                    ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                                    : 'opacity-0 translate-y-1 invisible pointer-events-none'
                                    }`}
                            >
                                {isBuyLink && <BuyMegaMenu />}
                                {isRentLink && <RentMegaMenu />}
                                {isSellLink && <SellMegaMenu />}
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default NavLinks;
