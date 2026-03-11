"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "./Blogdata";

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.21, 1.11, 0.81, 0.99] as const
        }
    }
};

const BlogCard = ({ post, index }: BlogCardProps) => {
    return (
        <motion.article
            variants={cardVariants}
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-neutral-100/80 hover:border-brand-primary/30 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(186,163,96,0.15)]"
        >
            {/* Image Section */}
            <div className="relative aspect-[16/12] overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-heading/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Glass Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div className="px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-xl shadow-black/5">
                        <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em]">
                            {post.category}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 md:p-6 relative">
                <Link href={`/blogs/${post.id}`} className="block group/title">
                    <h2 className="text-2xl font-black text-brand-heading mb-4 leading-[1.3] group-hover/title:text-brand-primary transition-colors duration-500 line-clamp-2">
                        {post.title}
                    </h2>
                </Link>

                <p className="text-brand-paragraph/70 text-[15px] mb-6 line-clamp-4 font-medium leading-relaxed">
                    {post.excerpt}
                </p>

                {/* Bottom Section */}
                <div className="pt-6 border-t border-neutral-50/80 space-y-6">
                    {/* Meta info */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center group/meta">
                            <div className="w-8 h-8 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover/meta:bg-brand-primary group-hover/meta:text-white transition-colors duration-500 mr-3">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <span className="text-[12px] font-bold text-brand-paragraph uppercase tracking-wider">{post.date}</span>
                        </div>
                        <div className="flex items-center group/meta">
                            <div className="w-8 h-8 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover/meta:bg-brand-primary group-hover/meta:text-white transition-colors duration-500 mr-3">
                                <Clock className="w-4 h-4" />
                            </div>
                            <span className="text-[12px] font-bold text-brand-paragraph uppercase tracking-wider">{post.readTime}</span>
                        </div>
                    </div>

                    {/* Full Width Button */}
                    <Link
                        href={`/blogs/${post.id}`}
                        className="group/btn relative w-full flex items-center justify-center gap-3 bg-brand-primary hover:bg-brand-primary-hover text-brand-white py-4 px-6 rounded-2xl font-black transition-all duration-500 overflow-hidden"
                    >
                        <span className="relative z-10 text-sm uppercase tracking-widest">Read Article</span>
                        <ArrowRight className="relative z-10 w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-x-0.5 transition-transform" />
                        <div className="absolute inset-0 bg-brand-primary/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
};


export default BlogCard;
