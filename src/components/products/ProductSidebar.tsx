"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Filter, Check } from "lucide-react";

const categories = [
    { name: "Organic Jaggery", count: 12 },
    { name: "Heritage Rice", count: 8 },
    { name: "Wood Pressed Oils", count: 6 },
    { name: "Pure Ghee", count: 4 },
    { name: "Traditional Spices", count: 15 },
    { name: "Millet Noodles", count: 9 },
    { name: "Healthy Snacks", count: 20 },
    { name: "Festive Sweets", count: 10 },
];

const prices = [
    { label: "Rs. 0 - Rs. 500", count: 45 },
    { label: "Rs. 500 - Rs. 1000", count: 22 },
    { label: "Rs. 1000 - Rs. 2000", count: 15 },
    { label: "Rs. 2000+", count: 5 },
];

export function ProductSidebar({ className = "hidden lg:block" }: { className?: string }) {
    const [openSections, setOpenSections] = useState({
        collections: true,
        price: true,
        availability: true,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <aside className={`w-full lg:w-64 flex-shrink-0 lg:pr-6 ${className}`}>
            <div className="bg-white rounded-lg shadow-sm border border-[#DAA520]/20 p-6 space-y-6 sticky top-0">
                {/* Header */}
                <div className="flex items-center gap-2 pb-4 border-b border-[#DAA520]/10">
                    <Filter className="h-5 w-5 text-[#6F4E37]" />
                    <span className="font-bold text-[#2C1810]">Filters</span>
                </div>

            {/* Availability */}
            <div className="border-b border-[#DAA520]/10 pb-6">
                <button
                    onClick={() => toggleSection('availability')}
                    className="flex items-center justify-between w-full mb-4 group"
                >
                    <span className="font-semibold text-[#2C1810] group-hover:text-[#6F4E37] transition-colors">Availability</span>
                    {openSections.availability ? <ChevronUp className="h-4 w-4 text-[#DAA520]" /> : <ChevronDown className="h-4 w-4 text-[#DAA520]" />}
                </button>

                {openSections.availability && (
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-5 h-5 border border-[#DAA520] rounded flex items-center justify-center group-hover:border-[#6F4E37] transition-colors">
                                {/* Use a checked state here if implementing logic */}
                                <Check className="h-3.5 w-3.5 text-[#6F4E37] opacity-0 group-hover:opacity-20" />
                            </div>
                            <span className="text-sm text-[#6F4E37] group-hover:text-[#2C1810]">In stock (78)</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-5 h-5 border border-[#DAA520] rounded flex items-center justify-center group-hover:border-[#6F4E37] transition-colors">
                                <Check className="h-3.5 w-3.5 text-[#6F4E37] opacity-0" />
                            </div>
                            <span className="text-sm text-[#999]" >Out of stock (6)</span>
                        </label>
                    </div>
                )}
            </div>

            {/* Collections */}
            <div className="border-b border-[#DAA520]/10 pb-6">
                <button
                    onClick={() => toggleSection('collections')}
                    className="flex items-center justify-between w-full mb-4 group"
                >
                    <span className="font-semibold text-[#2C1810] group-hover:text-[#6F4E37] transition-colors">Collections</span>
                    {openSections.collections ? <ChevronUp className="h-4 w-4 text-[#DAA520]" /> : <ChevronDown className="h-4 w-4 text-[#DAA520]" />}
                </button>

                {openSections.collections && (
                    <div className="space-y-3">
                        {categories.map((cat, idx) => (
                            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-5 h-5 border border-[#DAA520] rounded flex items-center justify-center group-hover:border-[#6F4E37] transition-colors">
                                    {/* Mock Checked state for first item */}
                                    {idx === 0 && <Check className="h-3.5 w-3.5 text-white bg-[#6F4E37] rounded-sm p-0.5" />}
                                </div>
                                <span className={`text-sm ${idx === 0 ? 'font-medium text-[#6F4E37]' : 'text-[#6F4E37] group-hover:text-[#2C1810]'}`}>
                                    {cat.name} <span className="text-[#999] text-xs">({cat.count})</span>
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price */}
            <div className="pb-6">
                <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full mb-4 group"
                >
                    <span className="font-semibold text-[#2C1810] group-hover:text-[#6F4E37] transition-colors">Price</span>
                    {openSections.price ? <ChevronUp className="h-4 w-4 text-[#DAA520]" /> : <ChevronDown className="h-4 w-4 text-[#DAA520]" />}
                </button>

                {openSections.price && (
                    <div className="space-y-3">
                        {prices.map((price, idx) => (
                            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-5 h-5 border border-[#DAA520] rounded flex items-center justify-center group-hover:border-[#6F4E37] transition-colors">
                                    <Check className="h-3.5 w-3.5 text-[#6F4E37] opacity-0 group-hover:opacity-20" />
                                </div>
                                <span className="text-sm text-[#6F4E37] group-hover:text-[#2C1810]">
                                    {price.label} <span className="text-[#999] text-xs">({price.count})</span>
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
            </div>
        </aside>
    );
}
