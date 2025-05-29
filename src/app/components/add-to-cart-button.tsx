"use client";

import { useState } from "react";
import { useCart } from "@/app/lib/cart-context";
import type { Product } from "@/app/lib/types";
import {
  Button,
  RadioGroup,
  RadioGroupItem,
  Label,
} from "@/app/components/ui-elements";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isLoading, setIsLoading] = useState(false);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    setIsLoading(true);

    // Add item to cart
    addItem(product, quantity, selectedSize);

    // Reset quantity after adding to cart
    setQuantity(1);

    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base font-medium">Size</Label>
        <RadioGroup
          defaultValue={selectedSize}
          onValueChange={setSelectedSize}
          className="flex flex-wrap gap-2"
        >
          {product.sizes.map((size) => (
            <div key={size}>
              <RadioGroupItem
                value={size}
                id={`size-${size}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`size-${size}`}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white text-center text-sm font-medium transition-colors hover:bg-gray-100 peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
              >
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
          className="h-10 w-10 rounded-md p-0"
        >
          <span className="sr-only">Decrease quantity</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M5 12h14" />
          </svg>
        </Button>
        <div className="w-12 text-center">{quantity}</div>
        <Button
          variant="outline"
          size="icon"
          onClick={increaseQuantity}
          className="h-10 w-10 rounded-md p-0"
        >
          <span className="sr-only">Increase quantity</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </Button>
      </div>

      <Button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="w-full h-12"
        size="lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-5 w-5"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        Add to Cart
      </Button>
    </div>
  );
}
