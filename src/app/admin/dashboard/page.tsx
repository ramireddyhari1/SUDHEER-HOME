"use client";

import { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Users, TrendingUp, RefreshCcw, Package, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnnouncementEditor } from "@/components/admin/AnnouncementEditor";
import CouponManager from "@/components/admin/CouponManager";

export default function AdminDashboardPage() {
    const [loading, setLoading] = useState(true);
    const [productCount, setProductCount] = useState(0);
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [revenue, setRevenue] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        try {
            // Products
            const resProducts = await fetch('/api/products');
            const dataProducts = await resProducts.json();
            if (dataProducts.success) {
                setProductCount(dataProducts.products.length);
            }

            // Orders
            const resOrders = await fetch('/api/orders');
            const dataOrders = await resOrders.json();
            if (dataOrders.success) {
                // 1. Recent Orders (Top 5)
                const formatted = dataOrders.orders.slice(0, 5).map((o: any) => ({
                    id: o.orderId,
                    customer: o.customer.name,
                    email: o.customer.email,
                    amount: `₹${o.amount}`,
                    status: o.status,
                    date: new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    fullDate: new Date(o.date).toLocaleString()
                }));
                setRecentOrders(formatted);

                // 2. Total Revenue
                const totalRev = dataOrders.orders
                    .filter((o: any) => o.status !== 'Cancelled')
                    .reduce((acc: number, curr: any) => acc + (curr.amount || 0), 0);
                setRevenue(totalRev);

                // 3. Active Customers
                const uniqueCustomers = new Set(dataOrders.orders.map((o: any) => o.customer.email));
                setCustomers(uniqueCustomers.size);
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data");
        } finally {
            setLoading(false);
            if (isRefresh) setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Auto-refresh every 30 seconds
        const interval = setInterval(() => fetchData(true), 30000);
        return () => clearInterval(interval);
    }, []);

    const stats = [
        {
            title: "Total Revenue",
            value: `₹${revenue.toLocaleString()}`,
            icon: DollarSign,
            gradient: "from-emerald-500 to-green-600",
            shadow: "shadow-green-100",
            trend: "+12.5% from last month"
        },
        {
            title: "Total Products",
            value: productCount,
            icon: ShoppingBag,
            gradient: "from-blue-500 to-indigo-600",
            shadow: "shadow-blue-100",
            trend: "+4 new products"
        },
        {
            title: "Active Customers",
            value: customers,
            icon: Users,
            gradient: "from-orange-500 to-red-600",
            shadow: "shadow-orange-100",
            trend: "Growing community"
        },
        {
            title: "Growth Rate",
            value: "+24%",
            icon: TrendingUp,
            gradient: "from-violet-500 to-purple-600",
            shadow: "shadow-purple-100",
            trend: "Based on sales volume"
        },
    ];

    return (
        <div className="p-6 md:p-8 space-y-8 bg-gray-50/50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Real-time insights for Vaishnavi Organics</p>
                </div>
                <div className="flex items-center gap-3">
                    {refreshing && <span className="text-xs text-gray-400 animate-pulse">Updating live...</span>}
                    <button
                        onClick={() => fetchData(true)}
                        className={`p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-green-700 hover:border-green-200 transition-all ${refreshing ? 'animate-spin' : ''}`}
                        title="Refresh Data"
                    >
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                    <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-600 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        Live System
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={index}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-bl-full group-hover:scale-110 transition-transform duration-500`}></div>

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg ${stat.shadow}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                {loading ? "..." : "Active"}
                            </span>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                            {loading ? (
                                <div className="h-8 w-24 bg-gray-100 rounded animate-pulse mt-2"></div>
                            ) : (
                                <p className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">{stat.value}</p>
                            )}
                            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> {stat.trend}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Content Management Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Announcement Bar Editor & Coupon Manager */}
                <div className="lg:col-span-1 space-y-8">
                    <AnnouncementEditor />
                    <CouponManager />
                </div>

                {/* Recent Orders Section - Taking up remaining space */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg text-green-700">
                                <Package className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                        </div>
                        <Link href="/admin/orders" className="text-sm font-medium text-green-700 hover:text-green-800 hover:underline flex items-center gap-1">
                            View All Orders
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-left">Order Detail</th>
                                    <th className="px-6 py-4 font-semibold text-left">Customer</th>
                                    <th className="px-6 py-4 font-semibold text-left">Date</th>
                                    <th className="px-6 py-4 font-semibold text-left">Amount</th>
                                    <th className="px-6 py-4 font-semibold text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    // Skeleton Rows
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div></td>
                                            <td className="px-6 py-4"><div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div></td>
                                            <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div></td>
                                            <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-100 rounded animate-pulse"></div></td>
                                            <td className="px-6 py-4"><div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse"></div></td>
                                        </tr>
                                    ))
                                ) : recentOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <Package className="w-10 h-10 text-gray-300" />
                                                <p>No orders yet</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    recentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50/80 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                                                    {order.id}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-900 font-medium">{order.customer}</span>
                                                    <span className="text-xs text-gray-400">{order.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-500 hover:text-gray-700" title={order.fullDate}>
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-sm">{order.date}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-900">
                                                {order.amount}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 border border-green-200' :
                                                        order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                                            order.status === 'In Transit' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                                                'bg-yellow-50 text-yellow-700 border border-yellow-200'
                                                    }
                                                `}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                                                        ${order.status === 'Delivered' ? 'bg-green-500' :
                                                            order.status === 'Processing' ? 'bg-blue-500' :
                                                                order.status === 'In Transit' ? 'bg-purple-500' :
                                                                    'bg-yellow-500'
                                                        }
                                                    `}></span>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
