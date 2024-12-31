'use client';

// src/components/ClientLayout.tsx
import Header from "@/components/Header";
import { CartProvider } from "@/components/CartProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
}