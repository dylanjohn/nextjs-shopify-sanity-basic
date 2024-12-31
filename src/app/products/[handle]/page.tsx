// src/app/products/[handle]/page.tsx
import { getProduct } from '@/lib/shopify';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';

interface PageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function ProductPage({
  params,
}: PageProps) {
  const resolvedParams = await params;
  const handle = resolvedParams.handle;

  if (!handle) {
    notFound();
  }

  try {
    const response = await getProduct(handle);
    
    if (!response?.product) {
      notFound();
    }

    const { product } = response;
    const images = product.images.edges;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {images.map(({ node: image }, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={image.url}
                  alt={image.altText || product.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Product Details */}
          <ProductDetails product={product} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in product page:', error);
    notFound();
  }
}