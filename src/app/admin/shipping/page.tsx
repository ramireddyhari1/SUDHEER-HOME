"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, Save, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface ShippingRate {
    region: string;
    price: string;
    time: string;
    color: string;
}

const COLOR_PRESETS = [
    { name: "Blue", class: "bg-blue-50 border-blue-200" },
    { name: "Purple", class: "bg-purple-50 border-purple-200" },
    { name: "Green", class: "bg-green-50 border-green-200" },
    { name: "Orange", class: "bg-orange-50 border-orange-200" },
    { name: "Red", class: "bg-red-50 border-red-200" },
];

export default function AdminShippingPage() {
    const [rates, setRates] = useState<ShippingRate[]>([]);
    const [checkoutConfig, setCheckoutConfig] = useState({ standardCost: "50", freeThreshold: "500" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchRates();
    }, []);

    const fetchRates = async () => {
        try {
            // Fetch Display Rates
            const resRates = await fetch("/api/content?section=shipping-rates");
            const jsonRates = await resRates.json();
            if (jsonRates.success && jsonRates.content && jsonRates.content.rates) {
                setRates(jsonRates.content.rates);
            } else {
                setRates([
                    { region: "USA & Canada", price: "₹2500", time: "3-5 Days", color: "bg-blue-50 border-blue-200" },
                    { region: "UK & Europe", price: "₹2200", time: "3-5 Days", color: "bg-purple-50 border-purple-200" },
                ]);
            }

            // Fetch Checkout Config
            const resConfig = await fetch("/api/content?section=checkout-shipping");
            const jsonConfig = await resConfig.json();
            if (jsonConfig.success && jsonConfig.content) {
                setCheckoutConfig({
                    standardCost: jsonConfig.content.standardCost || "50",
                    freeThreshold: jsonConfig.content.freeThreshold || "500"
                });
            }
        } catch (error) {
            console.error("Failed to fetch rates", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Save Display Rates
            const resRates = await fetch("/api/content", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    section: "shipping-rates",
                    updates: { rates }
                })
            });

            // Save Checkout Config
            const resConfig = await fetch("/api/content", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    section: "checkout-shipping",
                    updates: checkoutConfig
                })
            });

            const jsonRates = await resRates.json();
            const jsonConfig = await resConfig.json();

            if (jsonRates.success && jsonConfig.success) {
                alert("Shipping settings updated successfully!");
            } else {
                alert("Failed to update some settings.");
            }
        } catch (error) {
            console.error("Save error", error);
            alert("Error saving.");
        } finally {
            setSaving(false);
        }
    };

    const addRate = () => {
        setRates([...rates, { region: "New Region", price: "₹0", time: "3-5 Days", color: "bg-gray-50 border-gray-200" }]);
    };

    const removeRate = (index: number) => {
        const newRates = [...rates];
        newRates.splice(index, 1);
        setRates(newRates);
    };

    const updateRate = (index: number, field: keyof ShippingRate, value: string) => {
        const newRates = [...rates];
        newRates[index] = { ...newRates[index], [field]: value };
        setRates(newRates);
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <Container className="py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Shipping</h1>
                <Button onClick={handleSave} disabled={saving} className="flex gap-2 bg-[#155E42] text-white">
                    {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </Button>
            </div>

            {/* DOMESTIC / CHECKOUT CONFIGURATION */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 bg-[#DAA520] rounded-full"></span>
                    Domestic Checkout Configuration
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Standard Shipping Cost (₹)</label>
                        <input
                            type="number"
                            min="0"
                            value={checkoutConfig.standardCost}
                            onChange={(e) => setCheckoutConfig({ ...checkoutConfig, standardCost: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#155E42] focus:border-[#155E42] outline-none"
                            placeholder="50"
                        />
                        <p className="text-xs text-gray-500 mt-1">Applied when order value is below threshold.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold (₹)</label>
                        <input
                            type="number"
                            min="0"
                            value={checkoutConfig.freeThreshold}
                            onChange={(e) => setCheckoutConfig({ ...checkoutConfig, freeThreshold: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#155E42] focus:border-[#155E42] outline-none"
                            placeholder="500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Orders above this value get FREE shipping.</p>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                    International Display Rates
                </h2>
                <p className="text-sm text-gray-500 mb-4">These rates are displayed on the "Global Shipping" page, not used in checkout.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rates.map((rate, idx) => (
                    <div key={idx} className={`relative p-6 rounded-2xl border-2 ${rate.color.replace('bg-', 'bg-opacity-50 ')} shadow-sm bg-white`}>
                        <button
                            onClick={() => removeRate(idx)}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 p-1"
                            aria-label="Remove rate"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="space-y-4 pt-2">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Region Name</label>
                                <input
                                    className="w-full border rounded p-2 mt-1 text-sm font-bold"
                                    value={rate.region}
                                    onChange={(e) => updateRate(idx, "region", e.target.value)}
                                    aria-label="Region Name"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Price</label>
                                    <input
                                        className="w-full border rounded p-2 mt-1 text-sm"
                                        value={rate.price}
                                        onChange={(e) => updateRate(idx, "price", e.target.value)}
                                        aria-label="Price"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Time</label>
                                    <input
                                        className="w-full border rounded p-2 mt-1 text-sm"
                                        value={rate.time}
                                        onChange={(e) => updateRate(idx, "time", e.target.value)}
                                        aria-label="Time"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Color Theme</label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {COLOR_PRESETS.map((preset) => (
                                        <button
                                            key={preset.name}
                                            onClick={() => updateRate(idx, "color", preset.class)}
                                            className={`w-6 h-6 rounded-full border ${preset.name === "Blue" ? "bg-blue-200" : preset.name === "Purple" ? "bg-purple-200" : preset.name === "Green" ? "bg-green-200" : preset.name === "Orange" ? "bg-orange-200" : "bg-red-200"} ${rate.color === preset.class ? "ring-2 ring-offset-1 ring-gray-400" : ""}`}
                                            title={preset.name}
                                            aria-label={`Select ${preset.name} color`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Button */}
                <button
                    onClick={addRate}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all text-gray-500 min-h-[250px]"
                >
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="font-bold">Add New Region</span>
                </button>
            </div>
        </Container>
    );
}
