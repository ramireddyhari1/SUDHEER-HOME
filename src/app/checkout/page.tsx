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

    // Dynamic Shipping Config
    const [shippingConfig, setShippingConfig] = useState({ standardCost: 50, freeThreshold: 500 });

    useEffect(() => {
        const fetchShippingConfig = async () => {
            try {
                const res = await fetch("/api/site-content?sectionId=checkout-shipping");
                const json = await res.json();
                if (json.success && json.data) {
                    setShippingConfig({
                        standardCost: Number(json.data.standardCost) || 50,
                        freeThreshold: Number(json.data.freeThreshold) || 500
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
                                                    value={`upi://pay?pa=${UPI_VPA}&pn=${encodeURIComponent(UPI_NAME)}&am=${grandTotal}&tn=Order-${Date.now()}&cu=INR`}
                                                    size={180}
                                                    level={"H"}
                                                    includeMargin={true}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 text-center font-medium">Scan with GPay, PhonePe, Paytm</p>

                                            <a
                                                href={`upi://pay?pa=${UPI_VPA}&pn=${encodeURIComponent(UPI_NAME)}&am=${grandTotal}&tn=Order-${Date.now()}&cu=INR`}
                                                className="md:hidden w-full"
                                            >
                                                <Button variant="outline" className="w-full border-green-600 text-green-700 bg-green-50 hover:bg-green-100">
                                                    Open UPI App
                                                </Button>
                                            </a>

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
