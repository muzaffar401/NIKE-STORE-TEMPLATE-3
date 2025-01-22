'use client'

import Image from 'next/image'
import Link from 'next/link'
import { integralCF, satoshi } from '@/app/ui/fonts'

const categories = [
  {
    id: 'men',
    name: 'Men`s Collection',
    image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2d3099d2-ae96-48fc-b510-32673f81348e/M+NK+DF+UNSCRIPTED+POLO.png',
    href: '/shop?category=men'
  },
  {
    id: 'women',
    name: 'Women`s Collection',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/019fb8bf-6b91-4a94-a28f-e09ca4293a3c/W+NK+TOUR+SWTR+PR.png',
    href: '/shop?category=women'
  },
  {
    id: 'kids',
    name: 'Kids Collection',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1753c0bc-83e5-4133-9d0c-6db4ac65ba27/K+NK+DF+LGD+TEE+SWOOSH+HBR.png',
    href: '/shop?category=kids'
  },
  {
    id: 'accessories',
    name: 'Accessories & Equipment',
    image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4fe3855c-7fad-4ff9-9fc0-26ec0b0cfc14/365+SPECIAL+MARKS+CAMPUS+CAP.png',
    href: '/shop?category=accessories'
  }
]

export default function BrowseStyles() {
  return (
    <div className="mx-auto max-w-[1240px] px-4 py-8 md:py-12">
      <div className="rounded-[32px] bg-[#F9F9F9] p-6 shadow-lg md:p-8">
        <h2 className={`${integralCF.className} mb-6 text-center text-2xl font-bold md:mb-8 md:text-[32px]`}>
          Categories
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-[180px] w-full md:h-[200px]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
                <h3 className={`${satoshi.className} text-lg font-semibold text-gray-800 group-hover:text-black`}>
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
