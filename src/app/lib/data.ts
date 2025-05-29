import type { Product, CartItem } from "./types";

export const products: Product[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 1999,
    description:
      "A comfortable and versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear.",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    externalImage: true,
    rating: 4,
    reviews: 42,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 3499,
    description:
      "Modern slim fit jeans with a comfortable stretch. Made with sustainable denim that lasts longer.",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    externalImage: true,
    rating: 5,
    reviews: 28,
    sizes: ["30", "32", "34", "36"],
  },
  {
    id: 3,
    name: "Casual Blazer",
    price: 5999,
    description:
      "A stylish casual blazer that can be dressed up or down. Perfect for work or evening events.",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    externalImage: true,
    rating: 4,
    reviews: 16,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Summer Dress",
    price: 2999,
    description:
      "A light and flowy summer dress with a floral pattern. Perfect for warm days and special occasions.",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    externalImage: true,
    rating: 5,
    reviews: 37,
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 5,
    name: "High Waist Pants",
    price: 3999,
    description:
      "Elegant high waist pants that flatter your figure. Versatile enough for office or casual wear.",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    externalImage: true,
    rating: 4,
    reviews: 24,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Knit Sweater",
    price: 4499,
    description:
      "A cozy knit sweater made from soft wool blend. Keep warm in style during colder months.",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    externalImage: true,
    rating: 4,
    reviews: 19,
    sizes: ["S", "M", "L"],
  },
  {
    id: 7,
    name: "Dinosaur T-Shirt",
    price: 899,
    description:
      "Fun dinosaur print t-shirt for kids. Made from soft, durable cotton that withstands active play.",
    category: "Kids",
    image:
      "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    externalImage: true,
    rating: 5,
    reviews: 45,
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
  },
  {
    id: 8,
    name: "Denim Overalls",
    price: 2499,
    description:
      "Cute and practical denim overalls for kids. Multiple pockets and adjustable straps for growing children.",
    category: "Kids",
    image:
      "https://images.unsplash.com/photo-1543854589-fdd815f176e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    externalImage: true,
    rating: 4,
    reviews: 31,
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
  },
  {
    id: 9,
    name: "Hooded Sweatshirt",
    price: 1999,
    description:
      "Comfortable hooded sweatshirt for kids. Perfect for layering in cooler weather.",
    category: "Kids",
    image:
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    externalImage: true,
    rating: 4,
    reviews: 22,
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
  },
];

export const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 1999,
    quantity: 1,
    category: "Men",
    size: "M",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    externalImage: true,
  },
  {
    id: 4,
    name: "Summer Dress",
    price: 2999,
    quantity: 1,
    category: "Women",
    size: "S",
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    externalImage: true,
  },
];
