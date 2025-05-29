import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price in Indian Rupees
export function formatIndianPrice(price: number): string {
  return "₹" + price.toLocaleString("en-IN");
}

// Function to handle external images
export function getImageUrl(product: any): string {
  if (product.externalImage && product.image) {
    return product.image;
  }
  return (
    product.image ||
    `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(
      product.name
    )}`
  );
}
