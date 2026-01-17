import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ClientLayoutWrapper } from "@/components/layout/ClientLayoutWrapper";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ['400', '600', '700', '900'],
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Vaishnavi Organics | 100% Organic Food Products Since 1998 | FSSAI Certified",
  description: "Buy authentic organic pickles, sweets & traditional foods from Andhra Pradesh. FSSAI certified, lab-tested, chemical-free products delivered across India. Free shipping on orders above ₹499.",
  keywords: [
    "organic food India",
    "organic pickles",
    "traditional Andhra sweets",
    "FSSAI certified organic",
    "chemical-free food",
    "Vaishnavi Organics",
    "organic products online",
    "traditional Indian food"
  ],
  authors: [{ name: "Vaishnavi Organics" }],
  creator: "Vaishnavi Organics",
  publisher: "Vaishnavi Organics",
  metadataBase: new URL('https://vaishnaviorganics.store'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vaishnaviorganics.store',
    title: 'Vaishnavi Organics - 100% Organic Traditional Foods',
    description: 'Handcrafted organic foods from village to your home. FSSAI certified & lab-tested since 1998.',
    siteName: 'Vaishnavi Organics',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vaishnavi Organics - Organic Food Products',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaishnavi Organics - 100% Organic Traditional Foods',
    description: 'Handcrafted organic foods from Andhra Pradesh. FSSAI certified & lab-tested.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased bg-background text-foreground font-sans`}
      >
        <AuthProvider>
          <CartProvider>
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
