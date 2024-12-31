'use client';

// src/components/Toast.tsx
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

type ToastProps = {
  message: string;
  duration?: number;
  onClose: () => void;
};

export default function Toast({ message, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <CheckCircle className="w-5 h-5" />
      {message}
    </div>
  );
}