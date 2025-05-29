"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";
import { Button } from "@/app/components/ui-elements";
import {
  ShoppingBag,
  CheckCircle,
  ArrowRight,
  Package,
  Truck,
  Clock,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  ShieldCheck,
} from "lucide-react";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({
    orderNumber: "",
    date: "",
    items: 0,
    total: 0,
    estimatedDelivery: "",
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?redirect=/checkout/success");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    // Generate order details
    const generateOrderDetails = () => {
      const orderNumber = `STH${Math.floor(Math.random() * 100000)
        .toString()
        .padStart(6, "0")}`;

      const today = new Date();
      const date = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Estimated delivery date (5-7 business days from now)
      const deliveryDate = new Date(today);
      deliveryDate.setDate(
        deliveryDate.getDate() + 5 + Math.floor(Math.random() * 3)
      );
      const estimatedDelivery = deliveryDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return {
        orderNumber,
        date,
        items: 3 + Math.floor(Math.random() * 3), // Random number of items between 3-5
        total: 2499 + Math.floor(Math.random() * 5000), // Random total between 2499-7499
        estimatedDelivery,
      };
    };

    // Simulate loading data
    const timer = setTimeout(() => {
      setOrderDetails(generateOrderDetails());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // If still loading auth or not authenticated, show loading state
  if (authLoading || !isAuthenticated || isLoading) {
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
              <CheckCircle className="h-8 w-8 text-gray-400 animate-pulse" />
            </div>
            <h2 className="text-xl font-semibold">Processing your order...</h2>
            <p className="text-gray-500 mt-2">
              Please wait while we confirm your purchase
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
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Success Header */}
              <div className="p-8 text-center border-b border-gray-100 bg-gradient-to-b from-green-50 to-white">
                <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Thank you for your purchase. Your order has been received and
                  is being processed.
                </p>
                <div className="inline-block bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-200">
                  <div className="text-sm text-gray-500">Order Number</div>
                  <div className="text-xl font-bold">
                    #{orderDetails.orderNumber}
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Order Details
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">Order Date</div>
                          <div className="text-sm text-gray-600">
                            {orderDetails.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">Items</div>
                          <div className="text-sm text-gray-600">
                            {orderDetails.items} items
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">
                            Total Amount
                          </div>
                          <div className="text-sm text-gray-600">
                            ₹{orderDetails.total.toLocaleString("en-IN")}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Truck className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">
                            Estimated Delivery
                          </div>
                          <div className="text-sm text-gray-600">
                            {orderDetails.estimatedDelivery}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Delivery Information
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">Recipient</div>
                          <div className="text-sm text-gray-600">
                            {user?.name || "Customer"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">Email</div>
                          <div className="text-sm text-gray-600">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">Phone</div>
                          <div className="text-sm text-gray-600">
                            +91 98765 43210
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">
                            Shipping Address
                          </div>
                          <div className="text-sm text-gray-600">
                            123 Main Street, Apartment 4B
                            <br />
                            Mumbai, Maharashtra 400001
                            <br />
                            India
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What's Next Section */}
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h2 className="text-lg font-semibold mb-6">What's Next?</h2>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-medium mb-2">Order Processing</h3>
                      <p className="text-sm text-gray-600">
                        We're preparing your items for shipment. You'll receive
                        an email once your order is ready.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <Truck className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-medium mb-2">Shipping</h3>
                      <p className="text-sm text-gray-600">
                        Your order will be shipped within 1-2 business days.
                        You'll receive tracking information via email.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-medium mb-2">Delivery</h3>
                      <p className="text-sm text-gray-600">
                        Estimated delivery time is 5-7 business days, depending
                        on your location.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Confirmation */}
                <div className="mt-10 pt-6 border-t border-gray-100 text-center">
                  <div className="max-w-xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        We've sent a confirmation email to{" "}
                        <span className="font-medium">{user?.email}</span> with
                        all the details of your order.
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-6">
                      <ShieldCheck className="h-5 w-5 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        If you have any questions, please contact our customer
                        support at{" "}
                        <a
                          href="mailto:support@stylehub.com"
                          className="text-black underline"
                        >
                          support@stylehub.com
                        </a>
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                      <Link href="/">
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto px-8"
                        >
                          Continue Shopping
                        </Button>
                      </Link>
                      <Link href="/account/orders">
                        <Button className="w-full sm:w-auto px-8">
                          Track Order
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white mt-12">
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

function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
