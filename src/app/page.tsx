//src/app/page.tsx
import { getProducts } from '@/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const data = await getProducts();
  const products = data.products.edges;
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(({ node: product }) => (
          <div key={product.id} className="border rounded-lg p-4">
            <pre className="bg-gray-100 p-2 mb-4 text-sm overflow-x-auto">
              Product Handle: {product.handle}
            </pre>
            <Link 
              href={`/products/${product.handle}`}
              className="block"
            >
              {product.images.edges[0] && (
                <div className="relative aspect-square mb-4">
                  <Image
                    src={product.images.edges[0].node.url}
                    alt={product.images.edges[0].node.altText || product.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="mt-2 text-gray-600 line-clamp-2">{product.description}</p>
              <p className="mt-2 text-lg font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: product.priceRange.minVariantPrice.currencyCode,
                }).format(parseFloat(product.priceRange.minVariantPrice.amount))}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}