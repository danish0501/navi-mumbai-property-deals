import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TOCItem {
    id: string;
    text: string;
    level: number;
    parentId?: string;
}

interface BlogSidebarProps {
    content: string;
}

const BlogSidebar = ({ content }: BlogSidebarProps) => {
    const [items, setItems] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const observerRef = useRef<IntersectionObserver | null>(null);
    const entriesRef = useRef<Map<string, IntersectionObserverEntry>>(new Map());

    useEffect(() => {
        const headerRegex = /<h([23456])\b[^>]*>(.*?)<\/h\1>/gi;
        const matches = Array.from(content.matchAll(headerRegex));
        const lastParents: Record<number, string> = {};

        const tocItems = matches.map((match) => {
            const level = parseInt(match[1]);
            const text = match[2].replace(/<\/?[^>]+(>|$)/g, "");
            const id = text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
            lastParents[level] = id;
            const parentId = lastParents[level - 1];
            return { id, text, level, parentId };
        });

        setItems(tocItems);

        const setupObserver = () => {
            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver(
                (entries) => {
                    // Update our tracked entries
                    entries.forEach((entry) => {
                        entriesRef.current.set(entry.target.id, entry);
                    });

                    const threshold = 81;

                    const active = [...tocItems].reverse().find(item => {
                        const entry = entriesRef.current.get(item.id);
                        if (entry) {
                            // Check if the top of the header is at or above the navbar bottom
                            return entry.boundingClientRect.top <= threshold;
                        }
                        return false;
                    });

                    if (active) {
                        setActiveId(active.id);
                    }
                },
                {
                    // Precise margins to track headers as they enter the 'active' area (below navbar)
                    rootMargin: "-80px 0px -70% 0px",
                    threshold: [0, 1]
                }
            );

            tocItems.forEach((item) => {
                const element = document.getElementById(item.id);
                if (element) {
                    observerRef.current?.observe(element);
                }
            });
        };

        const timeoutId = setTimeout(setupObserver, 500);

        return () => {
            clearTimeout(timeoutId);
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [content]);

    // Determine which items should be visible
    const getVisibleItems = () => {
        const activeItem = items.find(i => i.id === activeId);

        // Build an array of ancestor IDs for the currently active item
        const activeAncestors: string[] = [];
        let curr = activeItem;
        while (curr?.parentId) {
            activeAncestors.push(curr.parentId);
            curr = items.find(i => i.id === curr?.parentId);
        }

        return items.filter(item => {
            // 1. H2 is always visible
            if (item.level === 2) return true;
            if (activeId === item.parentId) return true;
            if (activeItem?.parentId === item.parentId) return true;
            if (activeAncestors.includes(item.parentId || "")) return true;

            // 3. The item itself is active
            if (activeId === item.id) return true;

            return false;
        });
    };

    const visibleItems = getVisibleItems();

    return (
        <div className="w-full h-fit lg:sticky lg:top-32">
            <aside className="w-60">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-[14px] font-black uppercase tracking-[0.2em] !text-brand-primary-hover mb-4">
                            Table of Contents
                        </h3>
                        <nav className="flex flex-col border-l border-neutral-100">
                            <AnimatePresence mode="popLayout" initial={false}>
                                {items.map((item) => {
                                    const isVisible = visibleItems.some(v => v.id === item.id);

                                    if (!isVisible) return null;

                                    return (
                                        <motion.a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            layout
                                            initial={{ opacity: 0, height: 0, x: -10 }}
                                            animate={{ opacity: 1, height: "auto", x: 0 }}
                                            exit={{ opacity: 0, height: 0, x: -10 }}
                                            transition={{
                                                duration: 0.3,
                                                ease: [0.23, 1, 0.32, 1]
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const element = document.getElementById(item.id);
                                                if (element) {
                                                    const offset = 160; // Matches scroll-mt
                                                    const elementPosition = element.getBoundingClientRect().top;
                                                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                                                    window.scrollTo({
                                                        top: offsetPosition,
                                                        behavior: "smooth"
                                                    });
                                                }
                                            }}
                                            className={`
                                                group flex items-start gap-3 py-2.5 -ml-px border-l-2 transition-all duration-300 overflow-hidden
                                                ${item.level === 2 ? "pl-4" : ""}
                                                ${item.level === 3 ? "pl-8 text-[13px]" : ""}
                                                ${item.level === 4 ? "pl-12 text-[12px]" : ""}
                                                ${item.level === 5 ? "pl-14 text-[11px]" : ""}
                                                ${item.level === 6 ? "pl-16 text-[10px]" : ""}
                                                ${activeId === item.id
                                                    ? "border-brand-primary text-brand-heading font-black bg-brand-primary/5 rounded-r-lg"
                                                    : "border-transparent text-brand-paragraph hover:text-brand-heading hover:bg-neutral-50 rounded-r-lg"}
                                            `}
                                        >
                                            <span className="leading-tight">{item.text}</span>
                                        </motion.a>
                                    );
                                })}
                            </AnimatePresence>
                        </nav>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default BlogSidebar;
