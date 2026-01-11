"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface ContentField {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'image';
    placeholder?: string;
    description?: string;
}

const SECTIONS: Record<string, { title: string, fields: ContentField[] }> = {
    "home-hero": {
        title: "Home Banner",
        fields: [
            { key: "hero_title", label: "Main Title", type: "text", placeholder: "e.g., Pure. Organic. Traditional." },
            { key: "hero_subtitle", label: "Subtitle", type: "textarea", placeholder: "e.g., Experience the goodness of nature..." },
            { key: "hero_btn_text", label: "Button Text", type: "text", placeholder: "e.g., Shop Now" },
            { key: "announcement_text", label: "Announcement Bar", type: "text", placeholder: "e.g., Free Shipping on orders over ₹999" },
        ]
    },
    "footer": {
        title: "Footer Information",
        fields: [
            { key: "footer_address", label: "Address", type: "textarea", placeholder: "e.g., 123 Farm Road..." },
            { key: "footer_email", label: "Support Email", type: "text", placeholder: "e.g., hello@vaishnaviorganics.com" },
            { key: "footer_phone", label: "Support Phone", type: "text", placeholder: "e.g., +91 1234567890" },
            { key: "footer_copyright", label: "Copyright Text", type: "text", placeholder: "e.g., Vaishnavi Organics" },
        ]
    },
    // Add more sections here later
};

export default function EditContentPage({ params }: { params: Promise<{ section: string }> }) {
    const router = useRouter();
    const { section } = use(params);
    const sectionConfig = SECTIONS[section];

    const [formData, setFormData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!sectionConfig) return;

        const fetchContent = async () => {
            try {
                const res = await fetch(`/api/content?section=${section}`);
                const data = await res.json();
                if (data.success && data.content) {
                    setFormData(data.content);
                }
            } catch (error) {
                console.error("Failed to load content");
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [section, sectionConfig]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    section: section,
                    updates: formData
                })
            });

            if (res.ok) {
                alert("Content updated successfully!");
                router.refresh();
            } else {
                throw new Error("Failed to save");
            }
        } catch (error) {
            alert("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    if (!sectionConfig) {
        return <div className="p-8">Section not found.</div>;
    }

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <header className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/content" className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Edit {sectionConfig.title}</h1>
                        <p className="text-gray-500">Update the content for this section</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#155E42] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#104a33] disabled:opacity-50 transition-colors"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading current content...</div>
                ) : (
                    <div className="space-y-6">
                        {sectionConfig.fields.map((field) => (
                            <div key={field.key}>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    {field.label}
                                </label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        value={formData[field.key] || ''}
                                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                        placeholder={field.placeholder}
                                        rows={4}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#155E42] outline-none transition-shadow"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={formData[field.key] || ''}
                                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                        placeholder={field.placeholder}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#155E42] outline-none transition-shadow"
                                    />
                                )}
                                {field.description && (
                                    <p className="text-xs text-gray-500 mt-1">{field.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
