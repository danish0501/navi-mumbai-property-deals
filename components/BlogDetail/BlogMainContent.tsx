"use client";

import React from "react";
import { Tag } from "lucide-react";

interface BlogMainContentProps {
    content: string;
    tags: string[];
}

const BlogMainContent = ({ content, tags }: BlogMainContentProps) => {
    // Inject IDs into headers for TOC functionality
    const contentWithIds = content.replace(
        /<h([23])>(.*?)<\/h\1>/g,
        (match, level, text) => {
            const id = text.replace(/<\/?[^>]+(>|$)/g, "").toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
            return `<h${level} id="${id}">${text}</h${level}>`;
        }
    );

    return (
        <div className="flex-1 max-w-3xl">
            <div
                className="prose prose-lg max-w-none 
          prose-headings:text-brand-heading prose-headings:font-black prose-headings:tracking-tight 
          prose-p:text-brand-paragraph/90 prose-p:leading-[1.8] prose-p:mb-8
          prose-strong:text-brand-heading prose-strong:font-black
          prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:bg-brand-primary/5 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-3xl prose-blockquote:not-italic prose-blockquote:my-12
          prose-li:text-brand-paragraph/90 prose-li:mb-2
          prose-img:rounded-3xl prose-img:shadow-2xl
          marker:text-brand-primary"
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />

            {/* Tags Section */}
            <div className="mt-16 pt-8 border-t border-neutral-100">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-50 text-brand-paragraph text-[12px] font-bold hover:bg-brand-primary/10 hover:text-brand-primary transition-all cursor-default border border-transparent hover:border-brand-primary/20"
                        >
                            <Tag size={12} className="text-brand-primary" />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogMainContent;
