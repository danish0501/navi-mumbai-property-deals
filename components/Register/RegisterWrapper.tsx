"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Login from "./Login";
import Signup from "./Signup";

const RegisterWrapper = () => {
    const [isLogin, setIsLogin] = useState(true);
    const toggleAuth = () => setIsLogin(!isLogin);

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
            {/* Professional subtle background pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#baa360_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[520px] relative z-10"
            >
                {/* Real Brand Logo */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="mb-2"
                    >
                        <Image
                            src="/images/nm-property-logo.png"
                            alt="Navi Mumbai Property Deals"
                            width={200}
                            height={70}
                            className="h-auto w-auto object-contain"
                            priority
                        />
                    </motion.div>
                    <div className="h-1 w-1/3 bg-brand-primary/50 rounded-full mt-2"></div>
                </div>

                {/* Clean Professional Card */}
                <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-neutral-200/60 overflow-hidden">
                    <div className="p-8 md:p-10">
                        <AnimatePresence mode="wait" initial={false}>
                            {isLogin ? (
                                <motion.div
                                    key="login-view"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <Login onSwitch={toggleAuth} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="signup-view"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <Signup onSwitch={toggleAuth} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterWrapper;
