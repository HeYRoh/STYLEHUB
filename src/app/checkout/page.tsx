"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/lib/cart-context";
import { useAuth } from "@/app/lib/auth-context";
import {
  ShoppingBag,
  ChevronLeft,
  CreditCard,
  ShieldCheck,
  Truck,
  Clock,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";
import CheckoutForm from "@/app/components/checkout-form";
import { Button } from "@/app/components/ui-elements";

// Checkout steps
const CHECKOUT_STEPS = [
  { id: "information", label: "Information" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { items: cartItems, subtotal } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState("information");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?redirect=/checkout");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const shipping = cartItems.length > 0 ? 99 : 0; // Fixed shipping cost in INR
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  // If still loading auth or not authenticated, show loading state
  if (authLoading || !isAuthenticated) {
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
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <LockKeyhole className="h-8 w-8 text-gray-400 animate-pulse" />
            </div>
            <h2 className="text-xl font-semibold">Securing your checkout...</h2>
            <p className="text-gray-500 mt-2">
              Please wait while we prepare your checkout experience
            </p>
          </div>
        </main>
        <footer className="border-t bg-white py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} StyleHub. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  if (isLoading) {
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
            </div>
          </div>
        </header>
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Skeleton loader */}
              <div className="animate-pulse">
                <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
                <div className="grid gap-8 md:grid-cols-5">
                  <div className="md:col-span-3 space-y-6">
                    <div className="h-12 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="space-y-4">
                      <div className="h-10 bg-gray-200 rounded w-full"></div>
                      <div className="h-10 bg-gray-200 rounded w-full"></div>
                      <div className="h-10 bg-gray-200 rounded w-full"></div>
                      <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="h-64 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="border-t bg-white py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} StyleHub. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  if (cartItems.length === 0) {
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
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">
              You need to add items to your cart before proceeding to checkout.
            </p>
            <Link href="/">
              <Button size="lg" className="rounded-lg px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        </main>
        <footer className="border-t bg-white py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} StyleHub. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }

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
            <div className="hidden md:flex items-center">
              <div className="flex items-center">
                <LockKeyhole className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm font-medium">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Checkout progress */}
            <div className="flex justify-between items-center">
              {CHECKOUT_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium ${
                      currentStep === step.id
                        ? "bg-black text-white"
                        : index <
                          CHECKOUT_STEPS.findIndex((s) => s.id === currentStep)
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index <
                    CHECKOUT_STEPS.findIndex((s) => s.id === currentStep) ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium hidden sm:inline ${
                      currentStep === step.id
                        ? "text-black"
                        : index <
                          CHECKOUT_STEPS.findIndex((s) => s.id === currentStep)
                        ? "text-green-700"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>

                  {index < CHECKOUT_STEPS.length - 1 && (
                    <div className="mx-4 h-px w-12 bg-gray-200 hidden sm:block"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/cart"
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors mb-6"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Cart
            </Link>

            <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid gap-8 md:grid-cols-5">
              <div className="md:col-span-3">
                <CheckoutForm
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              </div>

              <div className="md:col-span-2">
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden sticky top-24">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold mb-1">
                      Order Summary
                    </h2>
                    <p className="text-sm text-gray-500">
                      {cartItems.length}{" "}
                      {cartItems.length === 1 ? "item" : "items"}
                    </p>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto p-6 space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
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
                                `/placeholder.svg?height=80&width=80`
                              }
                              alt={item.name}
                              width={80}
                              height={80}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                              Size: {item.size}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                              Qty: {item.quantity}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-gray-500">
                              ₹{item.price.toLocaleString("en-IN")} ×{" "}
                              {item.quantity}
                            </p>
                            <p className="text-sm font-medium">
                              ₹
                              {(item.price * item.quantity).toLocaleString(
                                "en-IN"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>₹{subtotal.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span>₹{shipping.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax (18% GST)</span>
                        <span>₹{tax.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span className="text-lg">
                            ₹{total.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <ShieldCheck className="h-4 w-4 mr-1 text-gray-400" />
                        Secure Payment
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Truck className="h-4 w-4 mr-1 text-gray-400" />
                        Fast Delivery
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <CreditCard className="h-4 w-4 mr-1 text-gray-400" />
                        Multiple Payment Options
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        24/7 Support
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} StyleHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
