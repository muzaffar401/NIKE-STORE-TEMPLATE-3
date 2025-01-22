import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inter } from "@/app/ui/fonts";

export default function NotFound() {
  return (
    <div className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-100 to-gray-200`}>
      {/* Breadcrumb */}
      <div className="mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-3.5 text-sm">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-black transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">404 Error</span>
          </nav>
        </div>
      </div>

      {/* 404 Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 mt-7 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Animated 404 Title */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black animate-pulse">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mb-8 sm:mb-12 leading-relaxed">
            Sorry, the page you're looking for doesn’t exist or has been moved. 
            Let’s guide you back to where you need to be.
          </p>

          {/* Call-to-Action */}
          <Button 
            asChild
            className="h-12 px-8 bg-gradient-to-r from-black to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-full text-base shadow-lg transform hover:scale-105 transition-transform"
          >
            <Link href="/">
              Go Back to Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Circle Decoration */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-tr from-gray-300 to-gray-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-tr from-gray-500 to-gray-700 rounded-full opacity-10 blur-3xl"></div>
      </div>
    </div>
  );
}
