"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/app/components/ui-elements";
import { useCart } from "@/app/lib/cart-context";

export default function CartButton() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart">
      <Button variant="outline" size="icon" className="rounded-full relative">
        <ShoppingBag className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
            {itemCount}
          </span>
        )}
        <span className="sr-only">Cart</span>
      </Button>
    </Link>
  );
}
