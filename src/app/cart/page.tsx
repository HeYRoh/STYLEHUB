"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/lib/cart-context";
import { useAuth } from "@/app/lib/auth-context";
import { useToast } from "@/app/hooks/use-toast";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { Button, Input, Badge } from "@/app/components/ui-elements";
import {
  ShoppingBag,
  ArrowLeft,
  Trash2,
  CreditCard,
  ShieldCheck,
  Truck,
  RefreshCw,
  Tag,
  Minus,
  Plus,
  X,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?redirect=/cart");
    }
  }, [isAuthenticated, authLoading, router]);

  // If still loading auth or not authenticated, show loading state
  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-pulse" />
            <h2 className="text-xl font-semibold">Loading your cart...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shipping = items.length > 0 ? 99 : 0;
  const total = subtotal + shipping - discount;

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsCheckingOut(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to checkout page
    router.push("/checkout");
  };

  const handleApplyPromo = () => {
    if (!promoCode) {
      toast({
        title: "No promo code entered",
        description: "Please enter a promo code to apply.",
        variant: "destructive",
      });
      return;
    }

    // Simulate a discount
    const discountAmount = Math.round(subtotal * 0.1);
    setDiscount(discountAmount);
    setPromoApplied(true);

    toast({
      title: "Promo code applied",
      description: `Promo code "${promoCode}" has been applied to your order.`,
    });
  };

  const handleRemovePromo = () => {
    setPromoCode("");
    setDiscount(0);
    setPromoApplied(false);

    toast({
      title: "Promo code removed",
      description: "The promo code has been removed from your order.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          {items.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 text-sm font-medium text-gray-500">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Price</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="p-6 md:grid md:grid-cols-12 md:gap-4 md:items-center"
                      >
                        {/* Product Info - Mobile & Desktop */}
                        <div className="flex items-start gap-4 md:col-span-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                            {item.externalImage ? (
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Image
                                src={
                                  item.image ||
                                  `/placeholder.svg?height=96&width=96`
                                }
                                alt={item.name}
                                width={96}
                                height={96}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <h3 className="font-medium text-black">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.category}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="mt-1">
                                Size: {item.size}
                              </Badge>
                            </div>

                            {/* Mobile Price */}
                            <div className="flex items-center justify-between mt-4 md:hidden">
                              <div className="text-sm text-gray-500">
                                ₹{item.price.toLocaleString("en-IN")} ×{" "}
                                {item.quantity}
                              </div>
                              <div className="font-medium">
                                ₹
                                {(item.price * item.quantity).toLocaleString(
                                  "en-IN"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls - Mobile & Desktop */}
                        <div className="mt-4 md:mt-0 md:col-span-2 md:flex md:justify-center">
                          <div className="flex items-center border border-gray-200 rounded-lg max-w-[120px]">
                            <button
                              type="button"
                              className="flex-1 flex items-center justify-center h-8 w-8 text-gray-600 hover:text-black transition-colors"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease</span>
                            </button>
                            <span className="flex-1 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="flex-1 flex items-center justify-center h-8 w-8 text-gray-600 hover:text-black transition-colors"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase</span>
                            </button>
                          </div>
                        </div>

                        {/* Price - Desktop Only */}
                        <div className="hidden md:block md:col-span-2 md:text-right">
                          <div className="font-medium">
                            ₹{item.price.toLocaleString("en-IN")}
                          </div>
                        </div>

                        {/* Total - Desktop Only */}
                        <div className="hidden md:flex md:col-span-2 md:items-center md:justify-end">
                          <div className="font-medium">
                            ₹
                            {(item.price * item.quantity).toLocaleString(
                              "en-IN"
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </button>
                        </div>

                        {/* Remove Button - Mobile Only */}
                        <div className="mt-4 md:hidden">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="text-sm flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear Cart
                    </Button>
                    <div className="text-sm text-gray-500">
                      {items.length} {items.length === 1 ? "item" : "items"} in
                      cart
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        ₹{shipping.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Discount</span>
                        <span className="font-medium text-green-600">
                          -₹{discount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold text-lg">
                          ₹{total.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Including GST
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {!promoApplied ? (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Promo Code</div>
                        <div className="flex">
                          <Input
                            placeholder="Enter code"
                            className="rounded-r-none"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                          />
                          <Button
                            variant="outline"
                            className="rounded-l-none border-l-0"
                            onClick={handleApplyPromo}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 text-green-600 mr-2" />
                          <div>
                            <div className="text-sm font-medium">
                              {promoCode}
                            </div>
                            <div className="text-xs text-gray-500">
                              10% discount applied
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={handleRemovePromo}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    <Button
                      onClick={handleCheckout}
                      disabled={isCheckingOut || items.length === 0}
                      className="w-full h-12 rounded-lg"
                      size="lg"
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                    </Button>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <ShieldCheck className="h-4 w-4 mr-1 text-gray-400" />
                        Secure Checkout
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Truck className="h-4 w-4 mr-1 text-gray-400" />
                        Free Shipping over ₹999
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <CreditCard className="h-4 w-4 mr-1 text-gray-400" />
                        Multiple Payment Options
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <RefreshCw className="h-4 w-4 mr-1 text-gray-400" />
                        Easy Returns
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center max-w-md mx-auto">
              <div className="flex justify-center">
                <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
              </div>
              <h2 className="text-xl font-semibold">Your cart is empty</h2>
              <p className="text-gray-500 mt-2 mb-8 max-w-sm mx-auto">
                Looks like you haven't added anything to your cart yet. Explore
                our products and find something you'll love.
              </p>
              <Link href="/">
                <Button size="lg" className="rounded-lg px-8">
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
