import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Get Secret from env
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // 1. Protect Admin Routes (Pages & APIs)
    // Exclude login page and auth API
    if ((path.startsWith('/admin') && path !== '/admin/login') || path.startsWith('/api/admin')) {

        // Check for admin_token cookie
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            // If API request, return 401 JSON
            if (path.startsWith('/api/')) {
                const response = NextResponse.json({ success: false, error: 'Unauthorized: No token provided' }, { status: 401 });
                addSecurityHeaders(response);
                return response;
            }
            // If Page request, redirect to login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            // Verify JWT (using jose because 'jsonwebtoken' doesn't work in Edge Runtime)
            const { payload } = await jwtVerify(token, SECRET_KEY);

            // Check if user is actually admin
            if (!payload || !payload.isAdmin) {
                if (path.startsWith('/api/')) {
                    const response = NextResponse.json({ success: false, error: 'Forbidden: Insufficient permissions' }, { status: 403 });
                    addSecurityHeaders(response);
                    return response;
                }
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }

            // Valid Token - Proceed
            const response = NextResponse.next();
            addSecurityHeaders(response);
            return response;

        } catch (err) {
            console.error('Proxy Auth Error:', err);
            // Invalid Token
            if (path.startsWith('/api/')) {
                const response = NextResponse.json({ success: false, error: 'Unauthorized: Invalid token' }, { status: 401 });
                addSecurityHeaders(response);
                return response;
            }
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Allow everything else
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
}

/**
 * Add security headers to all responses
 */
function addSecurityHeaders(response: NextResponse) {
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/api/admin/:path*',
    ],
};
