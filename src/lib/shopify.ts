 // src/lib/shopify.ts
import { GraphQLClient } from 'graphql-request';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!domain || !accessToken) {
  throw new Error('Missing Shopify environment variables');
}

export const shopifyClient = new GraphQLClient(
  `https://${domain}/api/2024-01/graphql.json`,
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
  }
);

export async function getProducts() {
  const query = `
    query Products {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    return shopifyClient.request(query);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProduct(handle: string) {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.request(query, { handle });
    return response as { product: any };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}