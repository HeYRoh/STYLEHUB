export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  externalImage?: boolean;
  rating: number;
  reviews: number;
  sizes: string[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  size: string;
  image?: string;
  externalImage?: boolean;
}
