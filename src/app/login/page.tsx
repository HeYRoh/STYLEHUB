"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import {
  ShoppingBag,
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Button,
  Input,
  Label,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui-elements";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const { login, register, isLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // Map email-signup to email in the state
    if (id === "email-signup") {
      setSignupData({ ...signupData, email: value });
    } else if (id === "password-signup") {
      setSignupData({ ...signupData, password: value });
    } else {
      setSignupData({ ...signupData, [id]: value });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(loginData.email, loginData.password);
      // Redirect is handled in the auth context
    } catch (error) {
      // Error is handled in the auth context
      console.error("Login error:", error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate passwords match
      if (signupData.password !== signupData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await register(
        `${signupData.firstName} ${signupData.lastName}`,
        signupData.email,
        signupData.password
      );

      // Redirect is handled in the auth context
    } catch (error) {
      // Error is handled in the auth context
      console.error("Registration error:", error);
    }
  };

  // Create TabsContent elements separately with keys
  const loginTabContent = (
    <TabsContent key="login-tab" value="login" className="space-y-4">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleLoginChange}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-black hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="pl-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
          />
          <label
            htmlFor="remember"
            className="ml-2 block text-sm text-gray-600"
          >
            Remember me
          </label>
        </div>

        <Button
          type="submit"
          className="w-full rounded-lg h-12 mt-6 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>
    </TabsContent>
  );

  const signupTabContent = (
    <TabsContent key="signup-tab" value="signup" className="space-y-4">
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="firstName"
                placeholder="John"
                value={signupData.firstName}
                onChange={handleSignupChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={signupData.lastName}
              onChange={handleSignupChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email-signup"
            className="text-sm font-medium text-gray-700"
          >
            Email
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="email-signup"
              type="email"
              placeholder="john.doe@example.com"
              value={signupData.email}
              onChange={handleSignupChange}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password-signup"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="password-signup"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={signupData.password}
              onChange={handleSignupChange}
              className="pl-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Password
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              className="pl-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-xs text-gray-600">
            I agree to the{" "}
            <Link href="/terms" className="text-black hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-black hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full rounded-lg h-12 mt-4 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>
    </TabsContent>
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <ShoppingBag className="h-8 w-8" />
                <span>StyleHub</span>
              </div>
            </div>

            <div className="space-y-3 text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm">
                {redirectUrl !== "/"
                  ? "Please sign in to continue to your selected page"
                  : "Sign in to your account or create a new one to continue shopping"}
              </p>
            </div>

            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid grid-cols-2 w-full rounded-lg">
                <TabsTrigger
                  value="login"
                  id="login-tab"
                  className="rounded-lg"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="rounded-lg">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {loginTabContent}
              {signupTabContent}
            </Tabs>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            By continuing, you agree to StyleHub's Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
