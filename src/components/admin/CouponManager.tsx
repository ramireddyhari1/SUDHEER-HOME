"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X, Tag } from 'lucide-react';

interface Coupon {
    _id: string;
    code: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    minOrderValue: number;
    isActive: boolean;
    usedCount: number;
}

export default function CouponManager() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        minOrderValue: ''
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const res = await fetch('/api/admin/coupons');
            const data = await res.json();
            if (data.success) {
                setCoupons(data.coupons);
            }
        } catch (error) {
            console.error('Failed to fetch coupons', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        try {
            const res = await fetch('/api/admin/coupons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    discountValue: Number(formData.discountValue),
                    minOrderValue: Number(formData.minOrderValue) || 0
                })
            });

            const data = await res.json();

            if (data.success) {
                setMessage({ text: 'Coupon created successfully!', type: 'success' });
                setShowForm(false);
                setFormData({ code: '', discountType: 'percentage', discountValue: '', minOrderValue: '' });
                fetchCoupons();
            } else {
                setMessage({ text: data.error || 'Failed to create coupon', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'An error occurred', type: 'error' });
        }
    };

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/admin/coupons/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !currentStatus })
            });
            if (res.ok) fetchCoupons();
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const deleteCoupon = async (id: string) => {
        if (!confirm('Are you sure you want to delete this coupon?')) return;
        try {
            const res = await fetch(`/api/admin/coupons/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) fetchCoupons();
        } catch (error) {
            console.error('Failed to delete coupon', error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Tag className="w-5 h-5 text-primary" /> Coupon Management
                    </h2>
                    <p className="text-sm text-gray-500">Manage discount codes and promotions</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" /> {showForm ? 'Cancel' : 'Add Coupon'}
                </button>
            </div>

            {message && (
                <div className={`p-4 mb-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                            <input
                                type="text"
                                required
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none uppercase"
                                placeholder="SUMMER20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                            <select
                                value={formData.discountType}
                                onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed Amount (₹)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.discountValue}
                                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder={formData.discountType === 'percentage' ? "20" : "100"}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Min Order (₹)</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.minOrderValue}
                                onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Create Coupon
                        </button>
                    </div>
                </form>
            )}

            {loading ? (
                <div className="text-center py-10">Loading coupons...</div>
            ) : coupons.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No coupons found. Create your first one!</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 text-sm text-gray-600">
                                <th className="py-3 px-4">Code</th>
                                <th className="py-3 px-4">Discount</th>
                                <th className="py-3 px-4">Min Order</th>
                                <th className="py-3 px-4">Usage</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((coupon) => (
                                <tr key={coupon._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4 font-bold text-gray-800">{coupon.code}</td>
                                    <td className="py-3 px-4">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                            {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">
                                        {coupon.minOrderValue > 0 ? `₹${coupon.minOrderValue}` : 'None'}
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">{coupon.usedCount} times</td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => toggleStatus(coupon._id, coupon.isActive)}
                                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${coupon.isActive
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {coupon.isActive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                            {coupon.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <button
                                            onClick={() => deleteCoupon(coupon._id)}
                                            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                                            title="Delete Coupon"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
