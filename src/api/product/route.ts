import { NextResponse } from "next/server";
import { products } from "@/app/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (category) {
    const filteredProducts = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    return NextResponse.json(filteredProducts);
  }

  return NextResponse.json(products);
}
