"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartButton from "@/app/components/card-button";
import { Button } from "@/app/components/ui-elements";
import { useAuth } from "@/app/lib/auth-context";
import { ShoppingBag, User, LogOut, ChevronDown } from "lucide-react";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <ShoppingBag className="h-6 w-6" />
          StyleHub
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/category/men"
            className="transition-colors hover:text-gray-600"
          >
            Men
          </Link>
          <Link
            href="/category/women"
            className="transition-colors hover:text-gray-600"
          >
            Women
          </Link>
          <Link
            href="/category/kids"
            className="transition-colors hover:text-gray-600"
          >
            Kids
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <CartButton />

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>{user?.name || "Account"}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
