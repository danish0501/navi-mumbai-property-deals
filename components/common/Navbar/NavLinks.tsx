"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface PredefinedLink {
    name: string;
    href: string;
}

const DesktopNavLinks = ({ navLinks }: { navLinks: PredefinedLink[] }) => {
    const pathname = usePathname();
    return (
        <motion.div
            key="nav-links"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
        >
            {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 ${isActive ? 'text-brand-primary-hover' : 'text-brand-paragraph hover:text-brand-primary-hover'
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
                );
            })}
        </motion.div>
    );
};

export default DesktopNavLinks;
