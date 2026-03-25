"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Train, Plus, Trash2, MapPin, School, Hospital, ShoppingBag } from "lucide-react";
import CustomDropdown from "./CustomDropdown";

interface NearbyPlacesProps {
    formData: any;
    updateFormData: (field: string, value: any) => void;
}

const CATEGORIES = [
    { label: "Education", icon: <School className="w-4 h-4" /> },
    { label: "Healthcare", icon: <Hospital className="w-4 h-4" /> },
    { label: "Transit", icon: <Train className="w-4 h-4" /> },
    { label: "Shopping", icon: <ShoppingBag className="w-4 h-4" /> },
];

const NearbyPlaces: React.FC<NearbyPlacesProps> = ({ formData, updateFormData }) => {
    const [newPlace, setNewPlace] = React.useState({ name: "", distance: "", category: "Education" });

    const addPlace = () => {
        if (!newPlace.name.trim()) return;
        const places = formData.nearbyPlaces || [];
        updateFormData("nearbyPlaces", [...places, newPlace]);
        setNewPlace({ name: "", distance: "", category: "Education" });
    };

    const removePlace = (index: number) => {
        const places = (formData.nearbyPlaces || []).filter((_: any, i: number) => i !== index);
        updateFormData("nearbyPlaces", places);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addPlace();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl border border-zinc-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all duration-500"
        >
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <MapPin className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-brand-heading">Nearby Landmarks</h2>
                    <p className="text-sm text-brand-paragraph font-medium">Add accessibility information (Schools, Transit, etc.)</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Add New Place Form */}
                <div className="p-6 bg-zinc-50/50 border border-zinc-100 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-4 items-end relative">
                    <div className="md:col-span-5 space-y-2 group">
                        <label className="text-[12px] font-black text-brand-paragraph uppercase tracking-widest px-1">Place Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Ryan International School"
                            value={newPlace.name}
                            onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-white border border-brand-muted/50 rounded-2xl px-5 py-3.5 text-[14px] font-semibold focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 transition-all placeholder:text-[14px] placeholder:text-brand-muted"
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2 group">
                        <label className="text-[12px] font-black text-brand-paragraph uppercase tracking-widest px-1">Distance</label>
                        <input
                            type="text"
                            placeholder="0.8 km"
                            value={newPlace.distance}
                            onChange={(e) => setNewPlace({ ...newPlace, distance: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-white border border-brand-muted/50 rounded-2xl px-5 py-3.5 text-[14px] font-semibold focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 transition-all text-center placeholder:text-[14px] placeholder:text-brand-muted"
                        />
                    </div>

                    <div className="md:col-span-4">
                        <CustomDropdown
                            label="Category"
                            options={CATEGORIES.map(c => ({ value: c.label, label: c.label }))}
                            value={newPlace.category}
                            onChange={(val) => setNewPlace({ ...newPlace, category: val })}
                            icon={CATEGORIES.find(c => c.label === newPlace.category)?.icon || <MapPin className="w-4 h-4" />}
                        />
                    </div>

                    <div className="md:col-span-1">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={addPlace}
                            className="w-full h-[54px] bg-brand-primary text-white rounded-2xl flex items-center justify-center hover:bg-brand-primary/90 transition-all cursor-pointer"
                        >
                            <Plus className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>

                {/* Added Places List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {(formData.nearbyPlaces || []).map((place: any, index: number) => {
                            const categoryIcon = CATEGORIES.find(c => c.label === place.category)?.icon || <MapPin className="w-4 h-4" />;
                            return (
                                <motion.div
                                    key={`${place.name}-${index}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="p-4 bg-white border border-zinc-100 rounded-2xl flex items-center justify-between group hover:border-brand-primary/30 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-brand-paragraph group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">
                                            {categoryIcon}
                                        </div>
                                        <div>
                                            <h4 className="text-[15px] font-black text-brand-heading">{place.name}</h4>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary px-2 py-0.5 bg-brand-primary/5 rounded-md">{place.category}</span>
                                                <span className="text-[12px] font-bold text-brand-paragraph">· {place.distance || "Distance N/A"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.1, backgroundColor: "#fee2e2" }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => removePlace(index)}
                                        className="p-2.5 text-red-500 rounded-xl transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </motion.button>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {(formData.nearbyPlaces || []).length === 0 && (
                        <div className="py-12 text-center border-2 border-dashed border-zinc-100 rounded-[32px] bg-zinc-50/20">
                            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-300">
                                 <MapPin className="w-8 h-8" />
                            </div>
                            <h3 className="text-zinc-600 font-bold mb-1">No landmarks added yet</h3>
                            <p className="text-zinc-400 text-sm">Add nearby schools, hospitals, or transit points</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default NearbyPlaces;
