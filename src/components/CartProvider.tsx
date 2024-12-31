'use client';

// src/components/CartProvider.tsx
import { createContext, useContext, useState } from 'react';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    console.log('Adding item to cart:', item); // Debug log
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      
      if (existingItem) {
        const updatedItems = currentItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
        console.log('Updated cart items:', updatedItems); // Debug log
        return updatedItems;
      }

      const newItems = [...currentItems, { ...item, quantity: 1 }];
      console.log('New cart items:', newItems); // Debug log
      return newItems;
    });
  };

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}