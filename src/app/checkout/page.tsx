"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { ChevronRight, CreditCard, Banknote, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedTractorButton } from "@/components/ui/AnimatedTractorButton";
import { OrderSuccess } from "@/components/checkout/OrderSuccess";

export default function CheckoutPage() {
    const { cartTotal, cart, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        pincode: "",
        address: "",
        city: "",
        state: "Select State"
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Derived state
    const subtotal = cartTotal;
    const shippingCost = subtotal > 500 ? 0 : 50;
    const grandTotal = subtotal + shippingCost;

    const handlePlaceOrder = async () => {
        // Basic Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.pincode) {
            alert("Please fill in all shipping details.");
            return;
        }

        setLoading(true);
        const orderId = `VO-${Math.floor(10000 + Math.random() * 90000)}`;

        try {
            // Call Notification API
            // ... (fetch logic) ...
            const response = await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    amount: grandTotal,
                    paymentMethod,
                    customer: formData,
                    items: cart || []
                })
            });

            const result = await response.json();

            if (!result.success) {
                console.error("Notification API Failed:", result);
                alert(`Order Placed, but confirmation email failed: ${result.error}.`);
            }

            // Save order to localStorage
            const newOrder = {
                id: orderId,
                date: new Date().toISOString(),
                amount: grandTotal,
                status: 'Processing',
                paymentMethod,
                items: cart || []
            };

            const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
            localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

            // CLEAR CART
            clearCart(); // <--- ADDED THIS

            // Simulate slight delay for UX - REMOVED for speed
            setOrderPlaced(true);
            setLoading(false);

        } catch (error) {
            console.error("Order failed:", error);
            setLoading(false);
            alert("Something went wrong. Please try again.");
        }
    };

    if (orderPlaced) {
        return (
            <OrderSuccess
                orderId={`VO-${Math.floor(10000 + Math.random() * 90000)}`} // In a real app, this comes from the API response
                amount={grandTotal}
                paymentMethod={paymentMethod}
            />
        );
    }


    return (
        <div className="min-h-screen bg-[#FDFBF7] py-8 md:py-12 pb-40 md:pb-32">
            <Container>
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Link href="/">Home</Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link href="/cart">Cart</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="font-medium text-foreground">Checkout</span>
                </div>

                <div className="max-w-3xl mx-auto">
                    <h1 className="font-serif text-3xl font-bold mb-8 text-center">Data & Payment</h1>

                    {/* Order Summary Card */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                        <h2 className="font-serif text-xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-medium text-green-600">{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span>
                        </div>
                        <div className="flex justify-between py-4 text-lg font-bold text-[#155E42]">
                            <span>Total Amount</span>
                            <span>₹{grandTotal}</span>
                        </div>
                    </div>

                    {/* Shipping Address Form */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                        <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#155E42] text-white text-xs flex items-center justify-center">1</span>
                            Shipping Address
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Aditi Sharma"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42]"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="e.g. aditi@example.com"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+91 98765 43210"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 560034"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42]"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address (House No, Building, Street)</label>
                                <textarea
                                    rows={2}
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Flat 402, Green Heights, HSR Layout"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Bengaluru"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42] bg-white"
                                >
                                    <option>Select State</option>
                                    <option>Andhra Pradesh</option>
                                    <option>Telangana</option>
                                    <option>Tamil Nadu</option>
                                    <option>Karnataka</option>
                                    <option>Kerala</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                        <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#155E42] text-white text-xs flex items-center justify-center">2</span>
                            Payment Method
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            {/* Online Payment Option */}
                            <div
                                onClick={() => setPaymentMethod("online")}
                                className={`cursor-pointer relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300 ${paymentMethod === "online"
                                    ? "border-[#155E42] bg-white shadow-md"
                                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <CreditCard className={`h-8 w-8 ${paymentMethod === "online" ? "text-[#155E42]" : "text-gray-400"}`} />
                                    {paymentMethod === "online" && (
                                        <div className="h-6 w-6 rounded-full bg-[#155E42] flex items-center justify-center">
                                            <CheckCircle2 className="h-4 w-4 text-white" />
                                        </div>
                                    )}
                                </div>
                                <h3 className={`font-bold text-lg mb-1 ${paymentMethod === "online" ? "text-[#155E42]" : "text-gray-700"}`}>
                                    Online Payment
                                </h3>
                                <p className="text-sm text-gray-500">UPI, Cards, Netbanking</p>
                            </div>

                            {/* COD Option */}
                            <div
                                onClick={() => setPaymentMethod("cod")}
                                className={`cursor-pointer relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300 ${paymentMethod === "cod"
                                    ? "border-[#155E42] bg-white shadow-md"
                                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <Banknote className={`h-8 w-8 ${paymentMethod === "cod" ? "text-[#155E42]" : "text-gray-400"}`} />
                                    {paymentMethod === "cod" && (
                                        <div className="h-6 w-6 rounded-full bg-[#155E42] flex items-center justify-center">
                                            <CheckCircle2 className="h-4 w-4 text-white" />
                                        </div>
                                    )}
                                </div>
                                <h3 className={`font-bold text-lg mb-1 ${paymentMethod === "cod" ? "text-[#155E42]" : "text-gray-700"}`}>
                                    Cash on Delivery
                                </h3>
                                <p className="text-sm text-gray-500">Pay when you receive</p>
                            </div>
                        </div>

                        {/* Place Order Button moved to fixed bottom bar */}

                        <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-3 w-3" /> Secure checkout powered by Razorpay
                        </p>
                    </div>
                </div>
            </Container>

            {/* Fixed Bottom Bar for Place Order */}
            <div className="fixed bottom-[56px] md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3 md:p-4 z-40">
                <Container>
                    <div className="flex items-center gap-4 justify-between">
                        <div>
                            <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">Total to Pay</p>
                            <p className="text-lg md:text-xl font-bold text-gray-900">₹{grandTotal}</p>
                        </div>
                        <AnimatedTractorButton
                            onClick={handlePlaceOrder}
                            className="w-full md:w-auto md:min-w-[300px] h-10 md:h-12 text-sm md:text-base font-bold bg-[#155E42] hover:bg-[#0f4631] shadow-lg"
                            label="Place Order"
                        />
                    </div>
                </Container>
            </div>
        </div>
    );
}
