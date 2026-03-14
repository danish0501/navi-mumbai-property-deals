"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Github, Chrome, Facebook } from "lucide-react";

interface LoginProps {
    onSwitch: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitch }) => {
    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-brand-heading mb-2">Welcome Back</h2>
                <p className="text-brand-paragraph/70 font-medium tracking-tight">Sign in with your email or social accounts</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-brand-heading ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all text-brand-heading placeholder:text-neutral-400 font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-sm font-semibold text-brand-heading">Password</label>
                        <button className="text-xs font-bold text-brand-primary hover:text-brand-primary-hover transition-colors">
                            Forgot Password?
                        </button>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all text-brand-heading placeholder:text-neutral-400 font-medium tracking-widest"
                        />
                    </div>
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/10 transition-all cursor-pointer"
                >
                    Sign In Now
                    <ArrowRight className="w-5 h-5" />
                </motion.button>
            </form>

            <div className="relative my-10 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-100"></div>
                </div>
                <span className="relative px-4 bg-white text-xs font-bold text-neutral-400 uppercase tracking-widest">Or login with</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {[
                    { icon: Chrome, color: "hover:bg-red-50 hover:border-red-100" },
                    { icon: Facebook, color: "hover:bg-blue-50 hover:border-blue-100" },
                    { icon: Github, color: "hover:bg-neutral-100 hover:border-neutral-200" },
                ].map((social, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ y: -3, scale: 1.02 }}
                        className={`flex items-center justify-center p-3.5 border border-neutral-100 rounded-xl transition-all shadow-sm bg-white ${social.color}`}
                    >
                        <social.icon className="w-5 h-5 text-neutral-600" />
                    </motion.button>
                ))}
            </div>

            <p className="mt-10 text-center text-brand-paragraph/70 font-medium">
                Don't have an account?{" "}
                <button
                    onClick={onSwitch}
                    className="text-brand-primary font-bold hover:underline decoration-brand-primary/30 decoration-2 underline-offset-4"
                >
                    Join free today
                </button>
            </p>
        </div>
    );
};

export default Login;
