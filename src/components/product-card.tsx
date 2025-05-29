"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/lib/cart-context";
import type { Product } from "@/app/lib/types";
import { Button } from "@/app/components/ui-elements";
import { ShoppingBag } from "lucide-react";
import { useAuth } from "@/app/lib/auth-context"; // Import the auth context

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { user, isAuthenticated } = useAuth(); // Get authentication state
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page

    // Check if user is logged in
    if (!isAuthenticated) {
      // Redirect to login page with return URL
      router.push(
        `/login?redirect=${encodeURIComponent(`/product/${product.id}`)}`
      );
      return;
    }

    setIsLoading(true);

    try {
      // Add item to cart with default size
      addItem(product, 1, product.sizes[0]);

      // Reset loading state after a short delay to show feedback
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link
        href={`/product/${product.id}`}
        className="relative block overflow-hidden"
      >
        {product.externalImage ? (
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-[300px] w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <Image
            src={product.image || `/placeholder.svg?height=300&width=300`}
            alt={product.name}
            width={300}
            height={300}
            className="h-[300px] w-full object-cover transition-transform group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">
              <Link href={`/product/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <div className="text-right font-medium">
            ₹{product.price.toLocaleString("en-IN")}
          </div>
        </div>
        <div className="mt-4">
          <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-full rounded-lg"
            variant="outline"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
