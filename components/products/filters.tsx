'use client'

import { useState, useEffect } from 'react'
import { Star, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { satoshi } from '@/app/ui/fonts'
import * as Slider from '@radix-ui/react-slider'

interface FiltersProps {
  isMobile?: boolean
  isOpen?: boolean
  onClose?: () => void
  categories: string[]
  styles: string[]
  updateFilters: (filters: Record<string, string[]>) => void
  searchParams: URLSearchParams
}

export function Filters({ isMobile, isOpen, onClose, categories, styles, updateFilters, searchParams }: FiltersProps) {
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '0')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '10000')
  const [priceRange, setPriceRange] = useState([
    Math.max(0, Math.min(10000, parseInt(minPrice))),
    Math.max(0, Math.min(10000, parseInt(maxPrice))),
  ])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.getAll('category'))
  const [selectedStyles, setSelectedStyles] = useState<string[]>(searchParams.getAll('style'))
  const [newArrivals, setNewArrivals] = useState(searchParams.get('newArrivals') === 'true')
  const [topSelling, setTopSelling] = useState(searchParams.get('topSelling') === 'true')

  useEffect(() => {
    setMinPrice(searchParams.get('minPrice') || '0')
    setMaxPrice(searchParams.get('maxPrice') || '10000')
    setPriceRange([
      Math.max(0, Math.min(10000, parseInt(searchParams.get('minPrice') || '0'))),
      Math.max(0, Math.min(10000, parseInt(searchParams.get('maxPrice') || '10000'))),
    ])
    setSelectedCategories(searchParams.getAll('category'))
    setSelectedStyles(searchParams.getAll('style'))
    setNewArrivals(searchParams.get('newArrivals') === 'true')
    setTopSelling(searchParams.get('topSelling') === 'true')
  }, [searchParams])

  const handlePriceChange = () => {
    updateFilters({
      minPrice: [priceRange[0].toString()],
      maxPrice: [priceRange[1].toString()],
    })
  }

  const handlePriceInputChange = (index: 0 | 1, value: number) => {
    const newValue = Math.max(0, Math.min(10000, value))
    const newPriceRange = [...priceRange] as [number, number]
    newPriceRange[index] = newValue
    setPriceRange(newPriceRange)
  }

  const filterContent = (
    <div className={cn('flex flex-col h-full', isMobile ? 'bg-white' : '')}>
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className={cn('text-xl font-medium', satoshi.className)}>Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className={cn('flex-1 overflow-auto space-y-6', isMobile ? 'p-4' : '')}>
        {/* Categories */}
        <div className="space-y-4">
          <h3 className={cn('font-medium', satoshi.className)}>Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => {
                    const updatedCategories = selectedCategories.includes(category)
                      ? selectedCategories.filter((c) => c !== category)
                      : [...selectedCategories, category]
                    setSelectedCategories(updatedCategories)
                    updateFilters({ category: updatedCategories })
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="space-y-4">
          <h3 className={cn('font-medium', satoshi.className)}>Price</h3>
          <Slider.Root
            className="relative flex items-center w-full h-5"
            value={priceRange}
            max={10000}
            step={100}
            onValueChange={(newValue) => setPriceRange([Math.max(0, newValue[0]), Math.min(10000, newValue[1])])}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
              <Slider.Range className="absolute bg-black rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-black rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" />
            <Slider.Thumb className="block w-5 h-5 bg-black rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" />
          </Slider.Root>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceInputChange(0, parseInt(e.target.value))}
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceInputChange(1, parseInt(e.target.value))}
              className="w-1/2 p-2 border rounded"
            />
          </div>
          <button
            onClick={handlePriceChange}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Apply Price Filter
          </button>
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <div
        className={cn(
          'fixed inset-0 z-50 transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-md transform h-full">
          {filterContent}
        </div>
      </div>
    )
  }

  return <div className="w-64 flex-shrink-0">{filterContent}</div>
}
