
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { loginAsAdmin } = useAuth(); // We need to add this to AuthContext

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch('/api/auth/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (data.success) {
                // If AuthContext expects a specific login method, we verify it here
                // For now, let's assume we update AuthContext to handle "admin" user setting
                // Or we manually set user here if AuthContext simple
                // Better: Extend AuthContext
                if (loginAsAdmin) {
                    loginAsAdmin({ ...data.user, token: data.token });
                } else {
                    // Fallback if context not updated yet
                    localStorage.setItem("currentUser", JSON.stringify({ ...data.user, token: data.token }));
                    window.location.href = "/admin"; // Force reload to pick up storage
                }
                router.push("/admin/dashboard");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-[#155E42]/10 rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-8 h-8 text-[#155E42]" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
                    <p className="text-gray-500 text-sm">Restricted Access</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#155E42] focus:border-transparent outline-none transition-all"
                            placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#155E42] focus:border-transparent outline-none transition-all"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#155E42] hover:bg-[#0E3F2D] text-white h-12 rounded-lg font-bold text-base shadow-lg shadow-green-900/10"
                    >
                        {loading ? "Authenticating..." : "Login to Dashboard"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
