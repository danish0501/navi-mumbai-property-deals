"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Calendar, CheckCircle, Info } from "lucide-react";

interface RentalSuitabilityProps {
    formData: any;
    updateFormData: (field: string, value: any) => void;
}

const SUITABILITY_OPTIONS = ["Family", "Bachelor", "Company Lease", "Working Professional"];

const RentalSuitability: React.FC<RentalSuitabilityProps> = ({ formData, updateFormData }) => {
    
    const toggleSuitability = (item: string) => {
        const currentList = formData.suitableFor || [];
        if (currentList.includes(item)) {
            updateFormData("suitableFor", currentList.filter((i: string) => i !== item));
        } else {
            updateFormData("suitableFor", [...currentList, item]);
        }
    };

    return (
        <AnimatePresence>
            {formData.purpose === "rent" && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                >
                    <div className="bg-white/80 backdrop-blur-xl border border-zinc-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all duration-500">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-600">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-zinc-900">Rental Preferences</h2>
                                <p className="text-sm text-zinc-500 font-medium">Define your ideal tenant profile</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Suitable For */}
                            <div className="space-y-6">
                                <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1">Suitable For</label>
                                <div className="flex flex-wrap gap-3">
                                    {SUITABILITY_OPTIONS.map((item) => {
                                        const isSelected = (formData.suitableFor || []).includes(item);
                                        return (
                                            <motion.button
                                                key={item}
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => toggleSuitability(item)}
                                                className={`px-5 py-3 rounded-2xl text-[12px] font-bold border transition-all flex items-center gap-2
                                                    ${isSelected 
                                                        ? "bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20" 
                                                        : "bg-white border-zinc-100 text-zinc-600 hover:border-sky-500/30"}`}
                                            >
                                                {isSelected ? <CheckCircle className="w-4 h-4" /> : <Info className="w-4 h-4 text-zinc-300" />}
                                                {item}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Available From */}
                            <div className="space-y-6">
                                <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1">Availability</label>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="e.g. Immediately or 1st April"
                                        value={formData.availableFrom}
                                        onChange={(e) => updateFormData("availableFrom", e.target.value)}
                                        className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl pl-14 pr-5 py-4 text-[14px] font-bold focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-sm"
                                    />
                                </div>
                                <p className="text-[10px] font-bold text-zinc-400 px-2 italic uppercase tracking-wider">Note: Be specific for faster closure</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-8" /> {/* Spacer */}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RentalSuitability;
