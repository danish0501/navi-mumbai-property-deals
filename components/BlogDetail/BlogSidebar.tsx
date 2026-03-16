"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface SidebarTOCProps {
    content: string;
}

const SidebarTOC = ({ content }: SidebarTOCProps) => {
    const [items, setItems] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Extract headers using regex
        const headerRegex = /<h([23])>(.*?)<\/h\1>/g;
        const matches = Array.from(content.matchAll(headerRegex));

        const tocItems = matches.map((match) => {
            const level = parseInt(match[1]);
            const text = match[2].replace(/<\/?[^>]+(>|$)/g, ""); // Strip any nested HTML
            const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
            return { id, text, level };
        });

        setItems(tocItems);

        // Intersection Observer to highlight active item
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        tocItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [content]);

    if (items.length === 0) return null;

    return (
        <aside className="hidden lg:block w-64 shrink-0 h-fit sticky top-32">
            <div className="space-y-6">
                <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-primary mb-6">
                        Table of Contents
                    </h3>
                    <nav className="flex flex-col gap-1">
                        {items.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(item.id)?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                    });
                                }}
                                className={`
                  group flex items-start gap-3 py-2 text-sm transition-all duration-300
                  ${item.level === 3 ? "ml-4" : ""}
                  ${activeId === item.id
                                        ? "text-brand-heading font-black"
                                        : "text-brand-paragraph/60 font-medium hover:text-brand-primary"
                                    }
                `}
                            >
                                <span
                                    className={`
                    mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300
                    ${activeId === item.id ? "bg-brand-primary scale-125 shadow-[0_0_8px_rgba(var(--brand-primary-rgb),0.6)]" : "bg-neutral-200 group-hover:bg-brand-primary/40"}
                  `}
                                />
                                <span className="leading-tight">{item.text}</span>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </aside>
    );
};

export default SidebarTOC;
