import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ClientLayoutWrapper } from "@/components/layout/ClientLayoutWrapper";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vaishnavi Organics | Purely Organic, Naturally Traditional",
  description: "Experience the purity of traditional organic food with Vaishnavi Organics. From farm to family – chemical-free essentials you can trust.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground font-sans`}
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
