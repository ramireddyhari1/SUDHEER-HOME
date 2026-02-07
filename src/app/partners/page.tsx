'use client';

import { useState, useEffect } from 'react';
import { Store, TrendingUp, Users, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Partner {
    _id: string;
    name: string;
    description?: string;
    partnerCode: string;
    website?: string;
    logo?: string;
}

export default function PartnersPage() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const res = await fetch('/api/partners?active=true');
            const data = await res.json();
            if (data.success) {
                setPartners(data.data);
            }
        } catch (error) {
            console.error('Error fetching partners:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShopWithPartner = (partnerCode: string) => {
        // Store partner code in localStorage
        localStorage.setItem('partnerCode', partnerCode);
        // Redirect to products page
        router.push('/products');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg text-gray-600">Loading partners...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
            {/* Hero Section */}
            <div className="bg-[#155E42] text-white py-16 relative">
                {/* Partner Login Button - Top Right */}
                <div className="absolute top-6 right-6">
                    <Link
                        href="/partners/login"
                        className="px-6 py-2.5 bg-white text-[#155E42] rounded-lg font-semibold hover:bg-green-50 transition shadow-lg"
                    >
                        Partner Login
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Users className="mx-auto h-16 w-16 mb-4" />
                        <h1 className="text-4xl font-bold mb-4">Our Trusted Partners</h1>
                        <p className="text-xl text-green-100 max-w-2xl mx-auto">
                            Shop organic products through our verified partners and enjoy exclusive benefits
                        </p>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <Store className="mx-auto h-12 w-12 text-[#155E42] mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Verified Partners</h3>
                        <p className="text-gray-600">All partners are carefully vetted to ensure quality service</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <TrendingUp className="mx-auto h-12 w-12 text-[#155E42] mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Special Offers</h3>
                        <p className="text-gray-600">Get exclusive discounts when shopping through partners</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <Award className="mx-auto h-12 w-12 text-[#155E42] mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Trusted Quality</h3>
                        <p className="text-gray-600">100% authentic organic products from trusted sources</p>
                    </div>
                </div>

                {/* Partners Grid */}
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse Our Partners</h2>

                {partners.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-500">No partners available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {partners.map((partner) => (
                            <div
                                key={partner._id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                            >
                                {partner.logo ? (
                                    <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-h-32 max-w-full object-contain p-4"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                                        <Store className="h-20 w-20 text-[#155E42] opacity-50" />
                                    </div>
                                )}

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>

                                    {partner.description && (
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {partner.description}
                                        </p>
                                    )}

                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded-full">
                                            Code: {partner.partnerCode}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleShopWithPartner(partner.partnerCode)}
                                            className="flex-1 bg-[#155E42] text-white py-2 px-4 rounded-lg hover:bg-[#124a35] transition font-medium"
                                        >
                                            Shop Now
                                        </button>

                                        {partner.website && (
                                            <a
                                                href={partner.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700"
                                            >
                                                Visit
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
