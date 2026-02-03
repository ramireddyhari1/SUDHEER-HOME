'use client';

import { useState, useEffect } from 'react';
import {
    CheckCircle, XCircle, Clock, DollarSign, Wallet,
    ArrowLeft, ExternalLink, MessageSquare, CreditCard
} from 'lucide-react';
import Link from 'next/link';

interface PayoutRequest {
    _id: string;
    partnerId: {
        _id: string;
        name: string;
        email: string;
        partnerCode: string;
    };
    amount: number;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Paid';
    payoutMethod: 'UPI' | 'Bank';
    payoutDetails: {
        upiId?: string;
        bankDetails?: {
            accountHolder: string;
            accountNumber: string;
            ifscCode: string;
            bankName: string;
        };
    };
    adminNotes?: string;
    paidAt?: string;
    createdAt: string;
}

export default function AdminPayoutsPage() {
    const [requests, setRequests] = useState<PayoutRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await fetch('/api/admin/payouts');
            const data = await res.json();
            if (data.success) {
                setRequests(data.data);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        const adminNotes = window.prompt('Add administrative notes (optional):') || '';
        setUpdatingId(id);
        try {
            const res = await fetch('/api/admin/payouts', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status, adminNotes })
            });
            const data = await res.json();
            if (data.success) {
                fetchRequests();
            } else {
                alert(data.error || 'Failed to update status');
            }
        } catch (error) {
            alert('Error updating status');
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2 italic">Payout Requests</h1>
                    <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Manage partner withdrawal requests and process payments</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <Clock size={20} />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-gray-400 uppercase">Pending</div>
                            <div className="text-xl font-black text-gray-900">{requests.filter(r => r.status === 'Pending').length}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Partner</th>
                            <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                            <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Method & Details</th>
                            <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center">
                                        <Wallet className="text-gray-200 mb-4" size={48} />
                                        <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">No payout requests found</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            requests.map((request) => (
                                <tr key={request._id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-gray-900">{request.partnerId.name}</span>
                                            <span className="text-[10px] font-bold text-emerald-600 uppercase mt-0.5">{request.partnerId.partnerCode}</span>
                                            <span className="text-[10px] text-gray-400 font-medium">{request.partnerId.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-lg font-black text-gray-900">₹{request.amount.toLocaleString()}</div>
                                        <div className="text-[10px] text-gray-400 font-medium">Requested {new Date(request.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            {request.payoutMethod === 'UPI' ? (
                                                <div className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-black uppercase tracking-tighter">UPI</div>
                                            ) : (
                                                <div className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-[10px] font-black uppercase tracking-tighter">Bank</div>
                                            )}
                                        </div>
                                        <div className="text-xs font-bold text-gray-700">
                                            {request.payoutMethod === 'UPI' ? (
                                                request.payoutDetails.upiId
                                            ) : (
                                                <div className="space-y-0.5">
                                                    <div>{request.payoutDetails.bankDetails?.accountHolder}</div>
                                                    <div className="text-[10px] text-gray-500">{request.payoutDetails.bankDetails?.accountNumber} ({request.payoutDetails.bankDetails?.ifscCode})</div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border ${request.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                request.status === 'Approved' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    request.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                                                        'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'
                                            }`}>
                                            {request.status}
                                        </span>
                                        {request.adminNotes && (
                                            <div className="text-[10px] text-gray-400 italic mt-1 max-w-[150px] truncate" title={request.adminNotes}>
                                                "{request.adminNotes}"
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {request.status === 'Pending' && (
                                                <>
                                                    <button
                                                        disabled={updatingId === request._id}
                                                        onClick={() => handleUpdateStatus(request._id, 'Approved')}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle size={20} />
                                                    </button>
                                                    <button
                                                        disabled={updatingId === request._id}
                                                        onClick={() => handleUpdateStatus(request._id, 'Rejected')}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                        title="Reject"
                                                    >
                                                        <XCircle size={20} />
                                                    </button>
                                                </>
                                            )}
                                            {(request.status === 'Approved' || request.status === 'Pending') && (
                                                <button
                                                    disabled={updatingId === request._id}
                                                    onClick={() => handleUpdateStatus(request._id, 'Paid')}
                                                    className="px-4 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                                                >
                                                    Mark as Paid
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
