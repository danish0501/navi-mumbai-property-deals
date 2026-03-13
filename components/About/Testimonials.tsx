"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, MapPin, UserCheck } from "lucide-react";
import Image from "next/image";
import Script from "next/script";

const testimonials = [
    {
        id: 1,
        name: "Rajesh Kumar",
        role: "Home Buyer",
        content: "Found my dream home in Kharghar thanks to their expert guidance. The transparency in pricing was a breath of fresh air in an industry often filled with hidden costs. Their team made the entire process seamless.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&h=250&auto=format&fit=crop",
        location: "Kharghar, Navi Mumbai"
    },
    {
        id: 2,
        name: "Sneha Patil",
        role: "Property Investor",
        content: "The best real estate consultants in Navi Mumbai. They helped me navigate the complex legalities of a resale property in Nerul with absolute ease and professionalism. Highly recommended for serious investors.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&h=250&auto=format&fit=crop",
        location: "Nerul, Navi Mumbai"
    },
    {
        id: 3,
        name: "Amit Shah",
        role: "Real Estate Investor",
        content: "Their micro-market analysis for Ulwe was spot on. My investment has already seen significant appreciation. Their data-backed approach and integrity are what truly sets them apart from the competition.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&h=250&auto=format&fit=crop",
        location: "Ulwe, Navi Mumbai"
    },
    {
        id: 4,
        name: "Dr. Vikram Mehta",
        role: "Healthcare Professional",
        content: "Professional, data-driven, and highly reliable. They don't just sell; they consult. They found exactly what I was looking for in Panvel, keeping my long-term goals in mind throughout the journey.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop",
        location: "Panvel, Navi Mumbai"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextTestimonial = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, []);

    const prevTestimonial = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(nextTestimonial, 5000);
        return () => clearInterval(timer);
    }, [nextTestimonial]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prevTestimonial();
            if (e.key === "ArrowRight") nextTestimonial();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextTestimonial, prevTestimonial]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        })
    };

    const reviewSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": testimonials.map((t, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Review",
                "author": {
                    "@type": "Person",
                    "name": t.name
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": t.rating.toString(),
                    "bestRating": "5"
                },
                "reviewBody": t.content,
                "publisher": {
                    "@type": "Organization",
                    "name": "Navi Mumbai Property Deals"
                }
            }
        }))
    };

    return (
        <section className="py-16 bg-zinc-50 relative overflow-hidden" aria-labelledby="testimonials-heading">
            <Script
                id="testimonial-review-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
            />

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px]" aria-hidden="true" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px]" aria-hidden="true" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <UserCheck size={14} aria-hidden="true" /> Client Testimonials
                    </motion.div>
                    <h2 id="testimonials-heading" className="text-4xl lg:text-6xl font-black text-zinc-950 leading-[1.1] mb-6">
                        Trust Built on <span className="text-brand-primary italic">Proven</span> Results.
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto"
                    >
                        Don't just take our word for it. Hear what our clients have to say about their journey with Navi Mumbai's most trusted real estate partner.
                    </motion.p>
                </div>

                <div className="relative max-w-5xl mx-auto min-h-[500px] max-[376px]:min-h-[600px] max-[426px]:mt-32 flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.4 },
                                scale: { duration: 0.4 }
                            }}
                            className="absolute w-full px-4 lg:px-0"
                        >
                            <article className="bg-white rounded-[3rem] p-8 lg:p-16 max-[376px]:p-4 shadow-2xl shadow-zinc-200 border border-zinc-100 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
                                <div className="relative group flex-shrink-0">
                                    <div className="absolute -inset-4 bg-gradient-to-tr from-brand-primary to-transparent opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity duration-500" aria-hidden="true" />
                                    <div className="relative w-40 h-40 lg:w-56 lg:h-56 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                        <Image
                                            src={testimonials[currentIndex].image}
                                            alt={`Client testimonial from ${testimonials[currentIndex].name} in ${testimonials[currentIndex].location}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/30 z-20">
                                        <Quote size={32} aria-hidden="true" />
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <div className="flex items-center gap-1 mb-6">
                                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                            <Star key={i} size={20} className="fill-brand-primary text-brand-primary" aria-hidden="true" />
                                        ))}
                                    </div>

                                    <blockquote className="text-xl lg:text-3xl max-[376px]:text-lg font-medium text-zinc-800 leading-snug lg:leading-relaxed mb-8 italic">
                                        "{testimonials[currentIndex].content}"
                                    </blockquote>

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                        <div>
                                            <h4 className="text-2xl max-[376px]:text-xl font-black text-zinc-950 uppercase tracking-tight">
                                                {testimonials[currentIndex].name}
                                            </h4>
                                            <p className="text-brand-primary font-bold">{testimonials[currentIndex].role}</p>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-500 text-sm max-[321px]:text-xs font-semibold self-start sm:self-center">
                                            <MapPin size={16} className="text-brand-primary" aria-hidden="true" />
                                            {testimonials[currentIndex].location}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-8 z-30">
                        <button
                            onClick={prevTestimonial}
                            className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-white border border-zinc-100 shadow-xl flex items-center justify-center text-zinc-400 hover:text-brand-primary hover:border-brand-primary transition-all duration-300 group cursor-pointer"
                            aria-label="Previous testimonial"
                            title="View previous client testimonial (Arrow Left)"
                        >
                            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-8 z-30">
                        <button
                            onClick={nextTestimonial}
                            className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-white border border-zinc-100 shadow-xl flex items-center justify-center text-zinc-400 hover:text-brand-primary hover:border-brand-primary transition-all duration-300 group cursor-pointer"
                            aria-label="Next testimonial"
                            title="View next client testimonial (Arrow Right)"
                        >
                            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center gap-3 mt-12">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${currentIndex === index
                                ? "w-12 bg-brand-primary"
                                : "w-3 bg-zinc-200 hover:bg-zinc-300"
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                            title={`Navigate to testimonial from ${testimonials[index].name}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
