import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ChevronLeft, Star } from "lucide-react";
import { Button } from "@/app/components/ui-elements";
import { products } from "@/app/lib/data";
import AddToCartButton from "@/app/components/add-to-cart-button";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id.toString() === params.id);

  if (!product) {
    return (
      <div className="container flex flex-col items-center justify-center py-24">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="text-muted-foreground mt-2">
          The product you're looking for doesn't exist.
        </p>
        <Link href="/" className="mt-6">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <ShoppingBag className="h-6 w-6" />
            StyleHub
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/category/men"
              className="transition-colors hover:text-foreground/80"
            >
              Men
            </Link>
            <Link
              href="/category/women"
              className="transition-colors hover:text-foreground/80"
            >
              Women
            </Link>
            <Link
              href="/category/kids"
              className="transition-colors hover:text-foreground/80"
            >
              Kids
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="outline" size="icon">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <Link
            href={`/category/${product.category.toLowerCase()}`}
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to {product.category}
          </Link>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg border">
              {product.externalImage ? (
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={product.image || `/placeholder.svg?height=600&width=600`}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {product.category}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < product.rating
                          ? "fill-current text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="text-2xl font-bold">
                ₹{product.price.toLocaleString("en-IN")}
              </div>

              <div className="mt-2">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="mt-2">
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant="outline"
                      className="h-10 w-10 rounded-md p-0"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">You might also like</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="group relative overflow-hidden rounded-lg border bg-background"
                  >
                    <Link
                      href={`/product/${relatedProduct.id}`}
                      className="relative block overflow-hidden"
                    >
                      {relatedProduct.externalImage ? (
                        <img
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          className="h-[300px] w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <Image
                          src={
                            relatedProduct.image ||
                            `/placeholder.svg?height=300&width=300`
                          }
                          alt={relatedProduct.name}
                          width={300}
                          height={300}
                          className="h-[300px] w-full object-cover transition-transform group-hover:scale-105"
                        />
                      )}
                    </Link>
                    <div className="p-4">
                      <h3 className="font-medium">
                        <Link href={`/product/${relatedProduct.id}`}>
                          {relatedProduct.name}
                        </Link>
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground">
                          {relatedProduct.category}
                        </p>
                        <div className="font-medium">
                          ₹{relatedProduct.price.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold"
            >
              <ShoppingBag className="h-5 w-5" />
              StyleHub
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} StyleHub. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 text-sm font-medium">
            <Link
              href="/about"
              className="transition-colors hover:text-foreground/80"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-foreground/80"
            >
              Contact
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground/80"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground/80"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
