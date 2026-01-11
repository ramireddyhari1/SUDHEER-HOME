"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Trash2, ArrowRight, Truck, Gift, ChevronRight, ShieldCheck, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { AnimatedTractorButton } from "@/components/ui/AnimatedTractorButton";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const router = useRouter();

    // Derived state
    const subtotal = cartTotal;
    const shippingCost = subtotal > 500 ? 0 : 50;
    const grandTotal = subtotal + shippingCost;

    const freeShippingThreshold = 500;
    const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
    const amountNeeded = freeShippingThreshold - subtotal;

    if (cart.length === 0) {
        return (
            <div className="py-20 min-h-[60vh] bg-[#FDFBF7] flex flex-col items-center justify-center text-center">
                <div className="bg-white p-6 rounded-full shadow-sm mb-6">
                    <ShoppingBag className="h-12 w-12 text-gray-300" />
                </div>
                <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8 max-w-md">Looks like you haven't added any organic goodness yet.</p>
                <Link href="/products">
                    <Button size="lg" className="rounded-full px-8">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="py-8 md:py-12 min-h-screen bg-[#FDFBF7] pb-40 md:pb-32">
            <Container>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link href="/">Home</Link> <ChevronRight className="h-3 w-3" /> <span>Cart</span>
                </div>

                <h1 className="font-serif text-3xl font-bold mb-8">Shopping Cart ({cart.length} Items)</h1>

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

                        {/* Cart Items List */}
                        {cart.map((item) => (
                            <div key={item.id} className="border border-gray-100 rounded-xl p-4 flex gap-4 items-start bg-white shadow-sm hover:shadow-md transition-shadow">
                                <div className="relative h-24 w-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between min-h-[96px]">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-serif font-semibold text-lg leading-tight text-foreground">{item.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">{item.weight}</p>
                                    </div>

                                    <div className="flex items-end justify-between mt-3">
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="h-8 w-8 hover:bg-gray-50 flex items-center justify-center text-gray-600 font-bold"
                                            >
                                                -
                                            </button>
                                            <span className="h-8 min-w-[32px] flex items-center justify-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="h-8 w-8 hover:bg-gray-50 flex items-center justify-center text-gray-600 font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="font-bold text-lg">₹{item.price * item.quantity}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Summary (Desktop Sticky) */}
                    <div className="hidden lg:block w-full lg:w-[400px]">
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
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-orange-600 font-medium md:text-right">
                                        {shippingCost === 0 ? <span className="text-green-600">FREE</span> : `+ ₹${shippingCost}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-green-700">
                                    <span>Discount</span>
                                    <span>- ₹0</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4 mt-4">
                                    <div className="flex justify-between font-bold text-lg text-foreground">
                                        <span>Grand Total</span>
                                        <span>₹{grandTotal}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1 text-right">(Incl. of taxes)</p>
                                </div>
                            </div>

                            {/* Button is now in the fixed bottom bar for consistent access */}
                            <div className="hidden">
                                <Button className="w-full h-12 text-lg gap-2 bg-[#155E42] hover:bg-[#0f4631] shadow-lg animate-shimmer">
                                    Proceed to Pay <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                                <ShieldCheck className="h-3 w-3" /> Safe & Secure Payments
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Fixed Bottom Bar (Visible on ALL screens) - Clean Implementation */}
            <div className="fixed bottom-[56px] md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3 md:p-4 z-40">
                <Container>
                    <div className="flex items-center gap-4 justify-between">
                        <div>
                            <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">Total</p>
                            <p className="text-lg md:text-xl font-bold text-gray-900">₹{grandTotal}</p>
                        </div>
                        <AnimatedTractorButton
                            className="w-full md:w-auto md:min-w-[300px] h-10 md:h-12 text-sm md:text-base font-bold bg-[#155E42] hover:bg-[#0f4631] shadow-lg"
                            label="Proceed to Pay"
                            onClick={() => router.push("/checkout")}
                        />
                    </div>
                </Container>
            </div>
        </div>
    );
}
