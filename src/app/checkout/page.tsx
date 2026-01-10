"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { ChevronRight, CreditCard, Banknote, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedTractorButton } from "@/components/ui/AnimatedTractorButton";

export default function CheckoutPage() {
    const { cartTotal } = useCart();
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
            const response = await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    amount: grandTotal,
                    paymentMethod,
                    customer: formData,
                    items: [] // In a real app, pass 'cart' items here. For now we use context if available, or empty.
                })
            });

            const result = await response.json();

            if (!result.success) {
                console.error("Notification API Failed:", result);
                alert(`Order Placed, but confirmation email failed: ${result.error}. ${result.details?.response || ''}`);
                // Still allow success screen to show, but warn user
            }

            // Simulate slight delay for UX
            setTimeout(() => {
                setOrderPlaced(true);
                setLoading(false);
            }, 1500);

        } catch (error) {
            console.error("Order failed:", error);
            setLoading(false);
            alert("Something went wrong. Please try again.");
        }
    };

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] py-20 flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="font-serif text-3xl font-bold mb-4 text-green-800">Order Placed Successfully!</h1>
                <p className="text-gray-600 mb-8 max-w-md">
                    Thank you for choosing Vaishnavi Organics. Your order has been received and will be processed shortly.
                </p>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full max-w-sm mb-8">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-mono font-bold">#VO-{Math.floor(10000 + Math.random() * 90000)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Amount</span>
                        <span className="font-bold">₹{grandTotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Payment</span>
                        <span className="font-medium capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
                    </div>
                </div>
                <Link href="/products">
                    <Button className="bg-[#155E42] hover:bg-[#0f4631]">Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-8 md:py-12 pb-32">
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
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42]"
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
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42]"
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
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42]"
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
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42]"
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
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42]"
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
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42] bg-white"
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
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-50">
                <Container>
                    <div className="flex items-center gap-4 justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total to Pay</p>
                            <p className="text-xl font-bold text-gray-900">₹{grandTotal}</p>
                        </div>
                        <AnimatedTractorButton
                            onClick={handlePlaceOrder}
                            className="w-full md:w-auto md:min-w-[300px] h-12 text-base font-bold bg-[#155E42] hover:bg-[#0f4631] shadow-lg"
                            label="Place Order"
                        />
                    </div>
                </Container>
            </div>
        </div>
    );
}
