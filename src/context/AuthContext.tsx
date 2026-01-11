"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
    image?: string;
    phone?: string;
    address?: string;
    isAdmin?: boolean;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string) => void;
    loginWithGoogle: () => Promise<void>;
    logout: () => void;
    sendOtp: (email: string) => Promise<{ success: boolean; message: string }>;
    verifyOtp: (email: string, code: string) => Promise<{ success: boolean; message: string }>;
    loginAsAdmin: (adminUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Check for persisted user on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        }
        setIsLoading(false);
    }, []);

    const login = (email: string) => {
        setIsLoading(true);
        // Mock Login
        const mockUser = {
            name: "Hariharan",
            email: email,
            image: "", // Could add a placeholder avatar
            phone: "+91 98765 43210",
            address: "Green Heights, HSR Layout, Bengaluru",
            isAdmin: true // Mock Admin User
        };
        setUser(mockUser);
        localStorage.setItem("currentUser", JSON.stringify(mockUser));
        setIsLoading(false);
        router.push("/account");
    };

    const loginWithGoogle = async () => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const googleUser = {
            name: "Hariharan (Google)",
            email: "hariharan@gmail.com", // Mock email
            image: "https://lh3.googleusercontent.com/a/ACg8ocIq8jF0Xw=s96-c", // Generic Google avatar placeholder or real one if we had it
            phone: "+91 98765 43210", // Mock phone
            address: "Google Account Address" // Mock address
        };
        setUser(googleUser);
        localStorage.setItem("currentUser", JSON.stringify(googleUser));
        setIsLoading(false);
        router.push("/account");
    };

    const sendOtp = async (email: string) => {
        try {
            const res = await fetch('/api/auth/otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, type: 'request' })
            });
            return await res.json();
        } catch (error) {
            console.error(error);
            return { success: false, message: "Failed to send OTP" };
        }
    };

    const verifyOtp = async (email: string, code: string) => {
        try {
            const res = await fetch('/api/auth/otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, type: 'verify', code })
            });
            const data = await res.json();

            if (data.success) {
                // If verify success, log the user in
                // In a real app, the API would return the full user object
                const authenticatedUser = data.user || {
                    name: email.split('@')[0],
                    email: email,
                    image: null
                };

                setUser(authenticatedUser);
                localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));
                router.push("/account");
            }

            return data;
        } catch (error) {
            console.error(error);
            return { success: false, message: "Failed to verify OTP" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("currentUser");
        router.push("/");
    };

    const loginAsAdmin = (adminUser: User) => {
        setUser(adminUser);
        localStorage.setItem("currentUser", JSON.stringify(adminUser));
        router.push("/admin/dashboard");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, logout, sendOtp, verifyOtp, loginAsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
