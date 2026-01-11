"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Check, Copy, Home } from "lucide-react";
import { motion } from "framer-motion";
import canvasConfetti from "canvas-confetti";

interface OrderSuccessProps {
    orderId: string;
    amount: number;
    paymentMethod: "online" | "cod";
}

export function OrderSuccess({ orderId, amount, paymentMethod }: OrderSuccessProps) {
    const [copied, setCopied] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);

    useEffect(() => {
        // Timeline: Tractor Drives In -> Confetti -> Receipt Slides Up
        const timer = setTimeout(() => {
            triggerConfetti();
            setShowReceipt(true);
        }, 2000); // Wait for tractor to arrive

        return () => clearTimeout(timer);
    }, []);

    const triggerConfetti = () => {
        const colors = ['#155E42', '#FABF21', '#FDFBF7'];
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            canvasConfetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            canvasConfetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFBF7] overflow-hidden">

            {/* Background Decor (Clouds/Sun) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 100, opacity: 0.5 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-10 left-[10%] w-24 h-12 bg-white rounded-full blur-xl opacity-50"
                />
            </div>

            {/* Animation Stage */}
            <div className="relative w-full max-w-lg h-64 mb-4 flex items-end justify-center overflow-hidden">
                {/* Road */}
                <div className="absolute bottom-0 w-full h-1 bg-gray-200" />

                {/* Tractor Animation */}
                <motion.div
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{
                        type: "spring",
                        duration: 2.5,
                        bounce: 0.2
                    }}
                    className="relative z-10 w-48 h-32 mb-1"
                >
                    <Image
                        src="/POSTERS/tractor_cartoon.png"
                        alt="Delivery Tractor"
                        width={192}
                        height={128}
                        className="object-contain"
                        priority
                    />
                    {/* Puff of smoke */}
                    <motion.div
                        animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1.2, 1.5], x: [-10, -30] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="absolute bottom-4 -left-4 w-6 h-6 bg-gray-100 rounded-full blur-sm"
                    />
                </motion.div>

                {/* Delivery Text */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={showReceipt ? { opacity: 1, scale: 1, y: -80 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute text-center bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg border border-[#155E42]/10"
                >
                    <span className="font-serif font-bold text-[#155E42] text-lg">Order Delivered!</span>
                </motion.div>
            </div>


            {/* Receipt Card (Slides Up) */}
            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={showReceipt ? { y: 0, opacity: 1 } : {}}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full max-w-sm px-4"
            >
                <div className="bg-white w-full rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
                    {/* Top Stripe */}
                    <div className="h-2 w-full bg-[#FABF21]" />

                    <div className="p-6">
                        <div className="text-center mb-6">
                            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">Receipt</h2>
                            <p className="text-sm text-gray-500">Vaishnavi Organics</p>
                        </div>

                        {/* Order Details */}
                        <div className="space-y-4 mb-6 relative">
                            {/* Dotted Lines */}
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] border-l-2 border-dashed border-gray-100" />
                            <div className="absolute right-0 top-0 bottom-0 w-[2px] border-l-2 border-dashed border-gray-100" />

                            <div className="flex justify-between items-center px-3">
                                <span className="text-gray-500 text-sm">Order ID</span>
                                <button onClick={copyToClipboard} className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded hover:bg-gray-100 transition-colors">
                                    <span className="font-mono font-medium text-gray-900 text-sm">#{orderId}</span>
                                    {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3 text-gray-400" />}
                                </button>
                            </div>
                            <div className="flex justify-between items-center px-3">
                                <span className="text-gray-500 text-sm">Amount</span>
                                <span className="font-bold text-lg text-[#155E42]">₹{amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center px-3">
                                <span className="text-gray-500 text-sm">Payment</span>
                                <span className="text-sm font-medium capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <Link href="/products">
                                <Button className="w-full bg-[#155E42] hover:bg-[#0E3F2D] text-white h-11 rounded-xl shadow-lg shadow-green-900/10">
                                    <Home className="w-4 h-4 mr-2" /> Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
