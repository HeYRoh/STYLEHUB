"use client";

import Link from "next/link";
import { ShoppingBag, ChevronRight, Truck } from "lucide-react";
import { Button } from "@/app/components/ui-elements";
import { Badge } from "@/app/components/ui-elements";
import { products } from "@/app/lib/data";
import ProductCard from "./components/product-card";

export default function Home() {
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold"
            >
              <ShoppingBag className="h-6 w-6" />
              StyleHub
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link
                href="/category/men"
                className="transition-colors hover:text-gray-600"
              >
                Men
              </Link>
              <Link
                href="/category/women"
                className="transition-colors hover:text-gray-600"
              >
                Women
              </Link>
              <Link
                href="/category/kids"
                className="transition-colors hover:text-gray-600"
              >
                Kids
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/cart">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full relative"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                    3
                  </span>
                  <span className="sr-only">Cart</span>
                </Button>
              </Link>
              <Link href="/login">
                <Button className="rounded-full">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-zinc-900 text-white">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-center space-y-6 py-24 text-left md:py-40 max-w-2xl">
              <Badge className="mb-2 bg-white text-black">NEW SEASON</Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
                Summer Collection <span className="text-white/90">2025</span>
              </h1>
              <p className="max-w-[600px] text-white/80 text-lg md:text-xl">
                Discover the latest trends in Indian fashion with our exclusive
                summer collection. Elevate your style with premium fabrics and
                contemporary designs.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link href="/category/men">
                  <Button size="lg" className="rounded-full">
                    Shop Men
                  </Button>
                </Link>
                <Link href="/category/women">
                  <Button size="lg" className="rounded-full">
                    Shop Women
                  </Button>
                </Link>
                <Link href="/category/kids">
                  <Button size="lg" className="rounded-full">
                    Shop Kids
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-y border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Free Shipping</h3>
                  <p className="text-sm text-gray-500">On orders over ₹999</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-rotate-ccw"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Easy Returns</h3>
                  <p className="text-sm text-gray-500">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shield-check"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Secure Payments</h3>
                  <p className="text-sm text-gray-500">100% secure checkout</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-headphones"
                  >
                    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">24/7 Support</h3>
                  <p className="text-sm text-gray-500">
                    Dedicated customer care
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Featured Products
                </h2>
                <p className="mt-2 text-gray-500">
                  Handpicked selection of our best sellers
                </p>
              </div>
              <Link
                href="/products"
                className="mt-4 inline-flex items-center text-sm font-medium md:mt-0"
              >
                View all products
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">
                Shop by Category
              </h2>
              <p className="mt-2 text-gray-500 mx-auto max-w-2xl">
                Explore our wide range of fashion categories for every style and
                occasion
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Link
                href="/category/men"
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
                <div className="relative flex h-[400px] items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Men's Fashion"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-white mb-4">
                        Men
                      </h3>
                      <span className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-transform group-hover:scale-110">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                href="/category/women"
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
                <div className="relative flex h-[400px] items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Women's Fashion"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-white mb-4">
                        Women
                      </h3>
                      <span className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-transform group-hover:scale-110">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                href="/category/kids"
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
                <div className="relative flex h-[400px] items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Kids' Fashion"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-white mb-4">
                        Kids
                      </h3>
                      <span className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-transform group-hover:scale-110">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold"
              >
                <ShoppingBag className="h-6 w-6" />
                StyleHub
              </Link>
              <p className="mt-4 text-sm text-gray-600">
                Your one-stop destination for premium fashion in India. Discover
                the latest trends for men, women, and kids.
              </p>
            </div>
            <div className="flex justify-end">
              <nav className="flex flex-wrap gap-6 text-sm font-medium">
                <Link
                  href="/about"
                  className="transition-colors hover:text-gray-600"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-gray-600"
                >
                  Contact
                </Link>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-gray-600"
                >
                  Terms
                </Link>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-gray-600"
                >
                  Privacy
                </Link>
              </nav>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} StyleHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
