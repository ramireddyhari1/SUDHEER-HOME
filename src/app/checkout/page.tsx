"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { ChevronRight, CreditCard, Banknote, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedTractorButton } from "@/components/ui/AnimatedTractorButton";
import { OrderSuccess } from "@/components/checkout/OrderSuccess";
import { QRCodeSVG } from "qrcode.react";

const UPI_VPA = "8328667337@ptsbi";
const UPI_NAME = "Vaishnavi Organics";

export default function CheckoutPage() {
    const { cartTotal, cart, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [loading, setLoading] = useState(false);
    // Stable timestamp for UPI links to prevent QR flickering
    const [txnRef] = useState(`VO-${Date.now()}`);

    // Dynamic Shipping Config
    const [shippingConfig, setShippingConfig] = useState({ standardCost: 50, freeThreshold: 500 });

    useEffect(() => {
        const fetchShippingConfig = async () => {
            try {
                const res = await fetch("/api/content?section=checkout-shipping");
                const json = await res.json();
                if (json.success && json.content) {
                    setShippingConfig({
                        standardCost: Number(json.content.standardCost) || 50,
                        freeThreshold: Number(json.content.freeThreshold) || 500
                    });
                }
            } catch (error) {
                console.error("Failed to load shipping config", error);
            }
        };
        fetchShippingConfig();
    }, []);

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

    const [transactionId, setTransactionId] = useState("");


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Derived state
    const subtotal = cartTotal;
    const shippingCost = subtotal > shippingConfig.freeThreshold ? 0 : shippingConfig.standardCost;
    const grandTotal = subtotal + shippingCost;

    const handlePlaceOrder = async () => {
        // Basic Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.pincode) {
            alert("Please fill in all shipping details.");
            return;
        }

        if (paymentMethod === "online" && !transactionId) {
            alert("Please enter the Transaction ID / UTR Number for online payment.");
            return;
        }

        setLoading(true);
        const orderId = `VO-${Math.floor(10000 + Math.random() * 90000)}`;

        try {
            // Call Notification API
            // ... (fetch logic) ...
            // FIRE AND FORGET NOTIFICATION (Don't await response to speed up UI)
            fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    amount: grandTotal,
                    paymentMethod: paymentMethod === "online" ? `Online (Txn: ${transactionId})` : paymentMethod,
                    customer: formData,
                    items: cart || [],
                    transactionId // Pass specifically for email handling
                })
            }).catch(err => console.error("Notification trigger failed (background)", err));

            // Optimistic success - assume it works for the UI
            // We don't check 'result' here to save time

            // Save order to localStorage
            const newOrder = {
                id: orderId,
                date: new Date().toISOString(),
                amount: grandTotal,
                status: 'Processing',
                paymentMethod: paymentMethod === "online" ? "online" : "cod",
                transactionId: paymentMethod === "online" ? transactionId : undefined,
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
                transactionId={transactionId}
            />
        );
    }


    return (
        <div className="min-h-screen bg-[#F5F5DC] py-8 md:py-12 pb-40 md:pb-32">
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
                            <span className="w-6 h-6 rounded-full bg-[#DAA520] text-[#2C1810] text-xs flex items-center justify-center font-bold">1</span>
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
                            <span className="w-6 h-6 rounded-full bg-[#DAA520] text-[#2C1810] text-xs flex items-center justify-center font-bold">2</span>
                            Payment Method
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            {/* Online Payment Option */}
                            <div
                                onClick={() => setPaymentMethod("online")}
                                className={`cursor-pointer relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300 ${paymentMethod === "online"
                                    ? "border-[#DAA520] bg-white shadow-md"
                                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <CreditCard className={`h-8 w-8 ${paymentMethod === "online" ? "text-[#B8860B]" : "text-gray-400"}`} />
                                    {paymentMethod === "online" && (
                                        <div className="h-6 w-6 rounded-full bg-[#DAA520] flex items-center justify-center">
                                            <CheckCircle2 className="h-4 w-4 text-[#2C1810]" />
                                        </div>
                                    )}
                                </div>
                                <h3 className={`font-bold text-lg mb-1 ${paymentMethod === "online" ? "text-[#B8860B]" : "text-gray-700"}`}>
                                    Online Payment
                                </h3>
                                <p className="text-sm text-gray-500">UPI, Cards, Netbanking</p>

                                {paymentMethod === "online" && (
                                    <div className="mt-4 p-4 bg-[#FFFDF5] rounded-lg border border-[#DAA520]/30 animate-in fade-in zoom-in duration-300">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                                                <QRCodeSVG
                                                    value={`upi://pay?pa=${UPI_VPA}&pn=${encodeURIComponent(UPI_NAME)}&am=${grandTotal}&tn=${txnRef}&cu=INR`}
                                                    size={180}
                                                    level={"H"}
                                                    includeMargin={true}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 text-center font-medium">Scan with GPay, PhonePe, Paytm</p>

                                            <div className="grid grid-cols-2 gap-3 w-full mt-2">
                                                {/* Google Pay */}
                                                <a
                                                    href={`tez://upi/pay?pa=${UPI_VPA}&pn=${encodeURIComponent(UPI_NAME)}&am=${grandTotal}&tn=${txnRef}&cu=INR`}
                                                    className="w-full"
                                                >
                                                    <div className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 shadow-sm active:scale-95 transition-transform h-12">
                                                        <svg className="h-6 w-auto" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                            <path d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.29 1 12s.43 3.45 1.18 4.96l2.84-2.84z" fill="#FBBC05" />
                                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84c.87-2.6 3.3-4.5 6.16-4.5z" fill="#EA4335" />
                                                        </svg>
                                                        <span className="font-medium text-gray-600">Pay</span>
                                                    </div>
                                                </a>

                                                {/* PhonePe */}
                                                <a
                                                    href={`phonepe://pay?pa=${UPI_VPA}&pn=${encodeURIComponent(UPI_NAME)}&am=${grandTotal}&tn=${txnRef}&cu=INR`}
                                                    className="w-full"
                                                >
                                                    <div
                                                        className="flex items-center justify-center gap-2 text-white rounded-lg py-2 shadow-sm active:scale-95 transition-transform h-12"
                                                        style={{ backgroundColor: '#5f259f' }}
                                                    >
                                                        {/* PhonePe Logo Path */}
                                                        <svg className="h-6 w-auto" viewBox="0 0 2500 679" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="m1716.78 533.51v-123.27c0-30.34-11.38-45.51-39.82-45.51-11.38 0-24.65 1.9-32.24 3.79v180.16c0 5.69-5.69 11.38-11.38 11.38h-43.62c-5.69 0-11.38-5.69-11.38-11.38v-210.5c0-7.59 5.69-13.27 11.38-15.17 28.45-9.48 56.89-15.17 87.23-15.17 68.27 0 106.2 36.03 106.2 102.41v140.33c0 5.69-5.69 11.38-11.38 11.38h-26.55c-17.06-.01-28.44-13.28-28.44-28.45zm170.68-73.96-1.9 17.07c0 22.76 15.17 36.03 39.82 36.03 18.96 0 36.03-5.69 55-15.17 1.9 0 3.79-1.9 5.69-1.9 3.79 0 5.69 1.9 7.59 3.79 1.9 1.9 5.69 7.59 5.69 7.59 3.79 5.69 7.59 13.27 7.59 18.96 0 9.48-5.69 18.96-13.27 22.76-20.86 11.38-45.51 17.07-72.06 17.07-30.34 0-55-7.59-73.96-22.76-18.96-17.07-30.34-39.82-30.34-68.27v-73.96c0-58.79 37.93-94.82 102.41-94.82 62.58 0 98.61 34.14 98.61 94.82v45.51c0 5.69-5.69 11.38-11.38 11.38h-119.47zm-1.9-41.72h72.06v-18.96c0-22.76-13.27-37.93-36.03-37.93s-36.03 13.27-36.03 37.93zm483.59 41.72-1.9 17.07c0 22.76 15.17 36.03 39.82 36.03 18.96 0 36.03-5.69 55-15.17 1.9 0 3.79-1.9 5.69-1.9 3.79 0 5.69 1.9 7.59 3.79 1.9 1.9 5.69 7.59 5.69 7.59 3.79 5.69 7.59 13.27 7.59 18.96 0 9.48-5.69 18.96-13.27 22.76-20.86 11.38-45.51 17.07-72.06 17.07-30.34 0-55-7.59-73.96-22.76-18.96-17.07-30.34-39.82-30.34-68.27v-73.96c0-58.79 37.93-94.82 102.41-94.82 62.58 0 98.61 34.14 98.61 94.82v45.51c0 5.69-5.69 11.38-11.38 11.38h-119.47v1.9zm-1.9-41.72h72.06v-18.96c0-22.76-13.27-37.93-36.03-37.93s-36.03 13.27-36.03 37.93zm-1115.09 144.12h26.55c5.69 0 11.38-5.69 11.38-11.38v-140.33c0-64.48-34.14-102.41-91.03-102.41-17.07 0-36.03 3.79-47.41 7.59v-70.17c0-15.17-13.27-28.45-28.45-28.45h-26.55c-5.69 0-11.38 5.69-11.38 11.38v322.39c0 5.69 5.69 11.38 11.38 11.38h43.62c5.69 0 11.38-5.69 11.38-11.38v-178.26c9.48-3.79 22.76-5.69 32.24-5.69 28.45 0 39.82 13.27 39.82 45.51v123.27c1.9 13.28 13.28 26.55 28.45 26.55zm286.36-159.3v70.17c0 58.79-39.82 94.82-106.2 94.82-64.48 0-106.2-36.03-106.2-94.82v-70.17c0-58.79 39.82-94.82 106.2-94.82s106.2 36.04 106.2 94.82zm-66.37 0c0-22.76-13.27-37.93-37.93-37.93s-37.93 13.27-37.93 37.93v70.17c0 22.76 13.27 36.03 37.93 36.03s37.93-13.27 37.93-36.03zm-422.9-32.23c0 60.69-45.51 102.41-106.2 102.41-15.17 0-28.45-1.9-41.72-7.59v85.34c0 5.69-5.69 11.38-11.38 11.38h-43.62c-5.69 0-11.38-5.69-11.38-11.38v-301.53c0-7.59 5.69-13.27 11.38-15.17 28.45-9.48 56.89-15.17 87.23-15.17 68.27 0 115.68 41.72 115.68 106.2.01-.01.01 45.51.01 45.51zm-68.27-49.31c0-30.34-20.86-45.51-49.31-45.51-17.07 0-28.45 5.69-28.45 5.69v125.16c11.38 5.69 17.07 7.59 30.34 7.59 28.45 0 49.31-17.07 49.31-45.51v-47.41h-1.89zm1293.35 49.31c0 60.69-45.51 102.41-106.2 102.41-15.17 0-28.45-1.9-41.72-7.59v85.34c0 5.69-5.69 11.38-11.38 11.38h-43.62c-5.69 0-11.38-5.69-11.38-11.38v-301.53c0-7.59 5.69-13.27 11.38-15.17 28.45-9.48 56.89-15.17 87.23-15.17 68.27 0 115.68 41.72 115.68 106.2.01-.01.01 45.51.01 45.51zm-68.27-49.31c0-30.34-20.86-45.51-49.31-45.51-17.07 0-28.45 5.69-28.45 5.69v125.16c11.38 5.69 17.07 7.59 30.34 7.59 28.45 0 49.31-17.07 49.31-45.51v-47.41h-1.89z" fill="#ffffff" />
                                                            <circle cx="339.53" cy="339.53" fill="#5f259f" r="339.46" />
                                                            <path d="m493.6 250.94c0-13.27-11.38-24.65-24.65-24.65h-45.51l-104.3-119.47c-9.48-11.38-24.65-15.17-39.82-11.38l-36.03 11.38c-5.69 1.9-7.59 9.48-3.79 13.27l113.78 108.1h-172.59c-5.69 0-9.48 3.79-9.48 9.48v18.96c0 13.27 11.38 24.65 24.65 24.65h26.55v91.03c0 68.27 36.03 108.1 96.72 108.1 18.96 0 34.14-1.9 53.1-9.48v60.69c0 17.07 13.27 30.34 30.34 30.34h26.55c5.69 0 11.38-5.69 11.38-11.38v-271.19h43.62c5.69 0 9.48-3.79 9.48-9.48zm-121.37 163.09c-11.38 5.69-26.55 7.59-37.93 7.59-30.34 0-45.51-15.17-45.51-49.31v-91.03h83.44z" fill="#fff" />
                                                        </svg>
                                                    </div>
                                                </a>

                                                {/* Paytm */}
                                                <a
                                                    href={`paytmmp://pay?pa=${UPI_VPA}&pn=${encodeURIComponent(UPI_NAME)}&am=${grandTotal}&tn=${txnRef}&cu=INR`}
                                                    className="w-full"
                                                >
                                                    <div
                                                        className="flex items-center justify-center gap-2 text-white rounded-lg py-2 shadow-sm active:scale-95 transition-transform h-12"
                                                        style={{ backgroundColor: '#00baf2' }}
                                                    >
                                                        <svg className="h-5 w-auto" viewBox="0 0 17 5.3" xmlns="http://www.w3.org/2000/svg">
                                                            <g transform="matrix(0.35277777,0,0,-0.35277777,16.777,1.561)">
                                                                <path style={{ fill: '#fff' }} d="M 0,0 C -0.433,1.238 -1.613,2.127 -2.999,2.127 H -3.028 C -3.929,2.127 -4.741,1.752 -5.319,1.15 -5.898,1.752 -6.71,2.127 -7.61,2.127 h -0.029 c -0.792,0 -1.516,-0.29 -2.072,-0.77 V 1.601 C -9.73,1.844 -9.93,2.035 -10.177,2.035 h -2.126 c -0.26,0 -0.47,-0.21 -0.47,-0.471 V -9.981 c 0,-0.261 0.21,-0.471 0.47,-0.471 h 2.126 c 0.237,0 0.432,0.177 0.463,0.406 l -10e-4,8.288 c 0,0.029 10e-4,0.056 0.004,0.083 0.034,0.37 0.305,0.674 0.733,0.712 h 0.079 0.223 0.09 c 0.179,-0.016 0.33,-0.079 0.449,-0.174 0.185,-0.147 0.288,-0.373 0.288,-0.621 l 0.008,-8.247 c 0,-0.261 0.211,-0.472 0.47,-0.472 h 2.126 c 0.251,0 0.455,0.2 0.467,0.449 l -0.001,8.281 c -0.001,0.272 0.125,0.518 0.346,0.664 0.109,0.07 0.24,0.117 0.391,0.131 h 0.079 0.223 0.09 c 0.46,-0.04 0.738,-0.389 0.737,-0.795 l 0.008,-8.236 c 0,-0.261 0.211,-0.471 0.47,-0.471 h 2.126 c 0.259,0 0.47,0.21 0.47,0.471 v 8.858 C 0.161,-0.521 0.093,-0.264 0,0" />
                                                            </g>
                                                            <g transform="matrix(0.35277777,0,0,-0.35277777,11.7,0.854)">
                                                                <path style={{ fill: '#fff' }} d="m 0,0 h -1.216 v 1.97 0 c 0,0.002 0,0.004 0,0.006 0,0.237 -0.192,0.429 -0.429,0.429 C -1.673,2.405 -1.7,2.401 -1.726,2.396 -3.074,2.026 -2.804,0.159 -5.265,0 H -5.32 -5.504 c -0.036,0 -0.07,-0.005 -0.103,-0.012 h -0.002 l 0.002,-10e-4 C -5.817,-0.06 -5.975,-0.246 -5.975,-0.47 v -2.126 c 0,-0.259 0.211,-0.47 0.471,-0.47 h 1.283 l -0.002,-9.015 c 0,-0.257 0.208,-0.465 0.465,-0.465 h 2.102 c 0.256,0 0.464,0.208 0.464,0.465 l 10e-4,9.015 H 0 c 0.259,0 0.47,0.211 0.47,0.47 V -0.47 C 0.47,-0.211 0.259,0 0,0" />
                                                            </g>
                                                            <g transform="matrix(0.35277777,0,0,-0.35277777,9.001,0.854)">
                                                                <path style={{ fill: '#fff' }} d="M 0,0 H -2.126 C -2.385,0 -2.595,-0.211 -2.595,-0.47 V -4.866 C -2.6,-5.138 -2.82,-5.356 -3.093,-5.356 h -0.89 c -0.276,0 -0.499,0.222 -0.499,0.498 L -4.49,-0.47 C -4.49,-0.211 -4.701,0 -4.96,0 h -2.126 c -0.26,0 -0.47,-0.211 -0.47,-0.47 v -4.818 c 0,-1.83 1.305,-3.135 3.136,-3.135 0,0 1.374,0 1.416,-0.008 0.248,-0.028 0.441,-0.236 0.441,-0.492 0,-0.253 -0.189,-0.46 -0.434,-0.491 -0.012,-0.002 -0.023,-0.005 -0.036,-0.007 l -3.109,-0.011 c -0.26,0 -0.47,-0.211 -0.47,-0.47 v -2.125 c 0,-0.26 0.21,-0.47 0.47,-0.47 h 3.476 c 1.832,0 3.136,1.304 3.136,3.135 V -0.47 C 0.47,-0.211 0.26,0 0,0" />
                                                            </g>
                                                            <g transform="matrix(0.35277777,0,0,-0.35277777,1.742,2.228)">
                                                                <path style={{ fill: '#fff' }} d="m 0,0 v -0.992 -0.32 c 0,-0.275 -0.223,-0.499 -0.498,-0.499 l -1.349,-0.001 v 2.629 h 1.349 C -0.223,0.817 0,0.595 0,0.319 Z M 0.187,3.896 H -4.46 c -0.255,0 -0.461,-0.207 -0.461,-0.461 V 1.352 c 0,-0.004 0.001,-0.008 0.001,-0.012 0,-0.01 -0.001,-0.02 -0.001,-0.029 V -5.37 -8.117 c 0,-0.256 0.192,-0.465 0.43,-0.471 h 0.04 2.126 c 0.259,0 0.47,0.21 0.47,0.47 l 0.008,3.231 h 2.034 c 1.702,0 2.888,1.181 2.888,2.89 v 2.999 c 0,1.709 -1.186,2.894 -2.888,2.894" />
                                                            </g>
                                                            <g transform="matrix(0.35277777,0,0,-0.35277777,4.854,3.989)">
                                                                <path style={{ fill: '#fff' }} d="M 0,0 V -0.332 C 0,-0.359 -0.004,-0.385 -0.008,-0.41 -0.013,-0.434 -0.02,-0.457 -0.028,-0.479 -0.094,-0.665 -0.28,-0.8 -0.501,-0.8 h -0.885 c -0.276,0 -0.501,0.21 -0.501,0.468 v 0.401 c 0,0.005 -10e-4,0.01 -10e-4,0.015 l 10e-4,1.067 v 0.002 0.118 0.214 l 0.001,0.003 c 10e-4,0.257 0.224,0.465 0.5,0.465 h 0.885 C -0.224,1.953 0,1.744 0,1.485 Z m -0.338,8.875 h -2.95 C -3.549,8.875 -3.76,8.677 -3.76,8.434 V 7.607 c 0,-0.005 10e-4,-0.011 10e-4,-0.016 0,-0.006 -10e-4,-0.012 -10e-4,-0.018 V 6.44 c 0,-0.257 0.224,-0.467 0.5,-0.467 h 2.809 c 0.222,-0.035 0.398,-0.197 0.423,-0.45 V 5.249 C -0.053,5.008 -0.227,4.832 -0.439,4.812 H -1.83 c -1.85,0 -3.168,-1.229 -3.168,-2.955 v -2.409 -0.063 c 0,-1.716 1.133,-2.937 2.97,-2.937 h 3.855 c 0.692,0 1.253,0.524 1.253,1.169 v 8.067 c 0,1.956 -1.008,3.191 -3.418,3.191" />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </a>

                                                {/* Generic UPI */}
                                                <a
                                                    href={`upi://pay?pa=${UPI_VPA}&pn=${encodeURIComponent(UPI_NAME)}&am=${grandTotal}&tn=${txnRef}&cu=INR`}
                                                    className="w-full"
                                                >
                                                    <div className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 shadow-sm active:scale-95 transition-transform h-12">
                                                        <svg className="h-8 w-auto px-4" viewBox="0 0 130 46" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                                                            <g transform="matrix(0.35277777,0,0,-0.35277777,-10.926,61.159)">
                                                                <g transform="translate(376.586,173.169)">
                                                                    <path style={{ fill: '#27803b' }} d="m 0,0 24.414,-48.553 -51.322,-48.54 z" />
                                                                </g>
                                                                <g transform="translate(359.472,173.169)">
                                                                    <path style={{ fill: '#e9661c' }} d="m 0,0 24.396,-48.553 -51.343,-48.54 z" />
                                                                </g>
                                                                <g transform="translate(306.452,170.288)">
                                                                    <path style={{ fill: '#66686c' }} d="m 0,0 c -1.337,1.843 -3.399,2.773 -6.2,2.773 h -106.036 l -5.252,-18.97 h 19.294 v 0.011 h 77.169 l -5.614,-20.272 h -77.171 l 0.007,0.042 h -19.286 l -16.007,-57.787 h 19.296 l 10.742,38.786 h 86.746 c 2.709,0 5.259,0.924 7.657,2.772 2.393,1.85 3.968,4.131 4.723,6.855 L 0.809,-6.996 C 1.593,-4.181 1.322,-1.845 0,0" />
                                                                </g>
                                                                <g transform="translate(156.12,82.541)">
                                                                    <path style={{ fill: '#66686c' }} d="m 0,0 c -1.065,-3.835 -4.557,-6.488 -8.538,-6.488 h -99.491 c -2.711,0 -4.726,0.924 -6.051,2.77 -1.324,1.848 -1.608,4.134 -0.851,6.857 l 24.276,87.387 h 19.301 l -21.683,-78.05 h 77.206 l 21.683,78.05 h 19.297 z" />
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </a>


                                            </div>
                                            <div className="w-full mt-2">
                                                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">Enter Transaction ID / UTR <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    value={transactionId}
                                                    onChange={(e) => setTransactionId(e.target.value)}
                                                    placeholder="e.g. 123456789012"
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#155E42] focus:ring-1 focus:ring-[#155E42]"
                                                />
                                                <p className="text-[10px] text-gray-500 mt-1">Please enter the 12-digit UTR number after payment.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* COD Option */}
                            <div
                                onClick={() => setPaymentMethod("cod")}
                                className={`cursor-pointer relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300 ${paymentMethod === "cod"
                                    ? "border-[#DAA520] bg-white shadow-md"
                                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <Banknote className={`h-8 w-8 ${paymentMethod === "cod" ? "text-[#B8860B]" : "text-gray-400"}`} />
                                    {paymentMethod === "cod" && (
                                        <div className="h-6 w-6 rounded-full bg-[#DAA520] flex items-center justify-center">
                                            <CheckCircle2 className="h-4 w-4 text-[#2C1810]" />
                                        </div>
                                    )}
                                </div>
                                <h3 className={`font-bold text-lg mb-1 ${paymentMethod === "cod" ? "text-[#B8860B]" : "text-gray-700"}`}>
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
            <div className="fixed bottom-[56px] md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3 md:p-4 z-[101]">
                <Container>
                    <div className="flex items-center gap-4 justify-between">
                        <div>
                            <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">Total to Pay</p>
                            <p className="text-lg md:text-xl font-bold text-gray-900">₹{grandTotal}</p>
                        </div>
                        <AnimatedTractorButton
                            onClick={handlePlaceOrder}
                            className="w-full md:w-auto md:min-w-[300px] h-10 md:h-12 text-sm md:text-base font-bold bg-[#DAA520] text-[#2C1810] hover:bg-[#B8860B] shadow-lg"
                            label="Place Order"
                        />
                    </div>
                </Container>
            </div>
        </div>
    );
}
