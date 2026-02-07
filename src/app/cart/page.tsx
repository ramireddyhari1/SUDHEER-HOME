"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Trash2, ArrowRight, Truck, Gift, ChevronRight, ShieldCheck, ShoppingBag, Phone, Cpu } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { AnimatedTractorButton } from "@/components/ui/AnimatedTractorButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const router = useRouter();
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState("");
    const [couponDiscount, setCouponDiscount] = useState(0);

    // Derived state
    const subtotal = cartTotal;
    const shippingCost = subtotal > 500 ? 0 : 100;
    const taxAmount = Math.round((subtotal * 0.1)); // 10% tax
    const totalDiscount = couponDiscount;
    const grandTotal = subtotal + shippingCost + taxAmount - totalDiscount;

    const handleApplyCoupon = () => {
        if (couponCode.trim()) {
            setAppliedCoupon(couponCode);
            // Mock discount logic - 10% off for valid coupons
            setCouponDiscount(Math.round(subtotal * 0.1));
            setCouponCode("");
        }
    };

    const handleClearCart = () => {
        if (typeof window !== 'undefined' && localStorage) {
            localStorage.removeItem('cart');
            window.location.reload();
        }
    };

    if (cart.length === 0) {
        return (
            <div className="py-20 min-h-[60vh] bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center text-center">
                <div className="bg-white p-8 rounded-full shadow-md mb-6 border border-gray-200">
                    <ShoppingBag className="h-16 w-16 text-gray-400" />
                </div>
                <h1 className="text-4xl font-bold mb-4 text-gray-900">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8 max-w-md text-lg">Looks like you haven't added any items yet. Start shopping to fill your cart!</p>
                <Link href="/products">
                    <Button size="lg" className="rounded-full px-8 bg-[#155E42] hover:bg-[#0f4033] text-white font-bold text-lg">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="py-8 md:py-12 min-h-screen bg-gray-50 pb-32">
            <Container>
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                    <Link href="/" className="hover:text-[#155E42]">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-[#155E42] font-medium">Shopping Cart</span>
                </div>

                <h1 className="text-4xl font-bold mb-8 text-gray-900">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Cart Items Table - 2/3 width */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                            {/* Table Header - Sticky on all screens */}
                            <div className="grid grid-cols-4 gap-4 bg-[#F5C842] text-gray-900 font-bold p-3 md:p-4 text-xs md:text-sm sticky top-0 z-10">
                                <div>Product</div>
                                <div className="text-center">Price</div>
                                <div className="text-center">Quantity</div>
                                <div className="text-right">Subtotal</div>
                            </div>

                            {/* Table Body - Cart Items */}
                            <div className="divide-y divide-gray-200">
                                {cart.map((item) => (
                                    <div key={item.id} className="grid grid-cols-4 gap-4 items-center p-3 md:p-4 hover:bg-gray-50 transition-colors text-xs md:text-sm">
                                        {/* Product Column */}
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                            >
                                                <span className="text-lg md:text-lg font-bold">×</span>
                                            </button>
                                            <div className="relative h-14 md:h-16 w-14 md:w-16 bg-gray-100 rounded overflow-hidden flex-shrink-0 border border-gray-200">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="hidden md:block">
                                                <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {item.weight ? `${item.weight}` : "1 unit"}
                                                </p>
                                            </div>
                                            <div className="md:hidden">
                                                <p className="font-semibold text-gray-900 text-xs">{item.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {item.weight ? `${item.weight}` : "1 unit"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Price Column */}
                                        <div className="text-center">
                                            <p className="font-semibold text-gray-900">₹{item.price.toFixed(2)}</p>
                                        </div>

                                        {/* Quantity Column */}
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="h-7 md:h-8 w-7 md:w-8 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-colors text-sm"
                                                >
                                                    −
                                                </button>
                                                <span className="h-7 md:h-8 min-w-[28px] md:min-w-[32px] flex items-center justify-center text-xs md:text-sm font-medium text-gray-900 border-l border-r border-gray-300">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="h-7 md:h-8 w-7 md:w-8 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-colors text-sm"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subtotal Column */}
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Mobile card view removed - now using responsive table on all screens */}
                            </div>
                        </div>

                        {/* Coupon Section */}
                        <div className="mt-6 flex flex-col sm:flex-row gap-2 md:gap-3">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="flex-1 px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155E42]/20 focus:border-[#155E42] transition-all text-sm md:text-base"
                            />
                            <button
                                onClick={handleApplyCoupon}
                                className="px-4 md:px-6 py-2 md:py-2.5 bg-[#155E42] hover:bg-[#0f4033] text-white font-semibold rounded-lg transition-colors whitespace-nowrap text-sm md:text-base"
                            >
                                Apply Coupon
                            </button>
                        </div>

                        {appliedCoupon && (
                            <div className="mt-2 text-xs md:text-sm text-green-600 font-medium">
                                ✓ Coupon "{appliedCoupon}" applied successfully!
                            </div>
                        )}

                        {/* Clear Cart Link */}
                        <div className="mt-3 md:mt-4">
                            <button
                                onClick={handleClearCart}
                                className="text-[#155E42] hover:text-red-600 font-semibold text-xs md:text-sm transition-colors underline"
                            >
                                Clear Shopping Cart
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Order Summary - 1/3 width on Desktop, Full on Mobile, Below Items */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200 lg:sticky lg:top-20">
                            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Order Summary</h2>

                            {/* Items - Top of Summary */}
                            <div className="flex justify-between items-center bg-gray-50 p-3 md:p-4 rounded-lg mb-4 md:mb-5 border border-gray-200">
                                <span className="font-semibold text-gray-900">Items</span>
                                <span className="text-lg md:text-xl font-bold text-[#155E42]">{cart.length}</span>
                            </div>

                            {/* Other Summary Details */}
                            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 text-xs md:text-sm">
                                <div className="flex justify-between text-gray-700">
                                    <span>Sub Total</span>
                                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping</span>
                                    <span className="font-semibold">
                                        {shippingCost === 0 ? 
                                            <span className="text-green-600">FREE</span> 
                                            : `₹${shippingCost.toFixed(2)}`
                                        }
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Taxes</span>
                                    <span className="font-semibold">₹{taxAmount.toFixed(2)}</span>
                                </div>
                                {couponDiscount > 0 && (
                                    <div className="flex justify-between text-red-600">
                                        <span>Coupon Discount</span>
                                        <span className="font-semibold">-₹{couponDiscount.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-200 pt-3 md:pt-4 mb-4 md:mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-900 text-sm md:text-base">Total</span>
                                    <span className="text-xl md:text-2xl font-bold text-[#155E42]">₹{grandTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => router.push("/checkout")}
                                className="w-full bg-[#155E42] hover:bg-[#0f4033] text-white font-bold py-2 md:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md text-sm md:text-base"
                            >
                                Proceed to Checkout
                                <ArrowRight className="h-4 w-4" />
                            </button>

                            <div className="mt-3 md:mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
                                <ShieldCheck className="h-4 w-4" />
                                Secure & Safe Payments
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits Section - Clean horizontal layout */}
                <section className="mt-10 md:mt-14 py-6 md:py-8 bg-[#fafafa]">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                        {/* Free Shipping */}
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                                <Truck className="h-7 w-7 text-amber-600" strokeWidth={2} />
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-gray-900 text-sm md:text-base">Free Shipping</h3>
                                <p className="text-gray-600 text-xs md:text-sm mt-0.5">Free shipping for order above ₹180</p>
                            </div>
                        </div>
                        {/* Flexible Payment */}
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                                <Cpu className="h-7 w-7 text-blue-600" strokeWidth={2} />
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-gray-900 text-sm md:text-base">Flexible Payment</h3>
                                <p className="text-gray-600 text-xs md:text-sm mt-0.5">Multiple secure payment options</p>
                            </div>
                        </div>
                        {/* 24x7 Support */}
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                                <Phone className="h-7 w-7 text-green-600" strokeWidth={2} />
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-gray-900 text-sm md:text-base">24x7 Support</h3>
                                <p className="text-gray-600 text-xs md:text-sm mt-0.5">We support online all days.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </div>
    );
}
