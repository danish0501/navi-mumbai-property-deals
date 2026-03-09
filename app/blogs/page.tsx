"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/components/Home/Blogdata";

export default function BlogsPage() {
    return (
        <main className="min-h-screen bg-brand-white pt-24 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-brand-paragraph hover:text-brand-primary transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold">Back to Home</span>
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black text-brand-heading mb-6">
                        Latest <span className="text-brand-primary">Insights</span>
                    </h1>
                    <p className="text-brand-paragraph text-xl max-w-3xl font-medium">
                        Your comprehensive guide to Navi Mumbai's rapidly growing real estate landscape.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-white rounded-3xl overflow-hidden border border-neutral-100 hover:border-brand-primary/20 transition-all duration-500 hover:shadow-2xl"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-brand-primary text-[10px] font-black uppercase tracking-widest shadow-sm">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-4 text-xs font-bold text-brand-paragraph/60">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {post.readTime}
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-brand-heading mb-4 group-hover:text-brand-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h2>
                                <p className="text-brand-paragraph text-sm mb-8 line-clamp-3 text-gray-500 font-medium leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-6 border-t border-neutral-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-black text-xs">
                                            {post.author[0]}
                                        </div>
                                        <span className="text-xs font-black text-brand-heading">{post.author}</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center text-brand-heading hover:bg-brand-primary hover:text-white transition-all transition-colors duration-300">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </main>
    );
}
