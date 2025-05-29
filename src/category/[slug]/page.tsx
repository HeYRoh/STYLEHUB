import Link from "next/link";
import { ShoppingBag, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui-elements";
import { products } from "@/app/lib/data";
import ProductCard from "@/app/components/product-card";

export function generateStaticParams() {
  return [{ slug: "men" }, { slug: "women" }, { slug: "kids" }];
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  // Filter products by category
  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === slug.toLowerCase()
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
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
                className={`transition-colors hover:text-gray-600 ${
                  slug === "men" ? "text-black font-semibold" : "text-gray-600"
                }`}
              >
                Men
              </Link>
              <Link
                href="/category/women"
                className={`transition-colors hover:text-gray-600 ${
                  slug === "women"
                    ? "text-black font-semibold"
                    : "text-gray-600"
                }`}
              >
                Women
              </Link>
              <Link
                href="/category/kids"
                className={`transition-colors hover:text-gray-600 ${
                  slug === "kids" ? "text-black font-semibold" : "text-gray-600"
                }`}
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

      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="font-medium text-gray-900">{categoryName}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">
                  {categoryName}'s Collection
                </h1>
                <p className="text-gray-500 mt-2">
                  Discover our latest {categoryName.toLowerCase()}'s fashion
                  collection with {categoryProducts.length} products.
                </p>
              </div>
            </div>

            {categoryProducts.length > 0 ? (
              <div className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm mt-8">
                <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold">No products found</h2>
                <p className="text-gray-500 mt-2 mb-8 max-w-md text-center">
                  We couldn't find any products in this category. Please check
                  back later.
                </p>
                <Link href="/">
                  <Button className="rounded-lg">Back to Home</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t bg-white mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
