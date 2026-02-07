import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://vaishnaviorganics.store';

    let productRoutes: MetadataRoute.Sitemap = [];

    try {
        await dbConnect();
        // Fetch only necessary fields: _id, updatedAt, and createdAt
        const products = await Product.find({ status: 'active' }).select('_id updatedAt createdAt').lean();

        productRoutes = products.map((product: any) => ({
            url: `${baseUrl}/products/${product._id}`,
            lastModified: new Date(product.updatedAt || product.createdAt || Date.now()),
            changeFrequency: 'weekly',
            priority: 0.8,
        }));
    } catch (error) {
        console.error("Sitemap generation error:", error);
    }

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/cart`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/shipping`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    return [...staticRoutes, ...productRoutes];
}
