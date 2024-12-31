'use client';

// src/components/ProductDetails.tsx
import { useState } from 'react';
import { useCart } from './CartProvider';
import Toast from './Toast';

type Variant = {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
};

type ProductDetailsProps = {
  product: {
    id: string;
    title: string;
    description: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: Variant;
      }>;
    };
  };
};

export default function ProductDetails({ product }: ProductDetailsProps) {
    const { addItem } = useCart();
    const [selectedVariantId, setSelectedVariantId] = useState(
      product.variants.edges[0]?.node.id
    );
    const [showToast, setShowToast] = useState(false);
  
    const handleAddToCart = () => {
      console.log('Add to cart clicked'); // Debug log
      const selectedVariant = product.variants.edges.find(
        ({ node }) => node.id === selectedVariantId
      )?.node;
  
      console.log('Selected variant:', selectedVariant); // Debug log
  
      if (selectedVariant) {
        const cartItem = {
          id: selectedVariant.id,
          title: `${product.title} - ${selectedVariant.title}`,
          price: parseFloat(selectedVariant.price.amount),
          quantity: 1,
          image: product.images.edges[0]?.node.url,
        };
  
        console.log('Adding to cart:', cartItem); // Debug log
        
        addItem(cartItem);
        setShowToast(true);
      }
    };
  
    return (
      <div className="sticky top-8">
        <h1 className="text-4xl font-bold">{product.title}</h1>
        <p className="mt-4 text-gray-600">{product.description}</p>
        
        {/* Price */}
        <p className="mt-6 text-2xl font-bold">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: product.priceRange.minVariantPrice.currencyCode,
          }).format(parseFloat(product.priceRange.minVariantPrice.amount))}
        </p>
  
        {/* Variants */}
        {product.variants.edges.length > 1 && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Select Option
            </label>
            <select 
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
            >
              {product.variants.edges.map(({ node: variant }) => (
                <option key={variant.id} value={variant.id}>
                  {variant.title} - {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: variant.price.currencyCode,
                  }).format(parseFloat(variant.price.amount))}
                </option>
              ))}
            </select>
          </div>
        )}
  
        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="mt-8 w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 active:bg-gray-900 transition-colors"
        >
          Add to Cart
        </button>
  
        {showToast && (
          <Toast 
            message="Added to cart!"
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    );
  }