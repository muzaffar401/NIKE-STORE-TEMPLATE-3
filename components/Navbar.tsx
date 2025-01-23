'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Heart, Menu, Search, ShoppingCart, X } from 'lucide-react'
import { integralCF } from '@/app/ui/fonts'
import { cn } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SearchBar } from './SearchBar'
import { menuItems } from './ShopMenu'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const { state } = useCart()
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const cartItemCount = state.items.length

  useEffect(() => {
    // Check login status from session storage
    const loginStatus = sessionStorage.getItem('isLogin') === 'true'
    setIsLogin(loginStatus)
  }, [])

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      // Update session storage
      sessionStorage.setItem('isLogin', 'false')
      setIsLogin(false)

      // Show a success toast
      toast.success('You have successfully signed out!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      setTimeout(() => {
        window.location.href = "/"; // Redirect to home page
      }, 3000);
    }
  }

  const handleSearch = (query: string) => {
    router.push(`/shop?search=${encodeURIComponent(query)}`)
    setIsSearchOpen(false)
  }

  return (
    <>
      <div className="w-full bg-white shadow-sm">
        {/* Top Banner */}
        <div className="hidden md:block">
          <div className="top-bar flex flex-col md:flex-row justify-between items-center h-[36px] px-[48px] bg-[#F5F5F5] text-black text-sm">
            <div className="pr-56">
              <img src="/topbarlogo.png" alt="icon" width={20} height={20} className="ml-1 text-[20px]" />
            </div>
            <span className="text-center font-bold md:text-left">
              Skip to main content{" "}
            </span>
            <div className="language space-x-3 flex items-center mt-2 md:mt-0">
              <span className="items-center cursor-pointer font-semibold"><a href="/track-order">Track Order</a></span>
              <span>|</span>
              <span className="items-center cursor-pointer font-semibold"><a href="/shop">Find a Store</a></span>
              <span>|</span>
              <span className="items-center cursor-pointer font-semibold"><a href="/help">Help</a></span>
              <span>|</span>
              <span className="items-center cursor-pointer font-semibold"><a href="/joinus">Join Us</a></span>
              <span>|</span>
              <span className="items-center cursor-pointer font-semibold">
                {isLogin ? (
                  <button onClick={handleLogout}>Sign Out</button>
                ) : (
                  <a href="/login">Sign In</a>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        {/* Main Navbar */}
        <div className="border-b bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>

              {/* Logo */}
              <Link
                href="/"
                className={cn(
                  "text-xl md:text-2xl font-bold",
                  integralCF.className
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="80" viewBox="0 0 215 75" fill="none" className='lg:flex hidden'>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M214.505 0L57.6344 66.5427C44.5737 72.0839 33.5865 74.8486 24.7325 74.8486C14.7701 74.8486 7.51288 71.3332 3.05605 64.3143C-2.72353 55.2576 -0.197201 40.6954 9.71747 25.3229C15.6043 16.3378 23.088 8.09142 30.381 0.202586C28.665 2.99109 13.5189 28.1948 30.083 40.0638C33.3601 42.4472 38.0195 43.615 43.7515 43.615C48.3513 43.615 53.6304 42.8643 59.4338 41.3508L214.505 0Z" fill="black" />
                </svg>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                <Link href="/news_and_features" className="hover:text-gray-600">New & Featured</Link>
                <Link href="/shop?category=men" className="hover:text-gray-600">Men</Link>
                <Link href="/shop?category=women" className="hover:text-gray-600">Women</Link>
                <Link href="/kid" className="hover:text-gray-600">Kids</Link>
                <Link href="/upcoming" className="hover:text-gray-600">Sale</Link>
                <Link href="/feed" className="hover:text-gray-600">SNKRS</Link>

              </nav>

              {/* Search Bar - Desktop */}
              <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* Icons */}
              <div className="flex items-center gap-4">
                <button className="lg:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                  <Search className="h-6 w-6" />
                </button>
                <Link href="#">
                  <Heart className="h-6 w-6" />
                </Link>
                <Link href="/cart" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-8">
                  <Link
                    href="/"
                    className={cn(
                      "text-xl font-bold",
                      integralCF.className
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="80" viewBox="0 0 215 75" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M214.505 0L57.6344 66.5427C44.5737 72.0839 33.5865 74.8486 24.7325 74.8486C14.7701 74.8486 7.51288 71.3332 3.05605 64.3143C-2.72353 55.2576 -0.197201 40.6954 9.71747 25.3229C15.6043 16.3378 23.088 8.09142 30.381 0.202586C28.665 2.99109 13.5189 28.1948 30.083 40.0638C33.3601 42.4472 38.0195 43.615 43.7515 43.615C48.3513 43.615 53.6304 42.8643 59.4338 41.3508L214.505 0Z" fill="black" />
                    </svg>
                  </Link>
                  <button
                    className="p-2 text-2xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="space-y-6">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="shop">
                      <AccordionTrigger>Shop</AccordionTrigger>
                      <AccordionContent>
                        {menuItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="block py-2 hover:text-gray-600"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="text-sm font-medium">{item.title}</div>
                            <div className="text-xs text-gray-500">{item.subtitle}</div>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Link
                    href="/news_and_features"
                    className="block text-lg hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    New & Featured
                  </Link>
                  <Link
                    href="/feed"
                    className="block text-lg hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    SNKRS
                  </Link>
                  <Link
                    href="/upcoming"
                    className="block text-lg hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sale
                  </Link>
                  <span className="block text-lg hover:text-gray-600">
                    {isLogin ? (
                      <button onClick={handleLogout}>Sign Out</button>
                    ) : (
                      <a href="/login">Sign In</a>
                    )}
                  </span>
                  <Link href="/track-order" className="block text-lg hover:text-gray-600">Track Order</Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              ref={searchRef}
              className="absolute left-0 right-0 bg-white shadow-md z-40 lg:hidden"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4">
                <SearchBar onSearch={handleSearch} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      <ToastContainer />
    </>
  )
}
