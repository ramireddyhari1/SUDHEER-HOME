"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { loginWithGoogle, user, sendOtp, verifyOtp } = useAuth();
    const router = useRouter();

    // OTP State
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [email, setEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");

    // UI Loading States
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

    // AUTH FIX: Redirect only when user state is confirmed
    useEffect(() => {
        if (user) {
            router.push("/account");
        }
    }, [user, router]);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsSendingOtp(true);

        try {
            const res = await sendOtp(email);
            if (res.success) {
                setStep('otp');
                setMessage({ type: 'success', text: "OTP sent to your email!" });
            } else {
                setMessage({ type: 'error', text: res.message || "Failed to send OTP." });
            }
        } catch (error) {
            setMessage({ type: 'error', text: "An unexpected error occurred." });
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsVerifying(true);

        try {
            const res = await verifyOtp(email, otpCode);
            if (res.success) {
                // Login successful, redirect handled by useEffect
                setMessage({ type: 'success', text: "Login Successful!" });
            } else {
                setMessage({ type: 'error', text: res.message || "Invalid OTP." });
            }
        } catch (error) {
            setMessage({ type: 'error', text: "Verification failed." });
        } finally {
            setIsVerifying(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error("Google login failed", error);
            setIsGoogleLoading(false);
        }
    };

    // Toggle between Login and Sign Up view (logic remains same for OTP)
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-white">

            {/* LEFT SIDE - ILLUSTRATION & SHAPES */}
            <div className="relative w-full md:w-[55%] lg:w-[60%] h-[40vh] md:h-full bg-white flex items-center justify-center p-6 md:p-12 overflow-hidden order-2 md:order-1">
                {/* BACK BUTTON (Mobile position usually, but keeping absolute for now) */}
                <div className="absolute top-4 left-4 z-20">
                    <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-[#154D3E] transition-colors group">
                        <div className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                            <ArrowLeft className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-sm">Back to Store</span>
                    </Link>
                </div>

                {/* Partners Button - Left side top right */}
                <div className="absolute top-4 right-4 z-20 md:hidden">
                    <Link
                        href="/partners/login"
                        className="flex items-center gap-2 bg-[#154D3E] text-white px-4 py-2 rounded-full shadow-lg text-xs font-bold"
                    >
                        <span>⭐</span>
                        <span>PARTNERS</span>
                    </Link>
                </div>

                {/* Organic Blobs Background - Removed for cleaner look */}

                {/* Illustration Container */}
                <div className="relative z-10 w-full max-w-lg">
                    <div className="relative w-full aspect-square max-h-[500px] mx-auto flex items-center justify-center p-8">
                        <img
                            src="/login-illustration.png"
                            alt="Organic Lifestyle"
                            className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* Wavy Divider - SVG Overlay */}
                <div className="absolute top-0 right-[-1px] bottom-0 w-24 md:w-48 h-full hidden md:block pointer-events-none z-20">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full text-[#0A2F1C] fill-current drop-shadow-[-10px_0_10px_rgba(0,0,0,0.1)]">
                        <path d="M100 0 C 40 30 60 70 100 100 L 100 100 L 100 0 Z" />
                    </svg>
                </div>
                {/* For smaller screens, wave at bottom */}
                <div className="absolute bottom-[-1px] left-0 right-0 h-24 w-full md:hidden pointer-events-none z-20">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full text-[#0A2F1C] fill-current">
                        <path d="M0 100 C 30 40 70 60 100 100 L 100 100 L 0 100 Z" />
                    </svg>
                </div>

            </div>

            {/* RIGHT SIDE - LOGIN FORM */}
            <div className="w-full md:w-[45%] lg:w-[40%] min-h-[60vh] md:h-full bg-[#0A2F1C] flex flex-col justify-center items-center p-8 relative order-1 md:order-2 shadow-2xl z-10">

                {/* Partners Button - Desktop */}
                <div className="absolute top-6 right-6 z-20 hidden md:block">
                    <Link
                        href="/partners/login"
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full transition-all border border-white/20 hover:scale-105 active:scale-95 backdrop-blur-sm"
                    >
                        <span className="text-lg">⭐</span>
                        <span className="text-xs font-bold tracking-wider">PARTNERS</span>
                    </Link>
                </div>

                <div className="w-full max-w-sm space-y-8 animate-fade-in-up">
                    <div className="text-center text-white space-y-3">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-white/90">
                            {isLoginView ? "Welcome Back" : "Join Us"}
                        </h2>
                        <p className="text-emerald-100/70 text-sm font-light tracking-wide">
                            {isLoginView ? "Enter your details to access your organic journey" : "Start your organic journey with us today"}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Messages */}
                        {message && (
                            <div className={`p-4 rounded-xl text-sm text-center font-medium backdrop-blur-sm border ${message.type === 'error'
                                ? 'bg-red-500/10 text-red-100 border-red-500/20'
                                : 'bg-emerald-500/10 text-emerald-100 border-emerald-500/20'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        {step === 'email' ? (
                            <div className="space-y-6">
                                {/* Google Login */}
                                <button
                                    onClick={handleGoogleLogin}
                                    disabled={isGoogleLoading}
                                    className="w-full h-14 bg-white hover:bg-emerald-50 text-[#0A2F1C] rounded-2xl font-bold shadow-lg shadow-black/10 transition-all flex items-center justify-center gap-3 active:scale-95 group border-2 border-transparent hover:border-emerald-200"
                                >
                                    {isGoogleLoading ? (
                                        <div className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-[#0A2F1C] border-t-transparent rounded-full animate-spin"></span>
                                            <span className="text-[#0A2F1C]">Connecting...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <svg className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                            <span className="font-bold">
                                                {isLoginView ? "Sign in with Google" : "Sign up with Google"}
                                            </span>
                                        </>
                                    )}
                                </button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/10"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-[#0A2F1C] text-white/40 uppercase tracking-widest text-xs font-semibold">Or with email</span>
                                    </div>
                                </div>

                                <form onSubmit={handleSendOtp} className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-emerald-100/90 ml-1">Email Address</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-emerald-300/70 group-focus-within:text-emerald-300 transition-colors" />
                                            </div>
                                            <input
                                                id="email"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="block w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 text-white placeholder-emerald-100/30 border border-white/10 focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent focus:bg-white/10 transition-all font-medium outline-none backdrop-blur-sm"
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSendingOtp}
                                        className="w-full h-14 bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFE44D] hover:to-[#FFB733] text-[#2C1810] rounded-2xl font-bold shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02] active:scale-95 border border-white/10 uppercase tracking-widest text-sm"
                                    >
                                        {isSendingOtp ? "Sending Code..." : (isLoginView ? "GET LOGIN CODE" : "CREATE ACCOUNT")}
                                    </Button>
                                </form>

                                {/* Toggle Login/Signup */}
                                <div className="text-center pt-2">
                                    <p className="text-emerald-100/60 text-sm">
                                        {isLoginView ? "New to Sweet Organic? " : "Already have an account? "}
                                        <button
                                            onClick={() => setIsLoginView(!isLoginView)}
                                            className="text-[#FFD700] hover:text-[#FFE44D] font-bold underline decoration-transparent hover:decoration-[#FFD700] transition-all ml-1"
                                        >
                                            {isLoginView ? "Create Account" : "Login Here"}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleVerifyOtp} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="otp" className="text-sm font-medium text-emerald-100/90 ml-1">Verification Code</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <KeyRound className="h-5 w-5 text-emerald-300/70 group-focus-within:text-emerald-300 transition-colors" />
                                        </div>
                                        <input
                                            id="otp"
                                            type="text"
                                            maxLength={6}
                                            required
                                            value={otpCode}
                                            onChange={(e) => setOtpCode(e.target.value)}
                                            className="block w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 text-white placeholder-emerald-100/30 border border-white/10 focus:ring-2 focus:ring-emerald-400/50 focus:border-transparent focus:bg-white/10 transition-all font-mono tracking-[0.5em] text-xl text-center outline-none backdrop-blur-sm"
                                            placeholder="••••••"
                                            autoFocus
                                        />
                                    </div>
                                    <p className="text-center text-emerald-100/40 text-xs">Code sent to <span className="text-emerald-100/80">{email}</span></p>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isVerifying}
                                    className="w-full h-14 bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFE44D] hover:to-[#FFB733] text-[#2C1810] rounded-2xl font-bold shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02] active:scale-95 border border-white/10 uppercase tracking-widest text-sm"
                                >
                                    {isVerifying ? "Verifying..." : "VERIFY & PROCEED"}
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => setStep('email')}
                                    className="w-full text-sm text-emerald-100/50 hover:text-white transition-colors py-2 flex items-center justify-center gap-2 group"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    <span>Change details</span>
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Copyright footer */}
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <p className="text-emerald-100/20 text-xs">© 2026 Sweet Organic Store</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
