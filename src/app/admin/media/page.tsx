
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Copy, Trash2, Upload, ExternalLink, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface MediaFile {
    name: string;
    url: string;
}

export default function MediaManager() {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/media');
            const data = await res.json();
            if (data.success) {
                setFiles(data.files);
            }
        } catch (error) {
            console.error("Failed to load files", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                // Refresh list
                fetchFiles();
                alert("Upload successful!");
            } else {
                alert("Upload failed: " + data.message);
            }
        } catch (error) {
            console.error("Upload error", error);
            alert("Upload failed");
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const handleDelete = async (filename: string) => {
        if (!confirm("Are you sure you want to delete this file? This action cannot be undone.")) return;

        try {
            const res = await fetch(`/api/media?filename=${filename}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (data.success) {
                setFiles(files.filter(f => f.name !== filename));
            } else {
                alert("Delete failed: " + data.message);
            }
        } catch (error) {
            console.error("Delete error", error);
            alert("Failed to delete file");
        }
    };

    const copyToClipboard = (url: string) => {
        const fullUrl = window.location.origin + url;
        navigator.clipboard.writeText(fullUrl);
        alert("Copied to clipboard: " + fullUrl);
    };

    return (
        <div className="p-6 md:p-12 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-[#155E42]">Media Manager</h1>
                    <p className="text-muted-foreground mt-2">Manage your uploaded images and banners.</p>
                </div>

                <div className="relative">
                    <input
                        type="file"
                        id="media-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                    <label htmlFor="media-upload">
                        <Button
                            variant="default"
                            className="bg-[#155E42] hover:bg-[#0f4631] flex items-center gap-2 cursor-pointer"
                            asChild
                        >
                            <span>
                                <Upload className="h-4 w-4" />
                                {uploading ? "Uploading..." : "Upload New Image"}
                            </span>
                        </Button>
                    </label>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                {loading ? (
                    <div className="h-40 flex items-center justify-center text-muted-foreground">Loading media...</div>
                ) : files.length === 0 ? (
                    <div className="h-40 flex flex-col items-center justify-center text-muted-foreground gap-2">
                        <ImageIcon className="h-8 w-8 opacity-20" />
                        <p>No images found. Upload one to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {files.map((file) => (
                            <div key={file.name} className="group relative bg-gray-50 rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="aspect-square relative">
                                    <Image
                                        src={file.url}
                                        alt={file.name}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Overlay Actions */}
                                    <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => window.open(file.url, '_blank')}
                                            className="p-1.5 text-white hover:text-blue-300 transition-colors"
                                            title="View Full Size"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(file.url)}
                                            className="p-1.5 text-white hover:text-green-300 transition-colors"
                                            title="Copy URL"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(file.name)}
                                            className="p-1.5 text-white hover:text-red-300 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-2 bg-white">
                                    <p className="text-xs text-muted-foreground truncate" title={file.name}>
                                        {file.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
