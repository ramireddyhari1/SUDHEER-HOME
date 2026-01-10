"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Trash2, ArrowRight, Truck, Gift, ChevronRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
    const subtotal = 349;
    const freeShippingThreshold = 500;
    const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
    const amountNeeded = freeShippingThreshold - subtotal;

    return (
        <div className="py-8 md:py-12 min-h-screen bg-[#FDFBF7]">
            <Container>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link href="/">Home</Link> <ChevronRight className="h-3 w-3" /> <span>Cart</span>
                </div>

                <h1 className="font-serif text-3xl font-bold mb-8">Shopping Cart (1 Item)</h1>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column: Items */}
                    <div className="flex-1 space-y-6">

                        {/* Free Shipping Progress */}
                        <div className="bg-white p-4 rounded-xl border border-dashed border-primary/30 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <Truck className={`h-5 w-5 ${amountNeeded > 0 ? 'text-orange-500' : 'text-green-600'}`} />
                                <span className="text-sm font-medium">
                                    {amountNeeded > 0
                                        ? <span>Add <span className="font-bold text-primary">₹{amountNeeded}</span> more for <span className="uppercase font-bold text-green-700">Free Shipping</span></span>
                                        : <span className="text-green-700 font-bold">You've unlocked Free Shipping!</span>
                                    }
                                </span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>

                        {/* Cart Item Card */}
                        <div className="border border-gray-100 rounded-xl p-4 flex gap-4 items-start bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative h-24 w-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                <Image
                                    src="https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=200"
                                    alt="Jaggery"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 flex flex-col justify-between min-h-[96px]">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-serif font-semibold text-lg leading-tight text-foreground">Premium Organic Jaggery Powder</h3>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">500g</p>
                                </div>

                                <div className="flex items-end justify-between mt-3">
                                    <div className="flex items-center border rounded-md">
                                        <button className="h-8 w-8 hover:bg-gray-50 flex items-center justify-center text-gray-600">-</button>
                                        <span className="h-8 min-w-[32px] flex items-center justify-center text-sm font-medium">1</span>
                                        <button className="h-8 w-8 hover:bg-gray-50 flex items-center justify-center text-gray-600">+</button>
                                    </div>
                                    <div className="font-bold text-lg">₹349</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm sticky top-24">
                            <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">Order Summary</h2>

                            {/* Offers */}
                            <div className="mb-6">
                                <button className="w-full border border-dashed border-primary/50 bg-primary/5 text-primary rounded-lg p-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors">
                                    <Gift className="h-4 w-4" /> Apply Coupon Code
                                </button>
                            </div>

                            <div className="space-y-3 mb-6 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Item Total</span>
                                    <span>₹349</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-orange-600 font-medium md:text-right"> + ₹50</span>
                                </div>
                                <div className="flex justify-between text-green-700">
                                    <span>Discount</span>
                                    <span>- ₹0</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4 mt-4">
                                    <div className="flex justify-between font-bold text-lg text-foreground">
                                        <span>Grand Total</span>
                                        <span>₹399</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1 text-right">(Incl. of taxes)</p>
                                </div>
                            </div>

                            <Button className="w-full h-12 text-lg gap-2 bg-[#155E42] hover:bg-[#0f4631] shadow-lg animate-shimmer">
                                Proceed to Pay <ArrowRight className="h-4 w-4" />
                            </Button>

                            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                                <ShieldCheck className="h-3 w-3" /> Safe & Secure Payments
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
