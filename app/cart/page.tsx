import { CartPage } from '@/components/cart/cart-page'
import { Suspense } from 'react'


export default function ShoppingCartPage() {
  return (
  
      <Suspense fallback={<div>Loading cart...</div>}>
        <CartPage />
      </Suspense>
      
 
  )
}

