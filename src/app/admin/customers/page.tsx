"use client";

import { useEffect, useState } from "react";
import { Users, Search, Mail, Phone, MapPin } from "lucide-react";

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
}

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await fetch('/api/customers');
                const data = await res.json();
                if (data.success) {
                    setCustomers(data.customers);
                }
            } catch (error) {
                console.error("Failed to load customers");
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone?.includes(searchTerm)
    );

    return (
        <div className="p-4 md:p-8">
            <header className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Customers</h1>
                    <p className="text-sm text-gray-500">View customer details and history ({customers.length})</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full md:w-64 focus:ring-2 focus:ring-[#155E42] outline-none"
                    />
                </div>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading customers...</div>
                ) : customers.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <p>No customers found.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Customer</th>
                                        <th className="px-6 py-4 font-medium">Contact</th>
                                        <th className="px-6 py-4 font-medium">Location</th>
                                        <th className="px-6 py-4 font-medium text-center">Orders</th>
                                        <th className="px-6 py-4 font-medium text-right">Total Spent</th>
                                        <th className="px-6 py-4 font-medium">Last Active</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredCustomers.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{customer.name}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 flex items-center gap-2">
                                                    <Mail className="w-3 h-3 text-gray-400" /> {customer.email || '-'}
                                                </div>
                                                <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                                                    <Phone className="w-3 h-3 text-gray-400" /> {customer.phone || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {customer.city || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">
                                                    {customer.totalOrders}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-[#155E42]">
                                                ₹{customer.totalSpent.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(customer.lastOrderDate).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile List View */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {filteredCustomers.map((customer) => (
                                <div key={customer.id} className="p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900">{customer.name}</h3>
                                            {customer.city && (
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <MapPin className="w-3 h-3" /> {customer.city}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-[#155E42]">₹{customer.totalSpent.toLocaleString()}</div>
                                            <div className="text-[10px] text-gray-400">{customer.totalOrders} Orders</div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2">
                                        {customer.email && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span className="truncate">{customer.email}</span>
                                            </div>
                                        )}
                                        {customer.phone && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                {customer.phone}
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-xs text-center text-gray-400">
                                        Last Active: {new Date(customer.lastOrderDate).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
