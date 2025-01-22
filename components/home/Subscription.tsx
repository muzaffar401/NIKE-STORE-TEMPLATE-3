'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import { toast } from 'react-hot-toast'

import { integralCF } from '@/app/ui/fonts'

const Subscription = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Subscribed successfully! 🎉')
    setEmail('')
  }

  return (
    <div className="mb-16 text-gray-400">
      <div className="  w-full max-w-[1240px]  px-4 ">
        <div className="rounded-[32px] bg-gradient-to-r from-gray-800 via-gray-900 to-black px-8 py-12 shadow-lg">
          <div className="md:flex md:items-center md:justify-between md:gap-8">
            <h2
              className={`${integralCF.className} mb-6 text-2xl font-bold leading-tight text-white md:mb-0 md:max-w-[450px] md:text-[32px]`}
            >
              Stay Updated on Our Latest Offers
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6"
            >
              <div className="relative w-full md:w-auto">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-12 w-full rounded-full bg-gray-700 pl-12 pr-4 text-base text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-500 md:w-[300px]"
                  required
                />
              </div>
              <button
                type="submit"
                className="h-12 rounded-full bg-white px-8 font-medium text-black transition-all hover:bg-gray-100 hover:shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscription
