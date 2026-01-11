"use client";

import { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
    const [productCount, setProductCount] = useState(0);
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [revenue, setRevenue] = useState(0);
    const [customers, setCustomers] = useState(0);

    useEffect(() => {
        // Fetch product count and recent orders
        const fetchData = async () => {
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
                        amount: `₹${o.amount}`,
                        status: o.status,
                        date: new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    }));
                    setRecentOrders(formatted);

                    // 2. Total Revenue (Sum of all orders except Cancelled)
                    const totalRev = dataOrders.orders
                        .filter((o: any) => o.status !== 'Cancelled')
                        .reduce((acc: number, curr: any) => acc + (curr.amount || 0), 0);
                    setRevenue(totalRev);

                    // 3. Active Customers (Unique entries)
                    const uniqueCustomers = new Set(dataOrders.orders.map((o: any) => o.customer.email));
                    setCustomers(uniqueCustomers.size);
                }

            } catch (error) {
                console.error("Failed to fetch dashboard data");
            }
        };
        fetchData();
    }, []);

    const stats = [
        { title: "Total Revenue", value: `₹${revenue.toLocaleString()}`, icon: DollarSign, color: "bg-blue-500" },
        { title: "Total Products", value: productCount, icon: ShoppingBag, color: "bg-purple-500" },
        { title: "Active Customers", value: customers, icon: Users, color: "bg-orange-500" },
        { title: "Growth", value: "+12%", icon: TrendingUp, color: "bg-green-500" }, // Mock for now
    ];

    return (
        <div className="p-4 md:p-8">
            <header className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-sm md:text-base text-gray-500">Welcome back, Admin</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 text-center md:text-left">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${stat.color} flex items-center justify-center text-white shadow-lg shadow-opacity-20 mx-auto md:mx-0`}>
                                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] md:text-sm text-gray-400 font-medium uppercase tracking-wide">{stat.title}</p>
                                <h3 className="text-lg md:text-2xl font-bold text-gray-800">{stat.value}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
                    <button className="text-sm text-[#155E42] font-medium hover:underline">View All</button>
                </div>

                {/* Desktop/Tablet Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="px-6 py-4 font-medium">Order ID</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Amount</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No recent orders found.
                                    </td>
                                </tr>
                            ) : (
                                recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                        <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">{order.date}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{order.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                                        order.status === 'In Transit' ? 'bg-purple-100 text-purple-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                }
                                            `}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-100">
                    {recentOrders.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            No recent orders found.
                        </div>
                    ) : (
                        recentOrders.map((order) => (
                            <div key={order.id} className="p-4 flex flex-col gap-2 relative">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="font-bold text-gray-900 text-sm">{order.id}</span>
                                        <p className="text-xs text-gray-500">{order.date}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase
                                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                                order.status === 'In Transit' ? 'bg-purple-100 text-purple-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                        }
                                    `}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <div className="text-sm text-gray-700">
                                        <span className="text-gray-500 text-xs block">Customer</span>
                                        {order.customer}
                                    </div>
                                    <div className="text-right">
                                        <span className="text-gray-500 text-xs block">Amount</span>
                                        <span className="font-bold text-gray-900">{order.amount}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
