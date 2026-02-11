"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Upload } from "lucide-react";
import Link from "next/link";

interface ContentField {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'image' | 'slides';
    placeholder?: string;
    description?: string;
}

const SECTIONS: Record<string, { title: string, fields: ContentField[] }> = {
    "home-hero": {
        title: "Home Banner Carousel",
        fields: [
            {
                key: "hero_slides",
                label: "Banner Slides",
                type: "slides",
                description: "Add multiple slides for the homepage banner. Each slide can have its own text and image."
            },
            { key: "announcement_text", label: "Announcement Bar", type: "text", placeholder: "e.g., Free Shipping on orders over ₹999" },
        ]
    },
    "home-story": {
        title: "Our Story Section",
        fields: [
            { key: "story_title", label: "Section Title", type: "text", placeholder: "e.g., Our Roots" },
            { key: "story_subtitle", label: "Subtitle", type: "text", placeholder: "e.g., A Legacy of Tradition" },
            { key: "story_description", label: "Description", type: "textarea", placeholder: "e.g., Use this space to tell your brand story..." },
            { key: "story_image_url", label: "Story Image", type: "image" },
        ]
    },
    "products-banner": {
        title: "Products Page Banner",
        fields: [
            {
                key: "products_banner_slides",
                label: "Products Banner Slides",
                type: "slides",
                description: "Add banner slides for the products page. These appear at the top of the /products page."
            },
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
};

export default function EditContentPage({ params }: { params: Promise<{ section: string }> }) {
    const router = useRouter();
    const { section } = use(params);
    const sectionConfig = SECTIONS[section];

    const [formData, setFormData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);

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
            // Ensure any slides fields are arrays before saving
            const updatesToSave = { ...formData };
            if (sectionConfig) {
                sectionConfig.fields.forEach((field) => {
                    if (field.type === 'slides' && !updatesToSave[field.key]) {
                        updatesToSave[field.key] = [];
                    }
                });
            }

            const res = await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    section: section,
                    updates: updatesToSave
                })
            });

            if (res.ok) {
                alert("Content updated successfully!");
                router.refresh();
            } else {
                const data = await res.json();
                throw new Error(data.message || "Failed to save");
            }
        } catch (error) {
            alert(error instanceof Error ? error.message : "Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldKey: string, slideIndex?: number, imageField?: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imgField = imageField || 'image';
        const uploadKey = slideIndex !== undefined ? `${fieldKey}-${slideIndex}-${imgField}` : fieldKey;
        setUploading(uploadKey);

        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadData
            });
            const data = await res.json();

            if (data.success) {
                if (slideIndex !== undefined) {
                    const slidesField = sectionConfig?.fields.find(f => f.type === 'slides');
                    const slidesKey = slidesField?.key || 'hero_slides';
                    const slides = [...(formData[slidesKey] || [])];
                    if (!slides[slideIndex]) slides[slideIndex] = {};
                    slides[slideIndex][imgField] = data.url;
                    setFormData({ ...formData, [slidesKey]: slides });
                } else {
                    setFormData((prev: any) => ({ ...prev, [fieldKey]: data.url }));
                }
            } else {
                alert("Upload failed");
            }
        } catch (err) {
            alert("Error uploading image");
        } finally {
            setUploading(null);
        }
    };

    // Helper to manage slides — generic for any slides field key
    const getSlidesKey = () => {
        const slidesField = sectionConfig?.fields.find(f => f.type === 'slides');
        return slidesField?.key || 'hero_slides';
    };

    const updateSlide = (index: number, field: string, value: string) => {
        const key = getSlidesKey();
        const slides = [...(formData[key] || [])];
        if (!slides[index]) slides[index] = {};
        slides[index][field] = value;
        setFormData({ ...formData, [key]: slides });
    };

    const addSlide = () => {
        const key = getSlidesKey();
        const slides = [...(formData[key] || [])];
        slides.push({ title: "New Slide", subtitle: "Subtitle", buttonText: "Shop Now", link: "/products", image: "", mobileImage: "" });
        setFormData({ ...formData, [key]: slides });
    };

    const removeSlide = (index: number) => {
        const key = getSlidesKey();
        const slides = [...(formData[key] || [])];
        slides.splice(index, 1);
        setFormData({ ...formData, [key]: slides });
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
                    <div className="space-y-8">
                        {sectionConfig.fields.map((field) => (
                            <div key={field.key}>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    {field.label}
                                </label>

                                {field.type === 'slides' ? (
                                    <div className="space-y-4">
                                        {(formData[field.key] || []).map((slide: any, index: number) => (
                                            <div key={index} className="p-4 border border-gray-200 rounded-xl bg-gray-50 relative">
                                                <button
                                                    onClick={() => removeSlide(index)}
                                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold"
                                                >
                                                    Remove
                                                </button>
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Slide {index + 1}</h4>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-xs font-medium text-gray-600 block mb-1">Title</label>
                                                        <input
                                                            type="text"
                                                            value={slide.title || ""}
                                                            onChange={(e) => updateSlide(index, 'title', e.target.value)}
                                                            className="w-full text-sm border border-gray-300 rounded px-3 py-2"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium text-gray-600 block mb-1">Subtitle</label>
                                                        <input
                                                            type="text"
                                                            value={slide.subtitle || ""}
                                                            onChange={(e) => updateSlide(index, 'subtitle', e.target.value)}
                                                            className="w-full text-sm border border-gray-300 rounded px-3 py-2"
                                                        />
                                                    </div>

                                                    {/* Desktop Image Upload */}
                                                    <div className="md:col-span-2 p-3 bg-blue-50/50 border border-blue-200/50 rounded-xl">
                                                        <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-2">🖥️ Desktop Image</label>
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-24 h-14 bg-gray-100 border rounded-lg overflow-hidden flex-shrink-0 relative">
                                                                {slide.image ? (
                                                                    <img src={slide.image} alt="Desktop Preview" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="flex items-center justify-center h-full text-[10px] text-gray-400">No Image</div>
                                                                )}
                                                                {uploading === `${field.key}-${index}-image` && (
                                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1 space-y-1.5">
                                                                <div className="flex gap-2">
                                                                    <label className="cursor-pointer bg-[#155E42] hover:bg-[#104a33] text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
                                                                        <Upload className="w-3 h-3" />
                                                                        Upload
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            className="hidden"
                                                                            onChange={(e) => handleImageUpload(e, field.key, index, 'image')}
                                                                        />
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Or paste image URL"
                                                                        value={slide.image || ""}
                                                                        onChange={(e) => updateSlide(index, 'image', e.target.value)}
                                                                        className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-1.5"
                                                                    />
                                                                </div>
                                                                <p className="text-[10px] text-gray-400">Recommended: 1600×472px (landscape). WebP or JPG.</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Mobile Image Upload */}
                                                    <div className="md:col-span-2 p-3 bg-orange-50/50 border border-orange-200/50 rounded-xl">
                                                        <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-2">📱 Mobile Image</label>
                                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                                            <div className="w-14 h-14 bg-gray-100 border rounded-lg overflow-hidden flex-shrink-0 relative">
                                                                {slide.mobileImage ? (
                                                                    <img src={slide.mobileImage} alt="Mobile Preview" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="flex items-center justify-center h-full text-[10px] text-gray-400">No Image</div>
                                                                )}
                                                                {uploading === `${field.key}-${index}-mobileImage` && (
                                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1 w-full space-y-2">
                                                                <label className="cursor-pointer bg-[#B8860B] hover:bg-[#996F0A] text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors w-full sm:w-auto">
                                                                    <Upload className="w-4 h-4" />
                                                                    Upload Mobile Image
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        className="hidden"
                                                                        onChange={(e) => handleImageUpload(e, field.key, index, 'mobileImage')}
                                                                    />
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Or paste mobile image URL"
                                                                    value={slide.mobileImage || ""}
                                                                    onChange={(e) => updateSlide(index, 'mobileImage', e.target.value)}
                                                                    className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2"
                                                                />
                                                                <p className="text-[10px] text-gray-400">Recommended: 800×800px (square). Falls back to desktop if empty.</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="text-xs font-medium text-gray-600 block mb-1">Button Text</label>
                                                            <input
                                                                type="text"
                                                                value={slide.buttonText || ""}
                                                                onChange={(e) => updateSlide(index, 'buttonText', e.target.value)}
                                                                className="w-full text-sm border border-gray-300 rounded px-3 py-2"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-xs font-medium text-gray-600 block mb-1">Button Link</label>
                                                            <input
                                                                type="text"
                                                                value={slide.link || ""}
                                                                onChange={(e) => updateSlide(index, 'link', e.target.value)}
                                                                className="w-full text-sm border border-gray-300 rounded px-3 py-2"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            onClick={addSlide}
                                            className="w-full py-3 border-2 border-dashed border-[#155E42] text-[#155E42] font-bold rounded-xl hover:bg-[#155E42]/5 transition-colors"
                                        >
                                            + Add Slide
                                        </button>
                                    </div>
                                ) : field.type === 'textarea' ? (
                                    <textarea
                                        value={formData[field.key] || ''}
                                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                        placeholder={field.placeholder}
                                        rows={4}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#155E42] outline-none transition-shadow"
                                    />
                                ) : field.type === 'image' ? (
                                    <div className="flex items-start gap-6 p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                                        {/* Image Preview */}
                                        <div className="relative w-32 h-32 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                            {formData[field.key] ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={formData[field.key]}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-gray-400 text-xs text-center p-2">No Image</div>
                                            )}
                                        </div>

                                        {/* Upload Controls */}
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={formData[field.key] || ''}
                                                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                                placeholder="Or paste image URL..."
                                                className="w-full mb-3 text-sm border border-gray-300 rounded px-3 py-2"
                                            />
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, field.key)}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#155E42] file:text-white hover:file:bg-[#104a33] cursor-pointer"
                                                />
                                                {uploading === field.key && (
                                                    <div className="absolute top-0 right-0 h-full flex items-center pr-4">
                                                        <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Recommendation: Use concise, high-quality images (WebP/JPG).
                                            </p>
                                        </div>
                                    </div>
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
