"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    image: string;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            console.log("Admin API Response:", data);

            if (data.success && Array.isArray(data.products)) {
                setProducts(data.products);
                // If isMock is top-level, we might want to attach it to the products or handle it separately
                // For now, we rely on the product name check in the UI
            } else {
                console.error("API returned success:false or invalid products array", data);
                // Optional: set empty or error state
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`/api/products?id=${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (data.success) {
                // Refresh list
                fetchProducts();
            } else {
                alert("Failed to delete product: " + data.message);
            }
        } catch (error) {
            console.error("Delete failed", error);
            alert("Error deleting product");
        }
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Products</h1>
                    <p className="text-gray-500">Manage your inventory</p>
                </div>
                <Link href="/admin/products/add">
                    <Button className="bg-[#155E42] hover:bg-[#0E3F2D] text-white flex items-center gap-2 px-4 py-2 rounded-lg w-full md:w-auto justify-center">
                        <Plus className="w-5 h-5" />
                        Add Product
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading products...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px] md:min-w-0">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Image</th>
                                    <th className="px-6 py-4 font-medium">Name</th>
                                    <th className="px-6 py-4 font-medium">Category</th>
                                    <th className="px-6 py-4 font-medium">Price</th>
                                    <th className="px-6 py-4 font-medium">Stock</th>
                                    <th className="px-6 py-4 font-medium text-right md:text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                        <td className="px-6 py-4 font-medium text-[#155E42]">₹{product.price}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 justify-end md:justify-start">
                                                <Link href={`/admin/products/edit/${product._id}`}>
                                                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-[#155E42]">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-500"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
