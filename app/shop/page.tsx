import { Suspense } from 'react'
import Loader from '@/components/Loader'
import ClientProductsGrid from '@/components/products/ClientProductsGrid'



export default function ShopPage() {
  return (
    <Suspense fallback={<Loader />}>
      <ClientProductsGrid />
    </Suspense>
  )
}
