import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { inter, integralCF, satoshi } from '@/app/ui/fonts'
import { ConditionalNavbar, ConditionalFooter } from "@/app/ConditionalNavFooter"
import { CartProvider } from "@/context/CartContext"
import { Toaster } from "react-hot-toast"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Nike Store - Official Online Shop",
  description: "Discover the latest Nike footwear, apparel, and accessories. Shop now for premium quality and exclusive collections.",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${integralCF.className} ${satoshi.className} antialiased flex flex-col min-h-screen`}
      >
        <CartProvider>

          <ConditionalNavbar />
          <main className="flex-grow">
            {children}
            <Toaster/>
          </main>
          <ConditionalFooter />
        </CartProvider>
      </body>
    </html>
  )
}

