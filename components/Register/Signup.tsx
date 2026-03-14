"use client";
import React from "react";
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from "lucide-react";

interface SignupProps {
    onSwitch: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSwitch }) => {
    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-brand-heading mb-2">Create Account</h2>
                <p className="text-brand-paragraph/70 font-medium tracking-tight">Join Navi Mumbai's premier property portal</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-brand-heading ml-1">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="e.g. Alex Johnson"
                            className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all text-brand-heading placeholder:text-neutral-400 font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-brand-heading ml-1">Phone Number</label>
                    <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
                        <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all text-brand-heading placeholder:text-neutral-400 font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-brand-heading ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
                        <input
                            type="email"
                            placeholder="alex@example.com"
                            className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all text-brand-heading placeholder:text-neutral-400 font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-brand-heading ml-1">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
                        <input
                            type="password"
                            placeholder="Min. 8 characters"
                            className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all text-brand-heading placeholder:text-neutral-400 font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-brand-heading ml-1">Confirm Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all text-brand-heading placeholder:text-neutral-400 font-medium"
                        />
                    </div>
                </div>

                <div className="flex items-start gap-3 py-2 cursor-pointer group">
                    <div className="mt-1">
                        <input
                            type="checkbox"
                            id="terms"
                            className="w-4 h-4 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/20 accent-brand-primary transition-all cursor-pointer"
                        />
                    </div>
                    <label htmlFor="terms" className="text-xs text-brand-paragraph/60 leading-relaxed cursor-pointer font-medium group-hover:text-brand-heading transition-colors">
                        I agree to the <span className="text-brand-primary font-bold hover:underline">Terms of Service</span> and <span className="text-brand-primary font-bold hover:underline">Privacy Policy</span>. I also consent to receive updates via WhatsApp.
                    </label>
                </div>

                <div className="space-y-3 pt-2">
                    <button
                        type="submit"
                        className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/10 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                        Create Free Account
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    <button
                        type="button"
                        className="w-full bg-white text-brand-heading py-4 rounded-xl font-bold flex items-center justify-center gap-3 border border-neutral-200 hover:bg-neutral-50 transition-all shadow-sm hover:border-neutral-300 cursor-pointer"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Sign up with Google
                    </button>
                </div>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-emerald-600 font-bold bg-emerald-50 px-4 py-2.5 rounded-lg border border-emerald-100 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 fill-emerald-100" />
                Your data is encrypted and secure
            </div>

            <p className="mt-10 text-center text-brand-paragraph/70 font-medium">
                Already a member?{" "}
                <button
                    onClick={onSwitch}
                    className="text-brand-primary font-semibold hover:underline decoration-brand-primary decoration-2 underline-offset-2 cursor-pointer"
                >
                    Log In
                </button>
            </p>
        </div>
    );
};

export default Signup;
