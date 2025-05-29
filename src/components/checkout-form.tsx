"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/hooks/use-toast";
import { useAuth } from "@/app/lib/auth-context";
import { useCart } from "@/app/lib/cart-context";
import { Button, Input, Label } from "@/app/components/ui-elements";
import {
  ChevronRight,
  MapPin,
  ArrowRight,
  CheckCircle,
  User,
  Mail,
  Phone,
  Home,
  Building,
  MapPinned,
  Globe,
  Wallet,
  CreditCardIcon,
  Banknote,
  Clock,
} from "lucide-react";

interface CheckoutFormProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

export default function CheckoutForm({
  subtotal,
  shipping,
  tax,
  total,
  currentStep,
  setCurrentStep,
}: CheckoutFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  // Form states
  const [contactInfo, setContactInfo] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleShippingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [id]: value }));
  };

  const handleContinueToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate contact info
    if (
      !contactInfo.firstName ||
      !contactInfo.lastName ||
      !contactInfo.email ||
      !contactInfo.phone
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setCurrentStep("shipping");
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate shipping address
    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postalCode
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setCurrentStep("payment");
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    try {
      // Show processing message based on payment method
      toast({
        title: "Processing payment",
        description: `Processing your ${getPaymentMethodName(
          selectedPaymentMethod
        )} payment...`,
      });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear the cart
      clearCart();

      toast({
        title: "Payment successful",
        description: "Your order has been placed successfully!",
        variant: "success",
      });

      // Redirect to order confirmation page
      router.push("/checkout/success");
    } catch (error) {
      toast({
        title: "Payment failed",
        description:
          "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "card":
        return "credit card";
      case "upi":
        return "UPI";
      case "cod":
        return "cash on delivery";
      default:
        return "payment";
    }
  };

  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <div
        className={`rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden ${
          currentStep !== "information" ? "opacity-90" : ""
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                currentStep === "information"
                  ? "bg-black text-white"
                  : currentStep === "shipping" || currentStep === "payment"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {currentStep === "shipping" || currentStep === "payment" ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
            <h2 className="text-lg font-semibold">Contact Information</h2>
          </div>
          {currentStep !== "information" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentStep("information")}
              className="text-sm"
            >
              Edit
            </Button>
          )}
        </div>

        {currentStep === "information" ? (
          <form onSubmit={handleContinueToShipping} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="firstName"
                    value={contactInfo.firstName}
                    onChange={handleContactInfoChange}
                    className="pl-10"
                    placeholder="John"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={contactInfo.lastName}
                  onChange={handleContactInfoChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={handleContactInfoChange}
                  className="pl-10"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={handleContactInfoChange}
                  className="pl-10"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full rounded-lg h-12 mt-4">
              Continue to Shipping
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        ) : (
          <div className="p-6">
            <div className="text-sm">
              <p>
                <span className="font-medium">
                  {contactInfo.firstName} {contactInfo.lastName}
                </span>
              </p>
              <p className="text-gray-500">{contactInfo.email}</p>
              <p className="text-gray-500">{contactInfo.phone}</p>
            </div>
          </div>
        )}
      </div>

      {/* Shipping Address */}
      <div
        className={`rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden ${
          currentStep !== "shipping" ? "opacity-90" : ""
        } ${currentStep === "information" ? "opacity-60" : ""}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                currentStep === "shipping"
                  ? "bg-black text-white"
                  : currentStep === "payment"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {currentStep === "payment" ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <MapPin className="h-5 w-5" />
              )}
            </div>
            <h2 className="text-lg font-semibold">Shipping Address</h2>
          </div>
          {currentStep !== "shipping" && currentStep !== "information" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentStep("shipping")}
              className="text-sm"
            >
              Edit
            </Button>
          )}
        </div>

        {currentStep === "shipping" ? (
          <form onSubmit={handleContinueToPayment} className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="street" className="text-sm font-medium">
                Street Address <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Home className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="street"
                  value={shippingAddress.street}
                  onChange={handleShippingAddressChange}
                  className="pl-10"
                  placeholder="123 Main Street"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment" className="text-sm font-medium">
                Apartment, Suite, etc. (optional)
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="apartment"
                  value={shippingAddress.apartment}
                  onChange={handleShippingAddressChange}
                  className="pl-10"
                  placeholder="Apt 4B, Floor 3"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">
                  City <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPinned className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="city"
                    value={shippingAddress.city}
                    onChange={handleShippingAddressChange}
                    className="pl-10"
                    placeholder="Mumbai"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium">
                  State <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="state"
                  value={shippingAddress.state}
                  onChange={handleShippingAddressChange}
                  placeholder="Maharashtra"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="postalCode" className="text-sm font-medium">
                  Postal Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleShippingAddressChange}
                  placeholder="400001"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">
                  Country <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="country"
                    value={shippingAddress.country}
                    onChange={handleShippingAddressChange}
                    className="pl-10"
                    placeholder="India"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center pt-4">
              <input
                id="saveAddress"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <label
                htmlFor="saveAddress"
                className="ml-2 block text-sm text-gray-600"
              >
                Save this address for future orders
              </label>
            </div>

            <Button type="submit" className="w-full rounded-lg h-12 mt-4">
              Continue to Payment
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        ) : currentStep === "payment" ? (
          <div className="p-6">
            <div className="text-sm">
              <p>
                <span className="font-medium">{shippingAddress.street}</span>
                {shippingAddress.apartment && `, ${shippingAddress.apartment}`}
              </p>
              <p className="text-gray-500">
                {shippingAddress.city}, {shippingAddress.state}{" "}
                {shippingAddress.postalCode}
              </p>
              <p className="text-gray-500">{shippingAddress.country}</p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Payment Information */}
      <div
        className={`rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden ${
          currentStep !== "payment" ? "opacity-60" : ""
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                currentStep === "payment"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <Wallet className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold">Payment Method</h2>
          </div>
        </div>

        {currentStep === "payment" && (
          <form onSubmit={handlePlaceOrder} className="p-6 space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-2">
                Select a payment method below. No real payment will be processed
                as this is a demo.
              </p>

              {/* Credit Card Option */}
              <div
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer ${
                  selectedPaymentMethod === "card"
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPaymentMethod("card")}
              >
                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                    selectedPaymentMethod === "card"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPaymentMethod === "card" && (
                    <div className="h-3 w-3 rounded-full bg-black"></div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                    <CreditCardIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Credit / Debit Card</p>
                    <p className="text-xs text-gray-500">
                      Mock payment - no real card required
                    </p>
                  </div>
                </div>
              </div>

              {/* UPI Option */}
              <div
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer ${
                  selectedPaymentMethod === "upi"
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPaymentMethod("upi")}
              >
                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                    selectedPaymentMethod === "upi"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPaymentMethod === "upi" && (
                    <div className="h-3 w-3 rounded-full bg-black"></div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
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
                      className="h-6 w-6 text-green-600"
                    >
                      <path d="M16 2v5h5" />
                      <path d="M21 6v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9" />
                      <path d="m9 14 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">UPI</p>
                    <p className="text-xs text-gray-500">
                      Mock payment - no real UPI required
                    </p>
                  </div>
                </div>
              </div>

              {/* Cash on Delivery Option */}
              <div
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer ${
                  selectedPaymentMethod === "cod"
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPaymentMethod("cod")}
              >
                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                    selectedPaymentMethod === "cod"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPaymentMethod === "cod" && (
                    <div className="h-3 w-3 rounded-full bg-black"></div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-yellow-100 flex items-center justify-center">
                    <Banknote className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">
                      Pay when you receive your order
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Payment Message */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800 flex items-start gap-3">
              <div className="mt-0.5">
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
                  className="h-5 w-5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Demo Mode</p>
                <p className="mt-1">
                  This is a demo checkout. No actual payment will be processed.
                  Click "Place Order" to simulate a successful payment.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100">
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-sm">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium">Shipping</span>
                <span className="text-sm">
                  ₹{shipping.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium">Tax (18% GST)</span>
                <span className="text-sm">₹{tax.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <span className="text-base font-semibold">Total</span>
                <span className="text-lg font-semibold">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-lg h-12 mt-4 flex items-center justify-center gap-2"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  Place Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-1 text-xs text-gray-500">
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
                  className="h-4 w-4"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                Secure
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-4 w-4" />
                Quick
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
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
                  className="h-4 w-4"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Safe
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              By placing your order, you agree to our{" "}
              <a href="/terms" className="text-black underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-black underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
