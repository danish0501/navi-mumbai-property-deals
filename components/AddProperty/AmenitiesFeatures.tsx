"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Check, Plus, ShieldCheck } from "lucide-react";

interface AmenitiesFeaturesProps {
    formData: any;
    updateFormData: (field: string, value: any) => void;
}

const AMENITIES_LIST = [
    "Gym", "Pool", "Parking", "Security", "Clubhouse", "Park", 
    "Power Backup", "CCTV", "Intercom", "Lifts", "Rain Water Harvesting", 
    "Fire Safety", "Wi-Fi", "Game Room", "Library", "Gas Pipeline"
];

const FEATURES_LIST = [
    "Vastu Compliant", "Marble Flooring", "Balcony", "Private Terrace", 
    "Modular Kitchen", "Large Windows", "High Ceiling", "Air Conditioned",
    "Smart Home Tech", "False Ceiling", "Service Lift", "Corner Property"
];

const AmenitiesFeatures: React.FC<AmenitiesFeaturesProps> = ({ formData, updateFormData }) => {
    
    const toggleItem = (listName: "amenities" | "features", item: string) => {
        const currentList = formData[listName] || [];
        if (currentList.includes(item)) {
            updateFormData(listName, currentList.filter((i: string) => i !== item));
        } else {
            updateFormData(listName, [...currentList, item]);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl border border-zinc-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all duration-500"
        >
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <Sparkles className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-zinc-900">Amenities & Features</h2>
                    <p className="text-sm text-zinc-500 font-medium">Highlight the lifestyle perks of your property</p>
                </div>
            </div>

            <div className="space-y-12">
                {/* Amenities */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <label className="text-[12px] font-black text-zinc-800 uppercase tracking-widest px-1">Social Amenities</label>
                        <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">
                           {(formData.amenities || []).length} Selected
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {AMENITIES_LIST.map((item) => {
                            const isSelected = (formData.amenities || []).includes(item);
                            return (
                                <motion.button
                                    key={item}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => toggleItem("amenities", item)}
                                    className={`px-5 py-3 rounded-2xl text-[12px] font-bold border transition-all flex items-center gap-2
                                        ${isSelected 
                                            ? "bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20" 
                                            : "bg-white border-zinc-100 text-zinc-600 hover:border-brand-primary/30"}`}
                                >
                                    {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4 text-zinc-300" />}
                                    {item}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Features */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <label className="text-[12px] font-black text-zinc-800 uppercase tracking-widest px-1">Property Features</label>
                        <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">
                           {(formData.features || []).length} Selected
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {FEATURES_LIST.map((item) => {
                            const isSelected = (formData.features || []).includes(item);
                            return (
                                <motion.button
                                    key={item}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => toggleItem("features", item)}
                                    className={`px-5 py-3 rounded-2xl text-[12px] font-bold border transition-all flex items-center gap-2
                                        ${isSelected 
                                            ? "bg-zinc-900 text-white border-zinc-900 shadow-lg shadow-zinc-900/20" 
                                            : "bg-white border-zinc-100 text-zinc-600 hover:border-zinc-900/30"}`}
                                >
                                    {isSelected ? <ShieldCheck className="w-4 h-4" /> : <Plus className="w-4 h-4 text-zinc-300" />}
                                    {item}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AmenitiesFeatures;
