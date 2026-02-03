'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Save, Trash2, TrendingUp, DollarSign, ShoppingBag, Users, Wallet } from 'lucide-react';
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
    website?: string;
    description?: string;
    payoutDetails?: {
        upiId?: string;
        bankDetails?: {
            accountHolder: string;
            accountNumber: string;
            ifscCode: string;
            bankName: string;
        };
    };
    createdAt: string;
}

export default function PartnerDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [partner, setPartner] = useState<Partner | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<Partial<Partner>>({});

    useEffect(() => {
        if (params.id) {
            fetchPartner(params.id as string);
        }
    }, [params.id]);

    const fetchPartner = async (id: string) => {
        try {
            const res = await fetch(`/api/partners/${id}`);
            const data = await res.json();
            if (data.success) {
                setPartner(data.data);
                setEditData(data.data);
            } else {
                setError(data.error || 'Partner not found');
            }
        } catch (err) {
            setError('Failed to fetch partner details');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const res = await fetch(`/api/partners/${partner?._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData)
            });
            const data = await res.json();
            if (data.success) {
                setPartner(data.data);
                setIsEditing(false);
                alert('Partner details updated successfully');
            } else {
                alert(data.error || 'Failed to update partner');
            }
        } catch (err) {
            alert('Error updating partner');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleToggleStatus = async (field: 'isActive' | 'hasAccess') => {
        if (!partner) return;
        setIsUpdating(true);
        try {
            const res = await fetch(`/api/partners/${partner._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [field]: !partner[field] })
            });
            const data = await res.json();
            if (data.success) {
                const updatedPartner = { ...partner, [field]: !partner[field] };
                setPartner(updatedPartner);
                setEditData(updatedPartner);
            }
        } catch (err) {
            alert('Failed to update status');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!partner || !confirm('Are you sure you want to delete this partner? This cannot be undone.')) return;
        try {
            const res = await fetch(`/api/partners/${partner._id}`, { method: 'DELETE' });
            if (res.ok) router.push('/admin/partners');
        } catch (err) {
            alert('Failed to delete partner');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
    );

    if (error || !partner) return (
        <div className="p-8 text-center bg-gray-50 min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-red-600 mb-6">{error || 'Partner not found'}</p>
            <Link href="/admin/partners" className="text-emerald-600 font-bold hover:underline">Back to List</Link>
        </div>
    );

    return (
        <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
            <div className="mb-8">
                <Link href="/admin/partners" className="group inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-all">
                    <div className="p-1.5 bg-white rounded-lg border border-gray-200 group-hover:border-gray-400 transition-all">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="font-semibold text-sm">Back to Partners</span>
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-black text-gray-900">{partner.name}</h1>
                            <div className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black uppercase tracking-widest">{partner.partnerCode}</div>
                        </div>
                        <p className="text-gray-500 font-medium">{partner.email}</p>
                    </div>
                    <div className="flex gap-3">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-6 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold shadow-sm hover:border-gray-400 transition-all active:scale-95"
                            >
                                <Edit size={18} />
                                Edit Partner
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-bold transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            disabled={isUpdating}
                            onClick={() => handleToggleStatus('isActive')}
                            className={`px-6 py-2.5 rounded-xl font-bold shadow-sm transition-all active:scale-95 ${partner.isActive ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}
                        >
                            {partner.isActive ? 'Suspend' : 'Activate'}
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-2.5 bg-white text-gray-400 hover:text-red-600 border border-gray-200 hover:border-red-100 rounded-xl transition-all"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {isEditing ? (
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-12 animate-fadeInUp">
                    <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-6">
                        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-black">
                            <Edit size={20} />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Modify Partner Configuration</h2>
                    </div>
                    <form onSubmit={handleUpdate} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Legal Name</label>
                                <input
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                    type="text"
                                    value={editData.name || ''}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                    type="email"
                                    value={editData.email || ''}
                                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unique Partner Code</label>
                                <input
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-black focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none uppercase"
                                    type="text"
                                    value={editData.partnerCode || ''}
                                    onChange={(e) => setEditData({ ...editData, partnerCode: e.target.value.toUpperCase() })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                <input
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                    type="text"
                                    value={editData.phone || ''}
                                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Commission Structure</label>
                                <select
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                    value={editData.commissionType}
                                    onChange={(e) => setEditData({ ...editData, commissionType: e.target.value as any })}
                                >
                                    <option value="percentage">Percentage (%)</option>
                                    <option value="fixed">Fixed Amount (₹)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Commission Value ({editData.commissionType === 'percentage' ? '%' : '₹'})</label>
                                <input
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-black focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                    type="number"
                                    value={editData.commissionValue || 0}
                                    onChange={(e) => setEditData({ ...editData, commissionValue: parseFloat(e.target.value) })}
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description / Bio</label>
                                <textarea
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                    rows={4}
                                    value={editData.description || ''}
                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-gray-900/20 transition-all hover:bg-black active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {isUpdating ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><Save size={20} /> Update Partner Profile</>}
                        </button>
                    </form>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Stats */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Total Revenue', value: `₹${partner.totalSales.toFixed(2)}`, icon: DollarSign, color: 'emerald' },
                                { label: 'Partner Commission', value: `₹${partner.totalCommission.toFixed(2)}`, icon: TrendingUp, color: 'blue', sub: partner.commissionType === 'percentage' ? `${partner.commissionValue}% / Sale` : `₹${partner.commissionValue} / Sale` },
                                { label: 'Successful Orders', value: partner.totalOrders, icon: ShoppingBag, color: 'purple' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl`}>
                                            <stat.icon size={24} />
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</span>
                                    </div>
                                    <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                                    {stat.sub && <div className="text-xs font-bold text-gray-400 italic">{stat.sub}</div>}
                                </div>
                            ))}
                        </div>

                        {/* Login Info Card */}
                        <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    <Users size={20} className="text-emerald-400" />
                                    Account Access
                                </h3>
                                <div className="flex items-center justify-between mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div>
                                        <div className="text-xs font-bold text-white/50 uppercase mb-1">Status</div>
                                        <div className="font-bold flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${partner.hasAccess ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-red-400'}`}></div>
                                            {partner.hasAccess ? 'Access Enabled' : 'Access Denied'}
                                        </div>
                                    </div>
                                    <button
                                        disabled={isUpdating}
                                        onClick={() => handleToggleStatus('hasAccess')}
                                        className="px-4 py-2 bg-emerald-500 text-gray-900 rounded-xl font-bold text-xs transition-all hover:bg-emerald-400 active:scale-95"
                                    >
                                        {partner.hasAccess ? 'Disable' : 'Enable'}
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/5 rounded-2xl">
                                        <div className="text-xs font-bold text-white/50 uppercase mb-1">Total Logins</div>
                                        <div className="text-2xl font-black">{partner.loginCount}</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl">
                                        <div className="text-xs font-bold text-white/50 uppercase mb-1">Last Seen</div>
                                        <div className="text-sm font-bold truncate">{partner.lastLoginAt ? new Date(partner.lastLoginAt).toLocaleDateString() : 'Never'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Payout Details Section */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-fit transition-all hover:shadow-md">
                            <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                                <Wallet size={20} className="text-emerald-600" />
                                <h3 className="font-bold text-gray-900 uppercase text-sm tracking-tighter">Payout & Banking Details</h3>
                            </div>
                            <div className="p-8 space-y-8">
                                {/* UPI */}
                                <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">UPI ID</h4>
                                    </div>
                                    <div className="text-lg font-black text-emerald-900">{partner.payoutDetails?.upiId || 'Not Configured'}</div>
                                </div>

                                {/* Bank Details */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bank Account Information</h4>
                                    </div>
                                    {partner.payoutDetails?.bankDetails ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <DetailItem label="Account Holder" value={partner.payoutDetails.bankDetails.accountHolder} />
                                            <DetailItem label="Account Number" value={partner.payoutDetails.bankDetails.accountNumber} />
                                            <DetailItem label="IFSC Code" value={partner.payoutDetails.bankDetails.ifscCode} />
                                            <DetailItem label="Bank Name" value={partner.payoutDetails.bankDetails.bankName} />
                                        </div>
                                    ) : (
                                        <div className="py-12 bg-gray-50 rounded-2xl text-center border-2 border-dashed border-gray-100">
                                            <p className="text-xs font-bold text-gray-400 uppercase">No Bank details linked</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* General Information Section */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-fit transition-all hover:shadow-md">
                            <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                                <Users size={20} className="text-blue-600" />
                                <h3 className="font-bold text-gray-900 uppercase text-sm tracking-tighter">Partner Profile</h3>
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <DetailItem label="Phone" value={partner.phone || 'N/A'} />
                                    <DetailItem label="Website" value={partner.website || 'N/A'} link={partner.website} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">About Partner</label>
                                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-sm text-gray-700 leading-relaxed italic">
                                        "{partner.description || 'No description provided.'}"
                                    </div>
                                </div>
                                <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                                    <div className="text-[10px] font-bold text-gray-400 uppercase">Joined On</div>
                                    <div className="text-xs font-black text-gray-900">{new Date(partner.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function DetailItem({ label, value, link }: { label: string, value: string, link?: string }) {
    return (
        <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">{label}</label>
            {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                    {value}
                </a>
            ) : (
                <div className="text-sm font-black text-gray-900">{value}</div>
            )}
        </div>
    );
}
