'use client'

import Link from 'next/link'
import { ChevronRight, ShoppingBag } from 'lucide-react'
import { CartItem } from './cart-item'
import { OrderSummary } from './order-sumary'
import { integralCF } from '@/app/ui/fonts'
import { cn } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { removeFromCart, updateQuantity } from '@/app/actions/Cart'

export function CartPage() {
  const { state, dispatch } = useCart()

  const subtotal = Number(state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2))
  const discountRate = 0.014 // 10% discount
  const discount = Number((subtotal * discountRate).toFixed(2))
  const deliveryFee = 15
  const total = Number((subtotal - discount + deliveryFee).toFixed(2))

  const handleUpdateQuantity = (id: string, color: string, size: string, newQuantity: number) => {
    const item = state.items.find(item => item.id === id && item.color === color && item.size === size)
    if (item) {
      updateQuantity(dispatch, { ...item, quantity: newQuantity })
    }
  }

  const handleRemoveItem = (id: string, color: string, size: string) => {
    removeFromCart(dispatch, { id, name: '', price: 0, image: '', color, size })
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <ShoppingBag className="h-32 w-32 text-gray-300 mb-6" />
      <h2 className={cn("text-3xl font-semibold text-gray-800 mb-4", integralCF.className)}>
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6 text-center">
        Looks like you haven't added any items to your cart yet. Start exploring our latest collections and find your perfect pair.
      </p>
      <Link 
        href="/shop" 
        className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all transform hover:scale-105"
      >
        Continue Shopping
      </Link>
    </div>
    
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-800">Home</Link>
        <ChevronRight className="h-4 w-4 text-gray-500" />
        <span className="text-gray-800">Cart</span>
      </div>
  
      <h1 className={cn("text-4xl font-bold text-gray-900 mb-8", integralCF.className)}>
        YOUR CART
      </h1>
  
      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-7 space-y-6">
          <div className="divide-y divide-gray-200">
            {state.items.length > 0 ? (
              state.items.map(item => (
                <CartItem
                  key={`${item.id}-${item.color}-${item.size}`}
                  {...item}
                  onUpdateQuantity={(newQuantity) => handleUpdateQuantity(item.id, item.color, item.size, newQuantity)}
                  onRemove={() => handleRemoveItem(item.id, item.color, item.size)}
                />
              ))
            ) : (
              <div className="text-center text-gray-600 py-16">
                Your cart is empty. Start adding products to your cart!
              </div>
            )}
          </div>
        </div>
  
        {/* Order Summary */}
        <div className="lg:col-span-5 mt-8 lg:mt-0 bg-white rounded-lg shadow-md p-6">
          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            deliveryFee={deliveryFee}
            total={total}
          />
        </div>
      </div>
    </div>
  </div>
  
  )
}

