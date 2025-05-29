"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useToast } from "@/app/hooks/use-toast";
import { useAuth } from "@/app/lib/auth-context"; // Import auth context
import type { CartItem, Product } from "@/app/lib/types";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, size: string) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth(); // Get authentication state
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load cart from localStorage on initial render or when user changes
  useEffect(() => {
    const loadCart = () => {
      if (isAuthenticated && user) {
        // If authenticated, try to load user's cart from server
        const fetchUserCart = async () => {
          try {
            const response = await fetch(`/api/cart`);
            if (response.ok) {
              const data = await response.json();
              setItems(data.items || []);
            }
          } catch (error) {
            console.error("Failed to fetch user cart:", error);
            // Fallback to localStorage if API fails
            const storedCart = localStorage.getItem(`cart-${user.id}`);
            if (storedCart) {
              try {
                setItems(JSON.parse(storedCart));
              } catch (e) {
                console.error("Failed to parse cart from localStorage:", e);
              }
            }
          }
        };

        fetchUserCart();
      } else {
        // For guest users, just use localStorage
        const storedCart = localStorage.getItem("guest-cart");
        if (storedCart) {
          try {
            setItems(JSON.parse(storedCart));
          } catch (e) {
            console.error("Failed to parse cart from localStorage:", e);
          }
        }
      }

      setLoaded(true);
    };

    loadCart();
  }, [user, isAuthenticated]);

  // Save cart to localStorage and/or server whenever it changes
  useEffect(() => {
    if (!loaded) return;

    const saveCart = async () => {
      if (isAuthenticated && user) {
        // Save to localStorage as backup
        localStorage.setItem(`cart-${user.id}`, JSON.stringify(items));

        // Save to server
        try {
          await fetch(`/api/cart`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ items }),
          });
        } catch (error) {
          console.error("Failed to save cart to server:", error);
        }
      } else {
        // For guest users, just use localStorage
        localStorage.setItem("guest-cart", JSON.stringify(items));
      }
    };

    saveCart();
  }, [items, loaded, user, isAuthenticated]);

  const addItem = (product: Product, quantity: number, size: string) => {
    // Strict authentication check
    if (!isAuthenticated || !user) {
      setTimeout(() => {
        toast({
          title: "Authentication required",
          description: "Please log in to add items to your cart.",
          variant: "destructive",
        });
      }, 0);
      return;
    }

    // Check if item already exists in cart with the same size
    const existingItemIndex = items.findIndex(
      (item) => item.id === product.id && item.size === size
    );

    setItems((prevItems) => {
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          category: product.category,
          size: size,
          image: product.image,
          externalImage: product.externalImage,
        };
        return [...prevItems, newItem];
      }
    });

    // Show toast notification AFTER state update using setTimeout
    setTimeout(() => {
      if (existingItemIndex >= 0) {
        toast({
          title: "Cart updated",
          description: `Updated quantity of ${product.name} (${size}) in your cart.`,
        });
      } else {
        toast({
          title: "Added to cart",
          description: `${product.name} (${size}) has been added to your cart.`,
        });
      }
    }, 0);
  };

  const removeItem = (id: number) => {
    // Strict authentication check
    if (!isAuthenticated || !user) {
      return;
    }

    // Find the item before removing it
    const itemToRemove = items.find((item) => item.id === id);

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    // Show toast notification AFTER state update
    if (itemToRemove) {
      setTimeout(() => {
        toast({
          title: "Item removed",
          description: `${itemToRemove.name} has been removed from your cart.`,
        });
      }, 0);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    // Strict authentication check
    if (!isAuthenticated || !user) {
      return;
    }

    if (quantity < 1) return;

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    // Strict authentication check
    if (!isAuthenticated || !user) {
      return;
    }

    setItems([]);

    // Show toast notification AFTER state update
    setTimeout(() => {
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    }, 0);
  };

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
