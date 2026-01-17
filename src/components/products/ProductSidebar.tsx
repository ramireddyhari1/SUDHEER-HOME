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
        <aside className={`w-full lg:w-64 flex-shrink-0 lg:pr-6 space-y-8 ${className}`}>
            {/* Header */}
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="font-bold text-gray-900">Filters</span>
            </div>

            {/* Availability */}
            <div className="border-b border-gray-100 pb-6">
                <button
                    onClick={() => toggleSection('availability')}
                    className="flex items-center justify-between w-full mb-4 group"
                >
                    <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">Availability</span>
                    {openSections.availability ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                </button>

                {openSections.availability && (
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center group-hover:border-primary transition-colors">
                                {/* Use a checked state here if implementing logic */}
                                <Check className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-20" />
                            </div>
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">In stock (78)</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center group-hover:border-primary transition-colors">
                                <Check className="h-3.5 w-3.5 text-primary opacity-0" />
                            </div>
                            <span className="text-sm text-gray-400">Out of stock (6)</span>
                        </label>
                    </div>
                )}
            </div>

            {/* Collections */}
            <div className="border-b border-gray-100 pb-6">
                <button
                    onClick={() => toggleSection('collections')}
                    className="flex items-center justify-between w-full mb-4 group"
                >
                    <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">Collections</span>
                    {openSections.collections ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                </button>

                {openSections.collections && (
                    <div className="space-y-3">
                        {categories.map((cat, idx) => (
                            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center group-hover:border-primary transition-colors">
                                    {/* Mock Checked state for first item */}
                                    {idx === 0 && <Check className="h-3.5 w-3.5 text-white bg-primary rounded-sm p-0.5" />}
                                </div>
                                <span className={`text-sm ${idx === 0 ? 'font-medium text-primary' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                    {cat.name} <span className="text-gray-400 text-xs">({cat.count})</span>
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
                    <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">Price</span>
                    {openSections.price ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                </button>

                {openSections.price && (
                    <div className="space-y-3">
                        {prices.map((price, idx) => (
                            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center group-hover:border-primary transition-colors">
                                    <Check className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-20" />
                                </div>
                                <span className="text-sm text-gray-600 group-hover:text-gray-900">
                                    {price.label} <span className="text-gray-400 text-xs">({price.count})</span>
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

        </aside>
    );
}
