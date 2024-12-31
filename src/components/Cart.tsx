'use client';

// src/components/Cart.tsx
import { useCart } from './CartProvider';
import { X, Minus, Plus } from 'lucide-react';
import Image from 'next/image';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeItem, updateQuantity, itemCount } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Cart ({itemCount} items)</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    {item.image && (
                      <div className="relative w-24 h-24">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
              onClick={() => {
                // Add checkout logic here
                alert('Proceed to checkout');
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}