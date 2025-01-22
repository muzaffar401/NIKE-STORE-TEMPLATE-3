import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { satoshi } from '@/app/ui/fonts'

interface CartItemProps {
  id: string
  name: string
  size: string
  color: string
  price: number
  image: string
  quantity: number
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export function CartItem({
  id,
  name,
  size,
  color,
  price,
  image,
  quantity,
  onUpdateQuantity,
  onRemove
}: CartItemProps) {
  return (
    <div className="flex gap-6 py-8 border-b border-gray-200">
      <div className="relative h-28 w-28 rounded-lg bg-gray-100 overflow-hidden shadow-sm">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className={cn("text-xl font-semibold text-gray-800", satoshi.className)}>{name}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-500">Size: {size}</p>
              <p className="text-sm text-gray-500">Color: {color}</p>
            </div>
          </div>
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center border rounded-full">
            <button
              onClick={() => onUpdateQuantity(quantity - 1)}
              disabled={quantity <= 1}
              className="h-9 w-9 flex items-center justify-center text-lg text-gray-700 border-r disabled:opacity-50"
            >
              -
            </button>
            <span className="h-9 w-14 flex items-center justify-center text-base text-gray-800 font-medium">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(quantity + 1)}
              className="h-9 w-9 flex items-center justify-center text-lg text-gray-700 border-l"
            >
              +
            </button>
          </div>
          <p className={cn("text-lg font-medium text-gray-800", satoshi.className)}>${price}</p>
        </div>
      </div>
    </div>
  )
}
