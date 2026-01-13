"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    // Unwrap params using React.use() as per Next.js 15+ patterns or await it if component is async (but this is client)
    // Actually in Next 15 client components, params is a promise.
    const { id } = use(params);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        _id: "",
        name: "",
        englishName: "",
        price: "",
        originalPrice: "",
        discount: "", // New
        weight: "1 kg",
        stock: 0, // New
        image: "",
        description: "",
        category: "General",
        // Flags
        isSeasonBest: false,
        isFeatured: false,
        isNewArrival: false,
        isOrganicCollection: false,
        isTopRated: false,
        status: 'active'
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products?id=${id}`);
                const data = await res.json();

                if (data.success && data.product) {
                    setFormData({
                        ...data.product,
                        price: data.product.price.toString(),
                        originalPrice: data.product.originalPrice ? data.product.originalPrice.toString() : "",
                        discount: data.product.discount ? data.product.discount.toString() : "",
                        stock: data.product.stock || 0,
                        // Ensure bools are bools
                        isSeasonBest: !!data.product.isSeasonBest,
                        isFeatured: !!data.product.isFeatured,
                        isNewArrival: !!data.product.isNewArrival,
                        isOrganicCollection: !!data.product.isOrganicCollection,
                        isTopRated: !!data.product.isTopRated,
                    });
                } else {
                    alert("Product not found");
                    router.push("/admin/products");
                }
            } catch (error) {
                alert("Error fetching product details");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, router]);

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
        setSaving(true);

        try {
            const res = await fetch('/api/products', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
                })
            });

            if (res.ok) {
                router.push("/admin/products");
            } else {
                const data = await res.json();
                alert("Failed to update product: " + data.message);
            }
        } catch (error) {
            alert("Error updating product");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-12 text-center text-gray-500">Loading product details...</div>;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
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
                            />
                        </div>
                        {/* English Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">English Name (Optional)</label>
                            <input
                                type="text" name="englishName"
                                value={formData.englishName} onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                            <div className="flex gap-2">
                                <input
                                    type="number" name="stock"
                                    // @ts-ignore
                                    value={formData.stock || 0} onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, stock: 0 }))}
                                    className="px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 whitespace-nowrap"
                                    title="Set stock to 0"
                                >
                                    Out Supply
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image *</label>

                        <div className="flex items-start gap-4">
                            {/* Preview */}
                            <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                                {formData.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>
                                )}
                            </div>

                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        // Upload Logic
                                        const uploadData = new FormData();
                                        uploadData.append('file', file);

                                        // Optional: Set loading state for upload here
                                        const btn = e.target as HTMLInputElement;
                                        const originalText = btn.previousElementSibling?.textContent;

                                        try {
                                            const res = await fetch('/api/upload', {
                                                method: 'POST',
                                                body: uploadData
                                            });
                                            const data = await res.json();

                                            if (data.success) {
                                                setFormData(prev => ({ ...prev, image: data.url }));
                                            } else {
                                                alert("Upload failed");
                                            }
                                        } catch (err) {
                                            alert("Error uploading image");
                                        }
                                    }}
                                    className="block w-full text-sm text-gray-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-green-50 file:text-green-700
                                      hover:file:bg-green-100
                                    "
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Upload a new image to replace the current one.
                                </p>
                                <input type="hidden" name="image" value={formData.image} />
                            </div>
                        </div>
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

                    {/* Collections & Visibility */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Visibility & Collections</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox" id="isSeasonBest" name="isSeasonBest"
                                    // @ts-ignore
                                    checked={formData.isSeasonBest} onChange={handleChange}
                                    className="rounded text-green-600 focus:ring-green-500 w-4 h-4"
                                />
                                <label htmlFor="isSeasonBest" className="text-sm font-medium text-gray-700">Season's Best Seller</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox" id="isFeatured" name="isFeatured"
                                    // @ts-ignore
                                    checked={formData.isFeatured} onChange={handleChange}
                                    className="rounded text-green-600 focus:ring-green-500 w-4 h-4"
                                />
                                <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">Featured Product</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox" id="isOrganicCollection" name="isOrganicCollection"
                                    // @ts-ignore
                                    checked={formData.isOrganicCollection} onChange={handleChange}
                                    className="rounded text-green-600 focus:ring-green-500 w-4 h-4"
                                />
                                <label htmlFor="isOrganicCollection" className="text-sm font-medium text-gray-700">Organic Collection</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox" id="isNewArrival" name="isNewArrival"
                                    // @ts-ignore
                                    checked={formData.isNewArrival} onChange={handleChange}
                                    className="rounded text-green-600 focus:ring-green-500 w-4 h-4"
                                />
                                <label htmlFor="isNewArrival" className="text-sm font-medium text-gray-700">New Arrival</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox" id="isTopRated" name="isTopRated"
                                    // @ts-ignore
                                    checked={formData.isTopRated} onChange={handleChange}
                                    className="rounded text-green-600 focus:ring-green-500 w-4 h-4"
                                />
                                <label htmlFor="isTopRated" className="text-sm font-medium text-gray-700">Top Rated</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit" disabled={saving}
                            className="bg-[#155E42] hover:bg-[#0E3F2D] text-white px-6 py-2 rounded-lg"
                        >
                            {saving ? (
                                <span className="flex items-center gap-2">
                                    <Save className="w-4 h-4 animate-spin" /> Saving...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Save className="w-4 h-4" /> Update Product
                                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
