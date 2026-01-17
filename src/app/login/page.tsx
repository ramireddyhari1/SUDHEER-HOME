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

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* VIDEO BACKGROUND */}
            {/* IMAGE BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <div role="img" aria-label="Andhra Theme Background" className="w-full h-full absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/login_bg.png')" }}></div>
                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
            </div>

            {/* BACK BUTTON */}
            <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20">
                <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium text-sm">Back to Store</span>
                </Link>
            </div>

            {/* ADMIN LOGIN LINK - TOP RIGHT */}
            <div className="absolute top-4 md:top-6 right-4 md:right-6 z-20">
                <Link href="/admin/login" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20">
                    <span className="font-medium text-xs uppercase tracking-wider">Admin</span>
                </Link>
            </div>

            {/* GLASSMORPHISM CARD */}
            <div className="relative z-10 w-full max-w-md p-4 sm:p-10 mx-4">
                <div className="bg-white/10 border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-md p-6 sm:p-10">

                    <div className="text-center mb-6 md:mb-10">
                        <h1 className="font-serif text-2xl md:text-4xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-white/70 text-sm">
                            {step === 'email' ? "Sign in to access your organic journey" : `Enter the OTP sent to ${email}`}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Error/Success Message */}
                        {message && (
                            <div className={`p-3 rounded-lg text-sm text-center font-medium ${message.type === 'error' ? 'bg-red-500/20 text-red-200 border border-red-500/30' : 'bg-green-500/20 text-green-200 border border-green-500/30'}`}>
                                {message.text}
                            </div>
                        )}

                        {step === 'email' ? (
                            <>
                                {/* Google Button */}
                                <button
                                    onClick={handleGoogleLogin}
                                    disabled={isGoogleLoading}
                                    className="w-full flex justify-center items-center gap-3 py-3.5 px-4 bg-white rounded-xl shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-all transform active:scale-95 group"
                                >
                                    {isGoogleLoading ? (
                                        <div className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin"></span>
                                            <span className="text-gray-600 font-medium">Connecting...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <svg className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                            <span className="text-gray-900 font-bold">Sign in with Google</span>
                                        </>
                                    )}
                                </button>

                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/20" />
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="px-3 text-white/50 bg-transparent uppercase tracking-wider backdrop-blur-xl">Or using email</span>
                                    </div>
                                </div>

                                <form className="space-y-5" onSubmit={handleSendOtp}>
                                    <div>
                                        <label htmlFor="email" className="sr-only">Email address</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
                                            </div>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="block w-full pl-11 h-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent focus:bg-white/10 transition-all outline-none"
                                                placeholder="Email address"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSendingOtp}
                                        className="w-full h-12 bg-[#DAA520] hover:bg-[#B8860B] text-[#2C1810] rounded-xl font-bold shadow-lg shadow-yellow-900/20 ring-1 ring-white/10 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSendingOtp ? "Sending OTP..." : "Get Login Code"}
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <form className="space-y-5" onSubmit={handleVerifyOtp}>
                                <div>
                                    <label htmlFor="otp" className="sr-only">OTP Code</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <KeyRound className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
                                        </div>
                                        <input
                                            id="otp"
                                            name="otp"
                                            type="text"
                                            maxLength={6}
                                            autoComplete="one-time-code"
                                            required
                                            value={otpCode}
                                            onChange={(e) => setOtpCode(e.target.value)}
                                            className="block w-full pl-11 h-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent focus:bg-white/10 transition-all outline-none tracking-[0.5em] font-mono text-center"
                                            placeholder="123456"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isVerifying}
                                    className="w-full h-12 bg-[#DAA520] hover:bg-[#B8860B] text-[#2C1810] rounded-xl font-bold shadow-lg shadow-yellow-900/20 ring-1 ring-white/10 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isVerifying ? "Verifying..." : "Verify & Login"}
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => setStep('email')}
                                    className="w-full text-sm text-white/60 hover:text-white transition-colors"
                                >
                                    Change Email or Resend
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
