"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { User, Package, MapPin, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
}

interface Order {
    id: string;
    date: string;
    amount: number;
    status: string;
    paymentMethod: string;
    items: OrderItem[];
}

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");
    const [orders, setOrders] = useState<Order[]>([]);

    // Auth Integration
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);


    useEffect(() => {
        // Load orders from local storage on mount
        const savedOrders = localStorage.getItem("orders");
        if (savedOrders) {
            try {
                setOrders(JSON.parse(savedOrders));
            } catch (e) {
                console.error("Failed to parse orders", e);
            }
        }
    }, []);

    // Show nothing while checking auth to prevent flash
    if (isLoading || !user) return <div className="min-h-screen bg-[#FDFBF7]"></div>;

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12">
            <Container>
                {/* Header */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Link href="/">Home</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="font-medium text-foreground">My Account</span>
                </div>

                <h1 className="font-serif text-3xl font-bold mb-8 text-[#155E42]">My Account</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-[#155E42]/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-[#155E42] flex items-center justify-center text-white font-bold text-xl relative overflow-hidden">
                                        {user.image ? (
                                            <Image src={user.image} alt={user.name} fill className="object-cover" />
                                        ) : (
                                            user.name.charAt(0)
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 line-clamp-1">{user.name}</p>
                                        <p className="text-xs text-gray-500 line-clamp-1">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                            <nav className="p-2">
                                <button
                                    onClick={() => setActiveTab("profile")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "profile"
                                        ? "bg-[#155E42] text-white"
                                        : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <User className="h-4 w-4" />
                                    Profile Details
                                </button>
                                <button
                                    onClick={() => setActiveTab("orders")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "orders"
                                        ? "bg-[#155E42] text-white"
                                        : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <Package className="h-4 w-4" />
                                    My Orders
                                </button>
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeTab === "profile" && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="font-serif text-xl font-bold mb-6 text-[#155E42] flex items-center gap-2">
                                    <User className="h-5 w-5" /> Personal Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                        <div className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            {user.name}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                                        <div className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            {user.email}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                                        <div className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            {user.phone}
                                        </div>
                                    </div>
                                </div>

                                <h2 className="font-serif text-xl font-bold mb-6 text-[#155E42] flex items-center gap-2 border-t border-gray-100 pt-6">
                                    <MapPin className="h-5 w-5" /> Saved Address
                                </h2>
                                <div className="p-4 border border-gray-200 rounded-lg relative hover:border-[#155E42] transition-colors cursor-pointer group">
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-[#155E42]/10 text-[#155E42] text-xs font-bold px-2 py-1 rounded">DEFAULT</span>
                                    </div>
                                    <p className="font-bold text-gray-900 mb-1">{user.name}</p>
                                    <p className="text-gray-600 text-sm mb-1">{user.address}</p>
                                    <p className="text-gray-600 text-sm">{user.phone}</p>
                                </div>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div className="space-y-6">
                                <h2 className="font-serif text-xl font-bold mb-4 text-[#155E42]">Order History</h2>

                                {orders.length === 0 ? (
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Package className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h3>
                                        <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
                                        <Link href="/products">
                                            <Button className="bg-[#155E42] hover:bg-[#0f4631]">Start Shopping</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    orders.map((order) => (
                                        <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                            <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Order Placed</p>
                                                        <p className="text-sm font-medium text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Total</p>
                                                        <p className="text-sm font-medium text-gray-900">₹{order.amount}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Order ID</p>
                                                        <p className="text-sm font-medium text-gray-900">{order.id}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                {order.items && order.items.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-4 py-2 first:pt-0 last:pb-0">
                                                        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                                                            <Image
                                                                src={item.image || "/products/placeholder.jpg"}
                                                                alt={item.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                                                            <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                                                <Button variant="outline" size="sm" className="text-[#155E42] border-[#155E42] hover:bg-[#155E42]/5">
                                                    View Invoice
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
