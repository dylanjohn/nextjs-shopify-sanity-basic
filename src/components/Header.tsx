'use client';

// src/components/Header.tsx
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartProvider';
import Cart from './Cart';
import { useState } from 'react';

export default function Header() {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Shop Name
          </Link>
          
          <nav className="flex items-center gap-8">
            <Link href="/" className="hover:text-gray-600">
              Products
            </Link>
            <button 
              className="relative p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}