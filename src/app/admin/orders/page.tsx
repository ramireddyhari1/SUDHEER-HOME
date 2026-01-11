"use client";

import { useEffect, useState } from "react";
import { Package, X, Truck, MapPin, CreditCard, Calendar } from "lucide-react";

interface Order {
    _id: string;
    orderId: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
    };
    items: Array<{
        name: string;
        quantity: number;
        price: number;
        image: string;
    }>;
    amount: number;
    status: string;
    paymentMethod: string;
    trackingNumber?: string;
    date: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [trackingInput, setTrackingInput] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            const data = await res.json();
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (orderId: string, newStatus: string) => {
        try {
            // Optimistic update
            setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
            if (selectedOrder && selectedOrder.orderId === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }

            await fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, status: newStatus })
            });
        } catch (err) {
            alert("Failed to update status");
            fetchOrders(); // Revert
        }
    };

    const handleSaveTracking = async () => {
        if (!selectedOrder) return;
        setUpdating(true);
        try {
            const res = await fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: selectedOrder.orderId,
                    trackingNumber: trackingInput
                })
            });

            if (res.ok) {
                // Update local state
                setOrders(prev => prev.map(o => o.orderId === selectedOrder.orderId ? { ...o, trackingNumber: trackingInput } : o));
                setSelectedOrder({ ...selectedOrder, trackingNumber: trackingInput });
                alert("Tracking number saved & email sent!");
            }
        } catch (error) {
            alert("Failed to save tracking");
        } finally {
            setUpdating(false);
        }
    };

    const openOrderDetails = (order: Order) => {
        setSelectedOrder(order);
        setTrackingInput(order.trackingNumber || "");
    };

    return (
        <div className="p-4 md:p-8">
            <header className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Orders</h1>
                <p className="text-sm md:text-base text-gray-500">Track and manage customer orders</p>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <p>No orders placed yet.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Order ID</th>
                                        <th className="px-6 py-4 font-medium">Customer</th>
                                        <th className="px-6 py-4 font-medium">Date</th>
                                        <th className="px-6 py-4 font-medium">Amount</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{order.orderId}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{order.customer.name}</div>
                                                <div className="text-xs text-gray-500">{order.customer.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                {new Date(order.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">₹{order.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                    }
                                                `}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => openOrderDetails(order)}
                                                    className="text-[#155E42] font-bold text-sm hover:underline"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile List */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="p-4 active:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => openOrderDetails(order)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className="font-bold text-gray-900">#{order.orderId}</span>
                                            <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase
                                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }
                                        `}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">
                                            <p className="font-medium text-gray-800">{order.customer.name}</p>
                                            <p className="text-xs text-gray-500">{order.items.length} Items</p>
                                        </div>
                                        <span className="font-bold text-gray-900">₹{order.amount}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 md:p-6 opacity-100 transition-opacity">
                    <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">

                        {/* Modal Header */}
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <div>
                                <h2 className="font-bold text-lg md:text-xl">Order #{selectedOrder.orderId}</h2>
                                <p className="text-xs text-gray-500">Placed on {new Date(selectedOrder.date).toLocaleDateString()}</p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 hover:bg-gray-200 rounded-full"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">

                            {/* Status & Tracking */}
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-blue-800 uppercase mb-2">Order Status</label>
                                    <select
                                        value={selectedOrder.status}
                                        onChange={(e) => handleUpdateStatus(selectedOrder.orderId, e.target.value)}
                                        className="w-full bg-white border border-blue-200 rounded-md px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-blue-800 uppercase mb-2 flex items-center gap-2">
                                        <Truck className="w-3 h-3" /> Tracking Number
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={trackingInput}
                                            onChange={(e) => setTrackingInput(e.target.value)}
                                            placeholder="Enter AWB / Tracking ID"
                                            className="flex-1 bg-white border border-blue-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                        <button
                                            onClick={handleSaveTracking}
                                            disabled={updating}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {updating ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-blue-600 mt-1">Saving will email the tracking details to the customer.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Customer Details */}
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400" /> Shipping Details
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-1">
                                        <p className="font-bold text-gray-900">{selectedOrder.customer.name}</p>
                                        <p>{selectedOrder.customer.email}</p>
                                        <p>{selectedOrder.customer.phone}</p>
                                        <hr className="my-2 border-gray-200" />
                                        <p>{selectedOrder.customer.address}</p>
                                        <p>{selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}</p>
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-gray-400" /> Payment Info
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-2">
                                        <div className="flex justify-between">
                                            <span>Method:</span>
                                            <span className="font-medium capitalize">{selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-2">
                                            <span>Total:</span>
                                            <span>₹{selectedOrder.amount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <Package className="w-4 h-4 text-gray-400" /> Items ({selectedOrder.items.length})
                                </h3>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 bg-white border border-gray-100 p-3 rounded-lg">
                                            {/* Fallback for missing image */}
                                            <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center text-xs text-gray-400 font-bold overflow-hidden">
                                                {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : "IMG"}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800 text-sm line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                                            </div>
                                            <div className="font-bold text-gray-900 text-sm">
                                                ₹{item.price * item.quantity}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
