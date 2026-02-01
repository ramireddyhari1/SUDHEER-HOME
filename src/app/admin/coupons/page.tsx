'use client';

import { useState, useEffect } from "react";
import { Ticket, Send, Loader2, CheckCircle, Smartphone, Mail, History } from "lucide-react";
import { createAndSendCoupon, getCoupons } from "./actions";

export default function CouponsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [recentCoupons, setRecentCoupons] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percentage', // 'percentage' | 'fixed'
        discountValue: '',
        minOrderValue: '',
        expirationDate: '',
        phone: '',
        email: ''
    });

    // Fetch coupons on mount
    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        const coupons = await getCoupons();
        setRecentCoupons(coupons);
    };

    const generateRandomCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData(prev => ({ ...prev, code: "SAVE" + result }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);

        try {
            const res = await createAndSendCoupon({
                code: formData.code,
                discountType: formData.discountType as 'percentage' | 'fixed',
                discountValue: Number(formData.discountValue),
                minOrderValue: formData.minOrderValue ? Number(formData.minOrderValue) : 0,
                expirationDate: formData.expirationDate,
                phone: formData.phone,
                email: formData.email
            });

            setResult(res);
            if (res.success) {
                // reset form partially
                setFormData(prev => ({ ...prev, code: '', phone: '', email: '' }));
                // Refresh list
                fetchCoupons();
            }
        } catch (error: any) {
            console.error(error);
            setResult({ success: false, error: error?.message || "Something went wrong" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-green-100 rounded-lg text-[#155E42]">
                    <Ticket className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-serif font-bold text-[#155E42]">Coupon Management</h1>
                    <p className="text-gray-500">Generate, send, and track discount coupons</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Generation Form */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-[#155E42] mb-4 flex items-center gap-2">
                            <Send className="w-5 h-5" /> Generate New
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Shortened Form Layout for Sidebar Feel */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Coupon Code</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        required
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                        className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-[#155E42] outline-none font-mono uppercase text-sm"
                                        placeholder="CODE123"
                                    />
                                    <button
                                        type="button"
                                        onClick={generateRandomCode}
                                        className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 text-xs font-bold"
                                    >
                                        AUTO
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Type</label>
                                    <select
                                        value={formData.discountType}
                                        onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md text-sm outline-none"
                                    >
                                        <option value="percentage">Percentage %</option>
                                        <option value="fixed">Fixed ₹</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Value</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={formData.discountValue}
                                        onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-md outline-none text-sm"
                                        placeholder="10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Min Order (₹)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.minOrderValue}
                                    onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md outline-none text-sm"
                                    placeholder="Optional"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiry Date</label>
                                <input
                                    type="date"
                                    value={formData.expirationDate}
                                    onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md outline-none text-sm"
                                />
                            </div>

                            <div className="pt-2 border-t mt-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Send To (Optional)</label>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Smartphone className="w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md outline-none text-sm"
                                            placeholder="WhatsApp Number"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md outline-none text-sm"
                                            placeholder="Email Address"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#155E42] hover:bg-green-900 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                {isLoading ? "Sending..." : "Generate & Send"}
                            </button>
                        </form>

                        {/* Results Display */}
                        {result && (
                            <div className={`mt-4 p-3 rounded-lg border text-sm ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                {result.success ? (
                                    <div>
                                        <div className="flex items-center gap-2 text-green-800 font-bold mb-1">
                                            <CheckCircle className="w-4 h-4" />
                                            Sent: {result.coupon}
                                        </div>
                                        <div className="text-green-700 text-xs ml-6">
                                            <p>WA: {result.whatsappSent ? '✅' : '⚪'} | Email: {result.emailSent ? '✅' : '⚪'}</p>
                                            {result.errors.length > 0 && <p className="text-red-600 mt-1">{result.errors[0]}</p>}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-red-700 font-medium">Error: {result.error}</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* History Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <History className="w-5 h-5 text-[#155E42]" /> Recent Coupons
                            </h2>
                            <button onClick={fetchCoupons} className="text-sm text-[#155E42] hover:underline">Refresh</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#f8fafc] text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Code</th>
                                        <th className="px-6 py-4">Discount</th>
                                        <th className="px-6 py-4">Sent To</th>
                                        <th className="px-6 py-4">Usage</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Created</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentCoupons.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                                No coupons generated yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        recentCoupons.map((coupon) => (
                                            <tr key={coupon._id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="font-mono font-medium text-[#155E42] bg-green-50 px-2 py-1 rounded">
                                                        {coupon.code}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                                                    {coupon.minOrderValue > 0 && <span className="text-xs text-gray-400 block">Min: ₹{coupon.minOrderValue}</span>}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {coupon.sentTo ? (
                                                        <div className="max-w-[150px] truncate" title={coupon.sentTo}>
                                                            {coupon.sentTo}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-300 italic">Manual</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {coupon.usedCount}
                                                    {coupon.usageLimit && <span className="text-gray-400">/{coupon.usageLimit}</span>}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {coupon.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-gray-500">
                                                    {new Date(coupon.createdAt).toLocaleDateString()}
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
        </div>
    );
}
