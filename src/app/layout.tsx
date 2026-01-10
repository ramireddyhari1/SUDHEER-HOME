import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { VideoLoader } from "@/components/ui/VideoLoader";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { CartSpacer } from "@/components/layout/CartSpacer";

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

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground font-sans`}
      >
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <AnnouncementBar />
            <VideoLoader />
            <FloatingButtons />
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <CartSpacer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
