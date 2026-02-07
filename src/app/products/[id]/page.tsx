"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { 
    Star, Truck, ShieldCheck, Leaf, ChevronRight, MapPin, Heart, ShoppingBag,
    BadgeCheck, Clock, Shield, Check, Package, Zap, Award, Users, TrendingUp,
    Share2, Facebook, Twitter, MessageCircle, Copy, Minus, Plus, X
} from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { useState, useEffect, use } from "react";
import { useCart } from "@/context/CartContext";
import { ProductAccordion, AccordionItem } from "@/components/product/ProductAccordion";
import { RelatedProducts } from "@/components/product/RelatedProducts";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return (
        <ProductDetailContent id={id} />
    );
}

function ProductDetailContent({ id }: { id: string }) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [pincode, setPincode] = useState("");
    const [checkResult, setCheckResult] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [showImageZoom, setShowImageZoom] = useState(false);

    // Hooks
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Try fetching from API
                const res = await fetch(`/api/products?id=${id}`);
                const data = await res.json();

                if (data.success && data.product) {
                    setProduct({
                        ...data.product,
                        images: data.product.images || [data.product.image], // Fallback if no gallery
                        rating: data.product.rating || 4.8,
                        reviews: data.product.reviews || 0,
                    });
                } else {
                    // Fallback for debugging or invalid IDs if needed, or just set null
                    setProduct(null);
                }
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleCheck = () => {
        if (pincode.length === 6) {
            setCheckResult("Delivery available! Est: 3-5 days");
        } else {
            setCheckResult("Please enter valid 6 digit pincode");
        }
    }

    const handleAddToCart = () => {
        if (!product) return;
        addToCart({
            id: product._id || product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            weight: product.weight || "1 kg"
        });
        alert("Added to cart!"); // Simple feedback for now
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-[#F5F5DC]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#DAA520] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading premium goodness...</p>
                </div>
            </div>
        );
    }
    
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-[#F5F5DC]">
                <div className="text-center">
                    <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h2>
                    <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
                    <Link href="/products">
                        <Button>Browse All Products</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    const inStock = product.stock > 0;
    const lowStock = product.stock <= 5 && product.stock > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-white to-[#F5F5DC]">
            {/* Elegant Breadcrumb */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-[#DAA520]/20 py-3.5 sticky top-[60px] md:top-[80px] z-40 shadow-sm">
                <Container>
                    <div className="flex items-center gap-2 text-xs md:text-sm overflow-x-auto no-scrollbar">
                        <Link href="/" className="text-gray-600 hover:text-[#DAA520] font-medium transition-colors whitespace-nowrap">
                            Home
                        </Link>
                        <ChevronRight className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                        <Link href="/products" className="text-gray-600 hover:text-[#DAA520] font-medium transition-colors whitespace-nowrap">
                            Products
                        </Link>
                        <ChevronRight className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                        <span className="text-[#4A3427] font-semibold truncate">{product.name}</span>
                    </div>
                </Container>
            </div>

            <Container className="py-6 md:py-10">
                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mb-12">
                    
                    {/* LEFT: Image Gallery Section */}
                    <div className="space-y-4">
                        {/* Main Image with Premium Frame */}
                        <div className="relative group">
                            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white to-[#F5F5DC] border-2 border-[#DAA520]/30 shadow-2xl relative">
                                {/* Badges Overlay */}
                                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                                    {product.isSeasonBest && (
                                        <div className="bg-gradient-to-r from-[#DAA520] via-[#B8860B] to-[#DAA520] text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl flex items-center gap-2 animate-pulse">
                                            <Zap className="w-4 h-4" />
                                            <span className="tracking-wide">SEASON'S BEST</span>
                                        </div>
                                    )}
                                    {lowStock && (
                                        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
                                            <TrendingUp className="w-3.5 h-3.5" />
                                            <span>Only {product.stock} left!</span>
                                        </div>
                                    )}
                                </div>

                                {/* Discount Badge */}
                                {discount > 0 && (
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="bg-gradient-to-br from-red-600 to-red-500 text-white rounded-2xl px-3 py-2 shadow-2xl transform rotate-3">
                                            <div className="text-2xl font-black leading-none">-{discount}%</div>
                                            <div className="text-[8px] font-bold uppercase tracking-wider">Save Big</div>
                                        </div>
                                    </div>
                                )}

                                {/* Main Product Image */}
                                <Image
                                    src={product.images?.[selectedImage] || product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover p-6 md:p-10 transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />

                                {/* Image Navigation Arrows */}
                                {product.images && product.images.length > 1 && (
                                    <>
                                        <button 
                                            onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10"
                                        >
                                            <ChevronRight className="w-5 h-5 rotate-180 text-gray-700" />
                                        </button>
                                        <button 
                                            onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10"
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-700" />
                                        </button>
                                    </>
                                )}

                                {/* Wishlist & Share Buttons */}
                                <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                                    <button
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        className={`p-3 rounded-full shadow-xl backdrop-blur-md transition-all transform hover:scale-110 ${
                                            isWishlisted 
                                                ? 'bg-red-500 text-white' 
                                                : 'bg-white/90 text-gray-700 hover:bg-white'
                                        }`}
                                    >
                                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                    </button>
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowShareMenu(!showShareMenu)}
                                            className="p-3 bg-white/90 hover:bg-white rounded-full shadow-xl backdrop-blur-md transition-all transform hover:scale-110"
                                        >
                                            <Share2 className="w-5 h-5 text-gray-700" />
                                        </button>
                                        {showShareMenu && (
                                            <div className="absolute bottom-full right-0 mb-2 bg-white rounded-2xl shadow-2xl p-3 space-y-2 min-w-[160px]">
                                                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium">
                                                    <Facebook className="w-4 h-4 text-blue-600" />
                                                    <span>Facebook</span>
                                                </button>
                                                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium">
                                                    <Twitter className="w-4 h-4 text-sky-500" />
                                                    <span>Twitter</span>
                                                </button>
                                                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium">
                                                    <MessageCircle className="w-4 h-4 text-green-600" />
                                                    <span>WhatsApp</span>
                                                </button>
                                                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium">
                                                    <Copy className="w-4 h-4 text-gray-600" />
                                                    <span>Copy Link</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Stock Status Bar */}
                            {inStock && (
                                <div className="mt-4 bg-white rounded-xl p-4 border border-[#DAA520]/20 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-bold text-gray-700">Availability</span>
                                        <span className={`text-sm font-bold ${lowStock ? 'text-orange-600' : 'text-green-600'}`}>
                                            {lowStock ? `Only ${product.stock} left` : 'In Stock'}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full transition-all ${
                                                lowStock ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'
                                            }`}
                                            style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                                        />
                                    </div>
                                    {lowStock && (
                                        <p className="text-xs text-orange-600 mt-2 font-medium">🔥 Hurry! This item is selling fast</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#DAA520] scrollbar-track-gray-200">
                                {product.images.map((img: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                                            selectedImage === i 
                                                ? 'border-[#DAA520] ring-4 ring-[#DAA520]/30 shadow-lg scale-105' 
                                                : 'border-gray-200 hover:border-[#DAA520]/50 opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Trust Signals Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                            <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm hover:shadow-md transition-all group text-center">
                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
                                    <Leaf className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-emerald-900">100% Organic</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-rose-200 shadow-sm hover:shadow-md transition-all group text-center">
                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-rose-50 text-rose-600 mb-2 group-hover:scale-110 transition-transform">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-rose-900">Handmade</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm hover:shadow-md transition-all group text-center">
                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-blue-900">Certified</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-sm hover:shadow-md transition-all group text-center">
                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 text-amber-600 mb-2 group-hover:scale-110 transition-transform">
                                    <Award className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-amber-900">Premium</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Product Info Section */}
                    <div className="lg:sticky lg:top-32 h-fit">
                        <div className="bg-white rounded-3xl shadow-2xl border border-[#DAA520]/20 overflow-hidden">
                            {/* Decorative Header */}
                            <div className="h-2 bg-gradient-to-r from-[#DAA520] via-[#B8860B] to-[#DAA520]"></div>
                            
                            <div className="p-6 md:p-8 space-y-6">
                                {/* Title & Rating */}
                                <div>
                                    <h1 className="font-serif text-3xl md:text-4xl xl:text-5xl font-black text-[#4A3427] mb-4 leading-tight">
                                        {product.name}
                                    </h1>
                                    
                                    <div className="flex flex-wrap items-center gap-3">
                                        {/* Rating */}
                                        <div className="flex items-center gap-2 bg-gradient-to-r from-[#155E42] to-emerald-700 text-white px-4 py-2 rounded-full shadow-lg">
                                            <span className="text-lg font-black">{product.rating}</span>
                                            <Star className="w-4 h-4 fill-current" />
                                        </div>
                                        
                                        {/* Reviews */}
                                        <button className="text-sm font-semibold text-gray-600 hover:text-[#DAA520] border-b-2 border-dotted border-gray-300 hover:border-[#DAA520] transition-colors">
                                            {product.reviews} Customer Reviews
                                        </button>
                                        
                                        {/* Popularity Badge */}
                                        <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200">
                                            <Users className="w-3.5 h-3.5" />
                                            <span className="text-xs font-bold">1000+ sold</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Section with Savings Calculator */}
                                <div className="bg-gradient-to-br from-[#FFF9E6] to-[#FFF3CD] rounded-2xl p-5 border-2 border-[#DAA520]/40">
                                    <div className="flex flex-wrap items-end gap-3 mb-2">
                                        <div>
                                            <span className="text-xs font-medium text-gray-600 block mb-1">Special Price</span>
                                            <span className="text-4xl md:text-5xl font-black text-[#B8860B] font-serif">₹{product.price}</span>
                                        </div>
                                        {product.originalPrice && (
                                            <>
                                                <div className="flex flex-col">
                                                    <span className="text-xl text-gray-400 line-through font-medium">₹{product.originalPrice}</span>
                                                    <span className="text-xs text-gray-500">M.R.P</span>
                                                </div>
                                                <div className="ml-auto bg-gradient-to-r from-red-600 to-rose-500 text-white font-black px-4 py-2 rounded-xl text-lg shadow-lg">
                                                    SAVE {discount}%
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {product.originalPrice && (
                                        <p className="text-sm font-semibold text-green-700">
                                            💰 You save ₹{product.originalPrice - product.price} on this order!
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-600 mt-2">Inclusive of all taxes</p>
                                </div>

                                {/* Quick Benefits */}
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="flex flex-col items-center gap-1.5 bg-blue-50 p-3 rounded-xl border border-blue-200">
                                        <div className="text-blue-600"><Truck className="w-4 h-4" /></div>
                                        <span className="text-xs font-bold text-blue-900 text-center leading-tight">Free Delivery</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1.5 bg-purple-50 p-3 rounded-xl border border-purple-200">
                                        <div className="text-purple-600"><Clock className="w-4 h-4" /></div>
                                        <span className="text-xs font-bold text-purple-900 text-center leading-tight">24h Dispatch</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1.5 bg-green-50 p-3 rounded-xl border border-green-200">
                                        <div className="text-green-600"><Package className="w-4 h-4" /></div>
                                        <span className="text-xs font-bold text-green-900 text-center leading-tight">Secure Pack</span>
                                    </div>
                                </div>

                                {/* Delivery Checker - Premium Card */}
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200 shadow-inner">
                                    <div className="flex items-center gap-2 mb-3">
                                        <MapPin className="w-5 h-5 text-[#DAA520]" />
                                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Delivery Options</h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Enter pincode"
                                            maxLength={6}
                                            value={pincode}
                                            onChange={(e) => setPincode(e.target.value)}
                                            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-sm font-medium focus:outline-none focus:border-[#DAA520] focus:ring-4 focus:ring-[#DAA520]/20 transition-all"
                                        />
                                        <Button 
                                            variant="outline" 
                                            onClick={handleCheck}
                                            className="px-6 py-3 bg-[#DAA520] hover:bg-[#B8860B] text-white border-0 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                        >
                                            Check
                                        </Button>
                                    </div>
                                    {checkResult && (
                                        <div className="mt-3 flex items-start gap-2 bg-green-50 p-3 rounded-xl border border-green-200">
                                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-bold text-green-900">{checkResult}</p>
                                                <p className="text-xs text-green-700 mt-0.5">Expected delivery by {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Quantity Selector & Add to Cart */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-gray-700">Quantity:</span>
                                        <div className="flex items-center bg-white border-2 border-gray-300 rounded-xl overflow-hidden shadow-sm">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700 font-bold"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="px-6 py-3 font-black text-lg text-gray-900 min-w-[60px] text-center border-x-2 border-gray-300">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700 font-bold"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-sm text-gray-600 ml-auto font-medium">
                                            {product.weight}
                                        </span>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            onClick={handleAddToCart}
                                            disabled={!inStock}
                                            className="flex-1 h-14 text-lg font-black bg-gradient-to-r from-[#155E42] via-emerald-700 to-[#155E42] hover:from-[#0f4631] hover:via-emerald-800 hover:to-[#0f4631] text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] active:scale-95 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ShoppingBag className="w-5 h-5 mr-2" />
                                            {inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="h-14 w-14 border-2 border-[#DAA520] hover:bg-[#DAA520] hover:text-white transition-all rounded-xl shadow-lg"
                                        >
                                            <Heart className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Product Details Accordion */}
                                <div className="border-t border-gray-200 pt-6">
                                    <ProductAccordion>
                                        <AccordionItem title="📝 Product Description" defaultOpen={true}>
                                            <p className="text-gray-700 leading-relaxed text-sm">
                                                {product.description || "Experience the authentic taste of tradition with our premium quality product. Crafted with love using time-honored recipes and the finest handpicked ingredients. Every bite delivers pure, natural goodness without any artificial preservatives or additives."}
                                            </p>
                                        </AccordionItem>
                                        <AccordionItem title="🌿 Ingredients & Nutrition">
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li className="flex items-start gap-2">
                                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span>Premium Handpicked Natural Ingredients</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span>Traditional Spices & Herbs</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span>No Artificial Preservatives or Colors</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span>100% Natural & Organic</span>
                                                </li>
                                            </ul>
                                        </AccordionItem>
                                        <AccordionItem title="📦 Storage & Shelf Life">
                                            <div className="space-y-3 text-sm text-gray-700">
                                                <div className="flex items-start gap-2">
                                                    <Clock className="w-4 h-4 text-[#DAA520] flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-semibold text-gray-900">Shelf Life:</p>
                                                        <p>3 Months from date of packing</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <Package className="w-4 h-4 text-[#DAA520] flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-semibold text-gray-900">Storage Instructions:</p>
                                                        <p>Store in a cool, dry place away from direct sunlight. Transfer to an airtight container after opening to maintain freshness.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionItem>
                                    </ProductAccordion>
                                </div>

                                {/* Security Badges */}
                                <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gray-200">
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                        <Shield className="w-4 h-4 text-green-600" />
                                        <span>100% Secure</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                        <BadgeCheck className="w-4 h-4 text-blue-600" />
                                        <span>Certified Organic</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                        <Award className="w-4 h-4 text-amber-600" />
                                        <span>Premium Quality</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-16 pt-12 border-t-2 border-gray-200">
                    <RelatedProducts currentId={id} />
                </div>
            </Container>

            {/* Mobile Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t-2 border-[#DAA520]/40 px-4 py-3 md:hidden z-50 shadow-2xl">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <p className="text-xs text-gray-600 font-medium">Price</p>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-[#B8860B]">₹{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                            )}
                        </div>
                    </div>
                    <Button
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        className="h-12 px-6 bg-gradient-to-r from-[#155E42] to-emerald-700 hover:from-[#0f4631] hover:to-emerald-800 text-white font-black rounded-xl shadow-xl active:scale-95 transition-transform text-sm"
                    >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
