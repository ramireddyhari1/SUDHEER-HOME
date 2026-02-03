'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight, TrendingUp, Key, Clock, LogIn, Users, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Partner {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    partnerCode: string;
    commissionType: 'percentage' | 'fixed';
    commissionValue: number;
    isActive: boolean;
    hasAccess: boolean;
    loginCount: number;
    lastLoginAt?: string;
    totalOrders: number;
    totalSales: number;
    totalCommission: number;
    createdAt: string;
}

export default function PartnersPage() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
    const [password, setPassword] = useState('');
    const [hasAccess, setHasAccess] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        partnerCode: '',
        commissionType: 'percentage',
        commissionValue: 10,
        description: '',
        website: '',
        password: '',
    });

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const res = await fetch('/api/partners');
            const data = await res.json();
            if (data.success) {
                setPartners(data.data);
            }
        } catch (error) {
            console.error('Error fetching partners:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/partners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                alert('Partner created successfully!');
                setShowForm(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    partnerCode: '',
                    commissionType: 'percentage',
                    commissionValue: 10,
                    description: '',
                    website: '',
                    password: '',
                });
                fetchPartners();
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            alert('Failed to create partner');
        }
    };

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/partners/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !currentStatus }),
            });

            if (res.ok) {
                fetchPartners();
            }
        } catch (error) {
            alert('Failed to update partner status');
        }
    };

    const deletePartner = async (id: string) => {
        if (!confirm('Are you sure you want to delete this partner?')) return;

        try {
            const res = await fetch(`/api/partners/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchPartners();
            }
        } catch (error) {
            alert('Failed to delete partner');
        }
    };

    const openPasswordModal = (partner: Partner) => {
        setSelectedPartner(partner);
        setPassword('');
        setHasAccess(true); // Always default to true (grant access) when setting password
        setShowPasswordModal(true);
    };

    const handleSetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedPartner || !password) return;

        try {
            const res = await fetch(`/api/partners/${selectedPartner._id}/set-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, hasAccess }),
            });

            const data = await res.json();

            if (data.success) {
                alert('Password set successfully!');
                setShowPasswordModal(false);
                setPassword('');
                fetchPartners();
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            alert('Failed to set password');
        }
    };

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="p-8">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Partners Management</h1>
                    <p className="text-gray-600 mt-2">Manage your affiliate partners and track their performance</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-[#155E42] text-white px-6 py-3 rounded-lg hover:bg-[#124a35] transition"
                >
                    <Plus size={20} />
                    Add Partner
                </button>
            </div>

            {/* Add Partner Form */}
            {showForm && (
                <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Add New Partner</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Partner Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Partner Code * (Uppercase)
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.partnerCode}
                                onChange={(e) => setFormData({ ...formData, partnerCode: e.target.value.toUpperCase() })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 uppercase"
                                placeholder="e.g., PARTNER01"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email *
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Commission Type
                            </label>
                            <select
                                value={formData.commissionType}
                                onChange={(e) => setFormData({ ...formData, commissionType: e.target.value as 'percentage' | 'fixed' })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            >
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed Amount</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Commission Value
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                value={formData.commissionValue}
                                onChange={(e) => setFormData({ ...formData, commissionValue: parseFloat(e.target.value) })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Website
                            </label>
                            <input
                                type="url"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="https://"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Set Password *
                            </label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="Enter login password for partner"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                rows={3}
                            />
                        </div>

                        <div className="col-span-2 flex gap-3">
                            <button
                                type="submit"
                                className="bg-[#155E42] text-white px-6 py-2 rounded-lg hover:bg-[#124a35]"
                            >
                                Create Partner
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Partners List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Partner
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Code
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Commission
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Performance
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Login Stats
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {partners.map((partner) => (
                            <tr key={partner._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                                        <div className="text-sm text-gray-500">{partner.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-mono rounded-full">
                                        {partner.partnerCode}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {partner.commissionType === 'percentage'
                                        ? `${partner.commissionValue}%`
                                        : `₹${partner.commissionValue}`
                                    }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="text-gray-900">{partner.totalOrders} orders</div>
                                    <div className="text-gray-500">₹{partner.totalSales.toFixed(2)} sales</div>
                                    <div className="text-green-600 font-medium">₹{partner.totalCommission.toFixed(2)} earned</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center gap-1 text-gray-700">
                                        <LogIn size={14} />
                                        <span>{partner.loginCount || 0} logins</span>
                                    </div>
                                    {partner.lastLoginAt && (
                                        <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                                            <Clock size={12} />
                                            <span>{new Date(partner.lastLoginAt).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                    <div className={`text-xs mt-1 ${partner.hasAccess ? 'text-green-600' : 'text-gray-400'}`}>
                                        {partner.hasAccess ? '✓ Has Access' : '✗ No Access'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => toggleStatus(partner._id, partner.isActive)}
                                        className="flex items-center gap-1"
                                    >
                                        {partner.isActive ? (
                                            <span className="flex items-center text-green-600">
                                                <ToggleRight size={20} /> Active
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-gray-400">
                                                <ToggleLeft size={20} /> Inactive
                                            </span>
                                        )}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => openPasswordModal(partner)}
                                            className="p-1.5 text-purple-600 hover:text-purple-900 hover:bg-purple-50 rounded-lg transition-colors"
                                            title="Set Password"
                                        >
                                            <Key size={18} />
                                        </button>
                                        <Link
                                            href={`/admin/partners/${partner._id}`}
                                            className="p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View Details & Control"
                                        >
                                            <Users size={18} />
                                        </Link>
                                        <a
                                            href={`/partners?code=${partner.partnerCode}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 text-emerald-600 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors"
                                            title="View Public Profile"
                                        >
                                            <ExternalLink size={18} />
                                        </a>
                                        <button
                                            onClick={() => deletePartner(partner._id)}
                                            className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Partner"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {partners.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No partners yet. Click "Add Partner" to create your first one.
                    </div>
                )}
            </div>

            {/* Password Modal */}
            {showPasswordModal && selectedPartner && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold mb-4">Set Partner Password</h2>
                        <p className="text-gray-600 mb-4">
                            Setting password for: <strong>{selectedPartner.name}</strong>
                        </p>

                        <form onSubmit={handleSetPassword}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password (min 6 characters)
                                </label>
                                <input
                                    type="password"
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    placeholder="Enter password"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={hasAccess}
                                        onChange={(e) => setHasAccess(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300"
                                    />
                                    <span className="text-sm text-gray-700">Grant login access</span>
                                </label>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#155E42] text-white px-4 py-2 rounded-lg hover:bg-[#124a35] transition"
                                >
                                    Set Password
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
