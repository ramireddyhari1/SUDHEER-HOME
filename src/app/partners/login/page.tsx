'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function PartnerLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            const res = await fetch('/api/partners/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem('partnerToken', data.token);
                localStorage.setItem('partnerData', JSON.stringify(data.partner));
                if (rememberMe) {
                    localStorage.setItem('partnerEmail', email);
                }
                setSuccess(true);
                setTimeout(() => router.push('/partners/dashboard'), 800);
            } else {
                setError(data.error || 'Login failed');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4"
            style={{ backgroundColor: 'var(--color-background)' }}
        >
            {/* Back link */}
            <Link
                href="/"
                className="absolute top-4 left-4 inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to store
            </Link>

            {/* Card */}
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div
                            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
                            style={{ backgroundColor: 'var(--color-primary)' }}
                        >
                            <Lock className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-arista)' }}>
                            Partner login
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Sign in to your partner dashboard
                        </p>
                    </div>

                    {success && (
                        <div className="mb-6 py-3 px-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm font-medium text-center">
                            Login successful. Redirecting…
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="py-3 px-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-primary/20 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                                    Password
                                </label>
                                <Link
                                    href="/partners/forgot-password"
                                    className="text-xs font-medium text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-11 py-2.5 rounded-lg border border-primary/20 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 rounded border-primary/30 text-primary focus:ring-primary/30"
                            />
                            <span className="text-sm text-muted-foreground">Remember me</span>
                        </label>

                        <button
                            type="submit"
                            disabled={loading || success}
                            className="w-full py-3 rounded-lg font-semibold text-primary-foreground transition-opacity disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            style={{ backgroundColor: 'var(--color-primary)' }}
                        >
                            {loading ? (
                                <span className="inline-flex items-center gap-2">
                                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing in…
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-muted-foreground">
                        Need access?{' '}
                        <Link href="/contact" className="font-medium text-primary hover:underline">
                            Contact support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
