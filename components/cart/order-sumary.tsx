import { ArrowRight, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { satoshi } from '@/app/ui/fonts';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}

export function OrderSummary({ subtotal, discount, deliveryFee, total }: OrderSummaryProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = sessionStorage.getItem('isLogin');
    setIsLoggedIn(loginStatus === 'true'); // Check session storage
  }, []);

  const formatPrice = (price: number) => price.toFixed(2);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
      <h2 className={cn("text-2xl font-semibold mb-6 text-gray-800", satoshi.className)}>Order Summary</h2>
      <div className="space-y-5">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">${formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-red-500">
          <span>Discount</span>
          <span className="font-medium">-${formatPrice(discount)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Delivery Fee</span>
          <span className="font-medium">${formatPrice(deliveryFee)}</span>
        </div>
        <div className="h-px bg-gray-200 my-4" />
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Total</span>
          <span>${formatPrice(total)}</span>
        </div>

        <div className="flex gap-3 mt-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Add promo code"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 text-gray-800"
            />
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors">
            Apply
          </button>
        </div>

        {isLoggedIn ? (
          <Link href="/checkout" passHref>
            <button className="w-full mt-4 px-6 py-4 bg-black text-white rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors">
              <span>Go to Checkout</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        ) : (
          <Link href="/login" passHref>
            <button className="w-full mt-4 px-6 py-4 bg-red-500 text-white rounded-xl flex items-center justify-center gap-3 hover:bg-red-600 transition-colors">
              <span>Sign In to Your Account</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
