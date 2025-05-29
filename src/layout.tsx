import type React from "react";
import { Inter } from "next/font/google";
import { CartProvider } from "@/app/lib/cart-context";
import { ToastProvider } from "@/app/hooks/use-toast";
import { AuthProvider } from "@/app/lib/auth-context"; // Import AuthProvider
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StyleHub - Fashion E-commerce",
  description: "Shop the latest trends in men's, women's, and kids' fashion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={`${inter.className} min-h-screen bg-white`}>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
