"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        englishName: "",
        price: "",
        originalPrice: "",
        weight: "1 kg",
        image: "",
        description: "",
        category: "General",
        isBestSeller: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            // @ts-ignore
            setFormData(prev => ({ ...prev, [name]: e.target.checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
                    tags: ["Fresh", "Organic"] // Default tags for now
                })
            });

            if (res.ok) {
                router.push("/admin/products");
            } else {
                alert("Failed to create product");
            }
        } catch (error) {
            alert("Error creating product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                            <input
                                type="text" name="name" required
                                value={formData.name} onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                                placeholder="e.g. Pure Ghee"
                            />
                        </div>
                        {/* English Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">English Name (Optional)</label>
                            <input
                                type="text" name="englishName"
                                value={formData.englishName} onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                                placeholder="e.g. Clarified Butter"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                            <input
                                type="number" name="price" required
                                value={formData.price} onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        {/* Original Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                            <input
                                type="number" name="originalPrice"
                                value={formData.originalPrice} onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        {/* Weight */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                            <input
                                type="text" name="weight"
                                value={formData.weight} onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                        <input
                            type="text" name="image" required
                            value={formData.image} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                            placeholder="https://..."
                        />
                        <p className="text-xs text-gray-500 mt-1">Paste a direct link to an image (e.g. from Cloudinary or Imgur)</p>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description" rows={4}
                            value={formData.description} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox" id="isBestSeller" name="isBestSeller"
                            // @ts-ignore
                            checked={formData.isBestSeller} onChange={handleChange}
                            className="rounded text-green-600 focus:ring-green-500 w-4 h-4"
                        />
                        <label htmlFor="isBestSeller" className="text-sm font-medium text-gray-700">Mark as Best Seller</label>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit" disabled={loading}
                            className="bg-[#155E42] hover:bg-[#0E3F2D] text-white px-6 py-2 rounded-lg"
                        >
                            {loading ? "Saving..." : "Save Product"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
