'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 characters'),
})

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const orderData = {
        customer: values,
        items: state.items,
        totalAmount: state.items.reduce((total, item) => total + item.price * item.quantity, 0),
      }
  
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
  
      if (!response.ok) {
        throw new Error('Failed to create order')
      }
  
      const { orderId } = await response.json()
  
      // Clear the cart in context
      dispatch({ type: 'CLEAR_CART' })
  
      // Clear the cart from localStorage
      localStorage.removeItem('cart')
  
      // Show success message
      toast.success('Order placed successfully!')
  
      // Redirect to the order tracking page
      router.push(`/order-tracking/${orderId}`)
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('An error occurred during checkout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  

  const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 sm:px-8 lg:px-10">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-10">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="border-gray-300 focus:ring-black focus:border-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} className="border-gray-300 focus:ring-black focus:border-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} className="border-gray-300 focus:ring-black focus:border-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} className="border-gray-300 focus:ring-black focus:border-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">City</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} className="border-gray-300 focus:ring-black focus:border-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">State</FormLabel>
                      <FormControl>
                        <Input placeholder="NY" {...field} className="border-gray-300 focus:ring-black focus:border-black" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} className="border-gray-300 focus:ring-black focus:border-black" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </Form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            {state.items.map((item) => (
              <div key={`${item.id}-${item.color}-${item.size}`} className="flex justify-between mb-4">
                <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                <span className="text-gray-900 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-300 mt-6 pt-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
