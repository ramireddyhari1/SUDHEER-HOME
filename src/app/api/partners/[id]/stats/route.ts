import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Partner from '@/models/Partner';
import Order from '@/models/Order';

// GET partner statistics
export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await dbConnect();

        const partner = await Partner.findById(params.id);

        if (!partner) {
            return NextResponse.json(
                { success: false, error: 'Partner not found' },
                { status: 404 }
            );
        }

        // Get all orders for this partner
        const orders = await Order.find({ partnerId: params.id }).sort({ date: -1 });

        // Calculate stats
        const stats = {
            partner: {
                name: partner.name,
                code: partner.partnerCode,
                commissionType: partner.commissionType,
                commissionValue: partner.commissionValue,
            },
            totalOrders: partner.totalOrders,
            totalSales: partner.totalSales,
            totalCommission: partner.totalCommission,
            recentOrders: orders.slice(0, 10).map(order => ({
                orderId: order.orderId,
                amount: order.amount,
                commission: order.partnerCommission,
                date: order.date,
                status: order.status,
            })),
            monthlyStats: await getMonthlyStats(params.id),
        };

        return NextResponse.json({ success: true, data: stats });
    } catch (error: any) {
        console.error('Error fetching partner stats:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// Helper function to get monthly statistics
async function getMonthlyStats(partnerId: string) {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthlyOrders = await Order.find({
        partnerId,
        date: { $gte: firstDayOfMonth },
    });

    return {
        ordersThisMonth: monthlyOrders.length,
        salesThisMonth: monthlyOrders.reduce((sum, order) => sum + order.amount, 0),
        commissionThisMonth: monthlyOrders.reduce((sum, order) => sum + (order.partnerCommission || 0), 0),
    };
}
