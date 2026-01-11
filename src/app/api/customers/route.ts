export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(req: Request) {
    try {
        await dbConnect();

        // Fetch all orders
        const orders = await Order.find({});

        // Aggregate by customer email (or phone if email is missing)
        const customerMap = new Map();

        orders.forEach((order) => {
            const email = order.customer.email || order.customer.phone; // Unique identifier
            if (!email) return;

            if (!customerMap.has(email)) {
                customerMap.set(email, {
                    id: email, // Use email/phone as ID
                    name: order.customer.name,
                    email: order.customer.email,
                    phone: order.customer.phone,
                    city: order.customer.city,
                    totalOrders: 0,
                    totalSpent: 0,
                    lastOrderDate: new Date(0), // Init with old date
                });
            }

            const customer = customerMap.get(email);

            // Update stats
            customer.totalOrders += 1;

            // Only add to spent if not cancelled
            if (order.status !== 'Cancelled') {
                customer.totalSpent += (order.amount || 0);
            }

            // Update last order date
            const orderDate = new Date(order.date);
            if (orderDate > customer.lastOrderDate) {
                customer.lastOrderDate = orderDate;
            }
        });

        // Convert to array and sort by Total Spent (Desc)
        const customers = Array.from(customerMap.values())
            .map(c => ({
                ...c,
                lastOrderDate: c.lastOrderDate.toISOString()
            }))
            .sort((a, b) => b.totalSpent - a.totalSpent);

        return NextResponse.json({ success: true, customers });
    } catch (error) {
        console.error("Failed to fetch customers:", error);
        return NextResponse.json({ success: false, message: 'Failed to fetch customers' }, { status: 500 });
    }
}
