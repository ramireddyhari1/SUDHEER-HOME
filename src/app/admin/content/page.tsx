"use client";

import Link from "next/link";
import { ArrowRight, Image as ImageIcon, Type, Layout } from "lucide-react";

export default function AdminContentPage() {
    const editableSections = [
        { id: "home-hero", name: "Home Banner Carousel", description: "Edit slides, images, and text for the main home banner.", icon: ImageIcon },
        { id: "products-banner", name: "Products Page Banner", description: "Manage banner carousel on the products page.", icon: ImageIcon },
        { id: "home-story", name: "Our Story Section", description: "Update the 'Our Roots' texts and images.", icon: Type },
        { id: "footer", name: "Footer Information", description: "Manage links and contact info.", icon: Layout },
    ];

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Site Content</h1>
                <p className="text-gray-500">Manage text and images across the website</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {editableSections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <Link href={`/admin/content/${section.id}`} key={section.id}>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group h-full flex flex-col">
                                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-[#155E42] mb-4 group-hover:bg-[#155E42] group-hover:text-white transition-colors">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{section.name}</h3>
                                <p className="text-gray-500 text-sm mb-6 flex-grow">{section.description}</p>
                                <div className="flex items-center text-[#155E42] font-medium gap-2 group-hover:gap-3 transition-all">
                                    Edit Content <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
