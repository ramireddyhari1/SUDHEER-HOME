"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, Rocket, AlertCircle } from "lucide-react";

export function AnnouncementEditor() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [enabled, setEnabled] = useState(true);
    const [text, setText] = useState("");
    const [bgColor, setBgColor] = useState("#155E42");
    const [textColor, setTextColor] = useState("#FFFFFF");
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch('/api/content?section=announcement-bar');
            const data = await res.json();
            if (data.success && data.content) {
                setEnabled(data.content.enabled === 'true');
                setText(data.content.text || "Get Flat 10% OFF on your first order! Use Code: WELCOME10");
                setBgColor(data.content.bg_color || "#155E42");
                setTextColor(data.content.text_color || "#FFFFFF");
            }
        } catch (error) {
            console.error("Failed to fetch announcement settings");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    section: 'announcement-bar',
                    updates: {
                        enabled: String(enabled),
                        text,
                        bg_color: bgColor,
                        text_color: textColor
                    }
                })
            });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: 'success', text: 'Announcement updated successfully!' });
                setTimeout(() => setMessage(null), 3000);
            } else {
                setMessage({ type: 'error', text: 'Failed to update announcement.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred while saving.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="h-48 bg-white rounded-2xl animate-pulse"></div>;
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                        <Rocket className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Announcement Bar</h2>
                        <p className="text-xs text-gray-500">Manage the top notification bar</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={enabled}
                            onChange={(e) => setEnabled(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>

            <div className="p-6 space-y-4">
                {/* Preview */}
                <div className="mb-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Live Preview</span>
                    <div
                        className="w-full py-2 px-4 rounded-lg flex items-center justify-center text-center text-sm font-medium shadow-sm transition-all"
                        style={{ backgroundColor: enabled ? bgColor : '#e5e7eb', color: enabled ? textColor : '#9ca3af' }}
                    >
                        {enabled ? (text || "Announcement text will appear here") : "Announcement Disabled"}
                    </div>
                </div>

                {/* Text Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="e.g., Free Shipping on orders above ₹999!"
                    />
                </div>

                {/* Color Pickers */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                            />
                            <input
                                type="text"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono uppercase"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                            />
                            <input
                                type="text"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono uppercase"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="pt-2 flex justify-end items-center gap-4">
                    {message && (
                        <span className={`text-sm flex items-center gap-1 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {message.type === 'error' && <AlertCircle className="w-4 h-4" />}
                            {message.text}
                        </span>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
