import { ProductDetail } from '@/components/product/product-details'
import { notFound } from 'next/navigation';
import { productQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { Product } from '@/types/product';
import { ProductReviews } from "@/components/product/product-reviews";
import RelatedProducts from "@/components/product/related-products";
import { Suspense } from 'react';
import Loader from '@/components/Loader';

type ProductPageProps = {
  params: { slug: string };
};

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product: Product | null = await client.fetch(productQuery, { slug: params.slug });

    if (!product) {
      notFound();
    }
    return (
      <Suspense fallback={<div>{<Loader />}</div>}>
        <ProductDetail product={product} />
        <ProductReviews product={product} />
        <RelatedProducts />
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}
