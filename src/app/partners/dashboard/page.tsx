'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, DollarSign, ShoppingCart, LogOut, Calendar, Activity, LayoutDashboard, Wallet, CreditCard, Save, CheckCircle } from 'lucide-react';

interface PartnerData {
    id: string;
    name: string;
    email: string;
    partnerCode: string;
    commissionType: string;
    commissionValue: number;
}

interface Stats {
    totalOrders: number;
    totalSales: number;
    totalCommission: number;
    recentOrders: Array<{
        orderId: string;
        amount: number;
        commission: number;
        date: string;
        status: string;
    }>;
    monthlyStats: {
        ordersThisMonth: number;
        salesThisMonth: number;
        commissionThisMonth: number;
    };
}

interface PayoutDetails {
    upiId: string;
    bankDetails: {
        accountHolder: string;
        accountNumber: string;
        ifscCode: string;
        bankName: string;
    } | null;
}

export default function PartnerDashboard() {
    const router = useRouter();
    const [partner, setPartner] = useState<PartnerData | null>(null);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'payouts'>('overview');
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [payoutDetails, setPayoutDetails] = useState<PayoutDetails>({
        upiId: '',
        bankDetails: {
            accountHolder: '',
            accountNumber: '',
            ifscCode: '',
            bankName: '',
        }
    });
    const [payoutMethod, setPayoutMethod] = useState<'UPI' | 'Bank'>('UPI');
    const [payoutHistory, setPayoutHistory] = useState<any[]>([]);
    const [isRequesting, setIsRequesting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('partnerToken');
        if (!token) {
            router.push('/partners/login');
            return;
        }
        fetchPartnerData(token);
        fetchPayoutDetails(token);
        fetchPayoutHistory(token);
    }, [router]);

    const fetchPartnerData = async (token: string) => {
        try {
            const res = await fetch('/api/partners/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setPartner(data.data); // Correctly set partner data
                fetchStats(data.data.id, token); // Fetch stats using the fetched partner ID
            } else {
                // If partner data fetch fails, log out
                localStorage.removeItem('partnerToken');
                localStorage.removeItem('partnerData');
                router.push('/partners/login');
            }
        } catch (err) {
            console.error('Failed to fetch partner data:', err);
            // Also log out on error
            localStorage.removeItem('partnerToken');
            localStorage.removeItem('partnerData');
            router.push('/partners/login');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async (partnerId: string, token: string) => {
        try {
            const res = await fetch(`/api/partners/${partnerId}/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (data.success) {
                setStats(data.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchPayoutDetails = async (token: string) => {
        try {
            const res = await fetch('/api/partners/payout', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success && data.data) {
                setPayoutDetails({
                    upiId: data.data.upiId || '',
                    bankDetails: data.data.bankDetails || {
                        accountHolder: '',
                        accountNumber: '',
                        ifscCode: '',
                        bankName: '',
                    }
                });
                if (data.data.upiId) setPayoutMethod('UPI');
                else if (data.data.bankDetails?.accountNumber) setPayoutMethod('Bank');
            }
        } catch (err) {
            console.error('Failed to fetch payout details:', err);
        }
    };

    const fetchPayoutHistory = async (token: string) => {
        try {
            const res = await fetch('/api/partners/payout/request', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setPayoutHistory(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch payout history:', err);
        }
    };

    const handleSavePayoutDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveSuccess(false);
        try {
            const token = localStorage.getItem('partnerToken');
            const res = await fetch('/api/partners/payout', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payoutDetails)
            });
            const data = await res.json();
            if (data.success) {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
            } else {
                alert(data.error || 'Failed to save payout details');
            }
        } catch (err) {
            alert('Failed to save details');
        } finally {
            setIsSaving(false);
        }
    };

    const handleRequestWithdrawal = async () => {
        if (!stats || stats.totalCommission < 500) {
            alert('Minimum withdrawal amount is ₹500.');
            return;
        }

        const confirmReq = window.confirm(`Request withdrawal of ₹${stats.totalCommission.toFixed(2)} via ${payoutMethod}?`);
        if (!confirmReq) return;

        setIsRequesting(true);
        try {
            const token = localStorage.getItem('partnerToken');
            const res = await fetch('/api/partners/payout/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: stats.totalCommission,
                    payoutMethod: payoutMethod
                })
            });
            const data = await res.json();
            if (data.success) {
                alert('Withdrawal request submitted successfully!');
                fetchPayoutHistory(token!);
                // Optionally, refresh stats to reflect the withdrawal
                if (partner) fetchStats(partner.id, token!);
            } else {
                alert(data.error || 'Failed to submit request');
            }
        } catch (err) {
            alert('Error submitting request');
        } finally {
            setIsRequesting(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('partnerToken');
        localStorage.removeItem('partnerData');
        router.push('/partners/login');
    };

    if (loading || !partner) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#155E42]"></div>
                    <div className="text-lg text-gray-600 font-medium">Loading your dashboard...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 font-serif">Partner Dashboard</h1>
                            <p className="text-gray-500 text-sm mt-0.5">Welcome back, {partner.name}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tab Navigation */}
                <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit shadow-inner">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'overview'
                            ? 'bg-white text-[#155E42] shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <LayoutDashboard size={18} />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('payouts')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'payouts'
                            ? 'bg-white text-[#155E42] shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Wallet size={18} />
                        Payout Details
                    </button>
                </div>

                {activeTab === 'overview' ? (
                    <>
                        {/* Partner Info Card */}
                        <div className="bg-gradient-to-br from-[#155E42] via-[#1a7a52] to-[#155E42] rounded-2xl shadow-xl p-8 text-white mb-8 border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <DollarSign size={120} />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div>
                                    <div className="flex items-center gap-2 text-green-100/80 text-sm font-medium mb-1 uppercase tracking-wider">
                                        <Activity size={14} />
                                        <span>Active Partner Code</span>
                                    </div>
                                    <div className="text-4xl lg:text-5xl font-black mb-3 tracking-tight font-mono">{partner.partnerCode}</div>
                                    <div className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm border border-white/10">
                                        Earn {partner.commissionType === 'percentage' ? `${partner.commissionValue}%` : `₹${partner.commissionValue}`} per order
                                    </div>
                                </div>
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 min-w-[200px]">
                                    <div className="text-xs text-green-100/70 font-medium uppercase mb-1">Total Earnings</div>
                                    <div className="text-3xl font-bold">₹{stats?.totalCommission.toFixed(2) || '0.00'}</div>
                                    <div className="text-xs text-green-100/50 mt-1">Lifetime Commission</div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Total Orders */}
                            <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md p-6 border border-gray-100 transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                                        <ShoppingCart size={24} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Orders</span>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">{stats?.totalOrders || 0}</div>
                                <div className="flex items-center gap-1.5 text-sm">
                                    <span className="text-blue-600 font-semibold">{stats?.monthlyStats.ordersThisMonth || 0}</span>
                                    <span className="text-gray-500 italic">new this month</span>
                                </div>
                            </div>

                            {/* Total Sales */}
                            <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md p-6 border border-gray-100 transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                                        <TrendingUp size={24} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sales</span>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">₹{stats?.totalSales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                                <div className="flex items-center gap-1.5 text-sm">
                                    <span className="text-emerald-600 font-semibold">₹{stats?.monthlyStats.salesThisMonth.toFixed(2)}</span>
                                    <span className="text-gray-500 italic">this month</span>
                                </div>
                            </div>

                            {/* Monthly Commission */}
                            <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md p-6 border border-gray-100 transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                                        <DollarSign size={24} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Monthly</span>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">₹{stats?.monthlyStats.commissionThisMonth.toFixed(2)}</div>
                                <div className="flex items-center gap-1.5 text-sm text-gray-500 italic">
                                    Share your code to earn more!
                                </div>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h2 className="text-lg font-bold text-gray-900">Recent Conversions</h2>
                                <div className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                                    Showing last 10 orders
                                </div>
                            </div>

                            {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                                <div className="overflow-x-auto p-4">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Order Details</th>
                                                <th className="px-6 py-4 text-center">Amount</th>
                                                <th className="px-6 py-4 text-right">Commission</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {stats.recentOrders.map((order: any) => (
                                                <tr key={order.orderId} className="group hover:bg-gray-50/80 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-amber-100 text-amber-800'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-bold text-gray-900 mb-0.5">#{order.orderId}</div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                                            <Calendar size={10} />
                                                            {new Date(order.date).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center font-medium text-gray-700">₹{order.amount.toFixed(2)}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="text-sm font-black text-emerald-600">₹{order.commission.toFixed(2)}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="px-8 py-20 text-center bg-gray-50/30">
                                    <div className="w-20 h-20 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <ShoppingCart className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">No Orders Recorded</h3>
                                    <p className="text-gray-500 text-sm max-w-xs mx-auto">
                                        Share your unique partner code with your audience to start earning commissions!
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeInUp">
                            {/* Payout Information Form */}
                            <div className="space-y-8">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                            <Wallet size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Payment Settings</h2>
                                            <p className="text-gray-500 text-sm">Where should we send your commissions?</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        {/* Method Selection */}
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Settlement Method</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { id: 'UPI', label: 'UPI ID', icon: Wallet },
                                                    { id: 'Bank', label: 'Bank Transfer', icon: CreditCard }
                                                ].map((method) => (
                                                    <button
                                                        key={method.id}
                                                        type="button"
                                                        onClick={() => setPayoutMethod(method.id as any)}
                                                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold ${payoutMethod === method.id
                                                            ? 'border-emerald-500 bg-emerald-50/30 text-emerald-900'
                                                            : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                                                            }`}
                                                    >
                                                        <method.icon size={20} />
                                                        {method.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <form onSubmit={handleSavePayoutDetails} className="space-y-6">
                                            {payoutMethod === 'UPI' ? (
                                                <div className="space-y-2 animate-fadeInUp">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unified Payments Interface (UPI) ID</label>
                                                    <input
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                                        placeholder="e.g. yourname@okaxis"
                                                        value={payoutDetails.upiId}
                                                        onChange={(e) => setPayoutDetails({ ...payoutDetails, upiId: e.target.value })}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeInUp">
                                                    <div className="md:col-span-2 space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Account Holder Name</label>
                                                        <input
                                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                                            value={payoutDetails.bankDetails?.accountHolder || ''}
                                                            onChange={(e) => setPayoutDetails({
                                                                ...payoutDetails,
                                                                bankDetails: { ...(payoutDetails.bankDetails || { accountNumber: '', ifscCode: '', bankName: '' }), accountHolder: e.target.value }
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bank Name</label>
                                                        <input
                                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                                            value={payoutDetails.bankDetails?.bankName || ''}
                                                            onChange={(e) => setPayoutDetails({
                                                                ...payoutDetails,
                                                                bankDetails: { ...(payoutDetails.bankDetails || { accountHolder: '', ifscCode: '', accountNumber: '' }), bankName: e.target.value }
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">IFSC Code</label>
                                                        <input
                                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                                            value={payoutDetails.bankDetails?.ifscCode || ''}
                                                            onChange={(e) => setPayoutDetails({
                                                                ...payoutDetails,
                                                                bankDetails: { ...(payoutDetails.bankDetails || { accountHolder: '', accountNumber: '', bankName: '' }), ifscCode: e.target.value }
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2 space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Account Number</label>
                                                        <input
                                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                                            value={payoutDetails.bankDetails?.accountNumber || ''}
                                                            onChange={(e) => setPayoutDetails({
                                                                ...payoutDetails,
                                                                bankDetails: { ...(payoutDetails.bankDetails || { accountHolder: '', ifscCode: '', bankName: '' }), accountNumber: e.target.value }
                                                            })}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={isSaving}
                                                className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-50"
                                            >
                                                {isSaving ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                        <span>Updating Profile...</span>
                                                    </div>
                                                ) : saveSuccess ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <CheckCircle size={20} />
                                                        <span>Configuration Saved</span>
                                                    </div>
                                                ) : 'Update Payout Profile'}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Payout History Table */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                                    <h3 className="font-black text-emerald-900 uppercase text-sm tracking-tighter">Settlement History</h3>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">{payoutHistory.length} Total Requests</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase">Date</th>
                                                <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase">Amount</th>
                                                <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {payoutHistory.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3} className="px-8 py-10 text-center text-xs font-bold text-gray-400 italic">No history available</td>
                                                </tr>
                                            ) : (
                                                payoutHistory.map((req, i) => (
                                                    <tr key={i}>
                                                        <td className="px-8 py-4 text-xs font-bold text-gray-600 truncate">{new Date(req.createdAt).toLocaleDateString()}</td>
                                                        <td className="px-8 py-4 text-xs font-black text-gray-900">₹{req.amount}</td>
                                                        <td className="px-8 py-4">
                                                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${req.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                                req.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                                                    'bg-amber-50 text-amber-600 border-amber-100'
                                                                }`}>
                                                                {req.status}
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

                        {/* Payout Policy/Info */}
                        <div className="space-y-6">
                            <div className="bg-emerald-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden h-fit">
                                <div className="relative z-10">
                                    <div className="mb-10">
                                        <div className="text-emerald-400/80 font-black uppercase text-[10px] tracking-[0.2em] mb-4">Available for Settlement</div>
                                        <div className="text-7xl font-black italic tracking-tighter">
                                            ₹{stats?.totalCommission.toFixed(2) || '0.00'}
                                        </div>
                                    </div>

                                    <div className="space-y-6 mb-10">
                                        <div className="flex items-center gap-4 text-sm font-bold text-emerald-100/80">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                            Minimum Payout: ₹500
                                        </div>
                                        <div className="flex items-center gap-4 text-sm font-bold text-emerald-100/80">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                            Settlement Time: 2-3 Business Days
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleRequestWithdrawal}
                                        disabled={isRequesting || (stats?.totalCommission || 0) < 500}
                                        className={`w-full py-6 rounded-3xl text-sm font-black uppercase tracking-widest transition-all shadow-2xl ${(stats?.totalCommission || 0) < 500
                                            ? 'bg-emerald-800/50 text-emerald-700 cursor-not-allowed border border-emerald-800'
                                            : 'bg-emerald-400 text-emerald-950 hover:bg-white hover:scale-[1.02] shadow-emerald-400/20 active:scale-95'
                                            }`}
                                    >
                                        {isRequesting ? 'Processing Request...' : (stats?.totalCommission || 0) < 500 ? 'Minimum ₹500 Required' : 'Request Instant Settlement'}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Activity size={80} />
                                </div>
                                <h3 className="text-lg font-bold mb-2 relative z-10">Need Assistance?</h3>
                                <p className="text-gray-400 text-sm mb-6 relative z-10">
                                    For any payout related queries or issues, please contact our support team.
                                </p>
                                <a href="mailto:support@sweet.com" className="inline-flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-white/20 transition-all px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                    Contact Support
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
