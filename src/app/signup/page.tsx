"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    // Signup is essentially the same as OTP login in a passwordless system.
    // We'll reuse the same logic or just redirect to login, but for better UX, we'll keep the UI separate 
    // but use the same underlying auth method (sendOtp/verifyOtp).
    // The previous mockup assumed "Password" creation, but user wants OTP.

    const { sendOtp, verifyOtp } = useAuth();
    const router = useRouter();

    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [email, setEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");

    // UI Loading States
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsSendingOtp(true);

        try {
            const res = await sendOtp(email);
            if (res.success) {
                setStep('otp');
                setMessage({ type: 'success', text: "Verification code sent!" });
            } else {
                setMessage({ type: 'error', text: res.message || "Failed to send code." });
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
                setMessage({ type: 'success', text: "Account Created!" });
                // Redirect handled by AuthContext or we can push manually
                router.push("/account");
            } else {
                setMessage({ type: 'error', text: res.message || "Invalid Code." });
            }
        } catch (error) {
            setMessage({ type: 'error', text: "Verification failed." });
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* VIDEO BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/logo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
            </div>

            {/* BACK BUTTON */}
            <div className="absolute top-6 left-6 z-20">
                <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium text-sm">Back to Store</span>
                </Link>
            </div>

            {/* GLASSMORPHISM CARD */}
            <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4">
                <div className="bg-white/10 border border-white/20 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-md p-8 sm:p-10">

                    <div className="text-center mb-10">
                        <h1 className="font-serif text-4xl font-bold text-white mb-2">Join the Family</h1>
                        <p className="text-white/70 text-sm">
                            {step === 'email' ? "Start your organic journey today" : "Verify your email to continue"}
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
                                    {isSendingOtp ? "Sending..." : "Continue with Email"}
                                </Button>
                            </form>
                        ) : (
                            <form className="space-y-5" onSubmit={handleVerifyOtp}>
                                <div>
                                    <label htmlFor="otp" className="sr-only">Verification Code</label>
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
                                    {isVerifying ? "Verifying..." : "Create Account"}
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => setStep('email')}
                                    className="w-full text-sm text-white/60 hover:text-white transition-colors"
                                >
                                    Change Email
                                </button>
                            </form>
                        )}

                        <div className="mt-6 text-center">
                            <span className="text-white/60 text-sm">Already have an account? </span>
                            <Link href="/login" className="text-sm font-medium text-white/90 hover:text-white hover:underline decoration-white/50 underline-offset-4 transition-all">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
