'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { integralCF, satoshi } from '@/app/ui/fonts'
import Link from 'next/link';

const shoes = [
    {
        id: 1,
        name: "Nike Air Max Pulse",
        category: "Women's Shoes",
        price: "₹13,995",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2c090c54-d6d8-4787-94f7-94c8af565c7e/NIKE+ZOOM+VOMERO+5.png",
    },
    {
        id: 2,
        name: "Nike Air Max Pulse",
        category: "Men's Shoes",
        price: "₹13,995",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/64eb967c-9c0c-4d27-ba90-b304a9bdcb31/NIKE+ZOOM+VOMERO+5.png",
    },
    {
        id: 3,
        name: "Nike Air Max 97 SE",
        category: "Men's Shoes",
        price: "₹16,995",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/13316bce-49a6-4500-97de-0cd62aeb3ac7/NIKE+ZOOM+VOMERO+5.png",
    },
    {
        id: 4,
        name: "Nike Air Zoom Pegasus 40",
        category: "Women's Shoes",
        price: "₹12,495",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e2bb37de-12d0-4a5a-98c9-8c7889388d0f/NIKE+ZOOM+VOMERO+5.png",
    },
    {
        id: 5,
        name: "Nike React Infinity Run Flyknit 3",
        category: "Men's Shoes",
        price: "₹14,495",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/58c25613-1990-47bb-9146-c303cc050744/NIKE+ZOOM+VOMERO+5.png",
    },
    {
        id: 6,
        name: "Nike Revolution 6 Next Nature",
        category: "Men's Shoes",
        price: "₹7,995",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/801df14a-eee9-4069-bd05-876b744a213e/NIKE+ZOOM+VOMERO+5.png",
    },
    {
        id: 7,
        name: "Nike Air Force 1 '07",
        category: "Women's Shoes",
        price: "₹11,495",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b5182d87-9f53-451f-bd39-e8f83911e5d9/NIKE+ZOOM+VOMERO+5.png",
    },
    {
        id: 8,
        name: "Nike Dunk Low Retro",
        category: "Women's Shoes",
        price: "₹11,995",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/224ca146-a91a-4075-9aa7-109b6e21b769/NIKE+ZOOM+VOMERO+5.png",
    },
    {
        id: 9,
        name: "Nike Air Max 270",
        category: "Women's Shoes",
        price: "₹15,495",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e64a7bc9-71f0-4278-8d7b-b13f984498cf/NIKE+ZOOM+VOMERO+5.png",
    },
    {
        id: 10,
        name: "Nike ZoomX Vaporfly NEXT% 2",
        category: "Men's Shoes",
        price: "₹22,995",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7ecb8309-c6d0-4313-94e2-175b5f5133be/NIKE+ZOOM+VOMERO+5.png",
    },
    {
        id: 11,
        name: "Nike Air VaporMax 2023 Flyknit",
        category: "Women's Shoes",
        price: "₹19,995",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ff505319-157f-4ddc-993f-d4d107542c4f/AIR+MAX+270.png",
    },
    {
        id: 12,
        name: "Nike Free Run 5.0 Next Nature",
        category: "Men's Shoes",
        price: "₹10,495",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/684ed026-bc93-4b83-9797-ba2a12201efe/AIR+MAX+270.png",
    },
];

export default function ShoesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + slidesPerView >= shoes.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, shoes.length - slidesPerView) : prevIndex - 1
    );
  };

  return (
    <section className="mx-auto max-w-[1240px] px-4 py-12 md:py-16">
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <h2 className={`${integralCF.className} text-2xl md:text-[32px] font-bold`}>
          Featured Shoes
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
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
          }}
        >
          {shoes.map((shoe) => (
            <div
              key={shoe.id}
              className={`w-full flex-shrink-0 px-2 md:w-1/2 lg:w-1/3`}
            >
              <div className="h-full rounded-xl overflow-hidden border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                    {shoe.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3
                    className={`${satoshi.className} text-lg font-medium text-gray-800`}
                  >
                    {shoe.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{shoe.price}</p>
                 <Link href={"/shop"}>
                 <button className="mt-4 w-full py-2 px-4 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition">
                    Shop Now
                  </button>
                 </Link>
                </div>
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
  );
}
