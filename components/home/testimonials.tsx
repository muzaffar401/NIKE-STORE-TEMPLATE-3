'use client'

import React, { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { integralCF, satoshi } from '@/app/ui/fonts'

const testimonials = [
  {
    id: 1,
    name: 'Emily R.',
    rating: 5,
    verified: true,
    text: '"The shopping experience at Accessories Hub was fantastic! The quality and range of accessories exceeded my expectations. Highly recommend to everyone!"'
  },
  {
    id: 2,
    name: 'Michael T.',
    rating: 4,
    verified: true,
    text: '"Accessories Hub has a great variety of products. The delivery was quick, and the items were as described. Will shop again!"'
  },
  {
    id: 3,
    name: 'Sophia L.',
    rating: 5,
    verified: true,
    text: '"I loved the unique selection of accessories! Everything was beautifully packaged, and the quality is top-notch. I’ll be back for more!"'
  },
  {
    id: 4,
    name: 'David G.',
    rating: 4,
    verified: true,
    text: '"A great platform with plenty of options for every occasion. Some items could be priced better, but the quality is worth it."'
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3)
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + slidesPerView >= testimonials.length ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, testimonials.length - slidesPerView) : prevIndex - 1
    )
  }

  return (
    <section className="mx-auto max-w-[1240px] px-4 py-12 md:py-16">
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <h2
          className={`${integralCF.className} text-2xl md:text-[32px] font-bold`}
        >
          OUR HAPPY CUSTOMERS
        </h2>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`w-full flex-shrink-0 px-2 md:w-1/2 lg:w-1/3`}
            >
              <div className="h-full rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className={`${satoshi.className} text-lg font-medium`}
                    >
                      {testimonial.name}
                    </span>
                    {testimonial.verified && (
                      <span className="ml-2 h-3 w-3 inline-block rounded-full bg-green-500"></span>
                    )}
                  </div>
                  <StarRating rating={testimonial.rating} />
                </div>
                <p
                  className={`${satoshi.className} mt-4 text-gray-600 leading-relaxed`}
                >
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2 md:hidden">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  )
}
