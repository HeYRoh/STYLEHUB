import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Helper function to get user ID from token
async function getUserIdFromToken(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = verify(token, JWT_SECRET) as { id: string; email: string };
    return decoded.id;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

// GET cart
export async function GET(request: Request) {
  try {
    const userId = await getUserIdFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user's cart
    const cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    // Parse items from JSON string
    const items = JSON.parse(cart.items);

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT (update) cart
export async function PUT(request: Request) {
  try {
    const userId = await getUserIdFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { items } = body;

    // Convert items to JSON string
    const itemsJson = JSON.stringify(items);

    // Upsert cart (update if exists, create if not)
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: { items: itemsJson },
      create: {
        userId,
        items: itemsJson,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE cart
export async function DELETE(request: Request) {
  try {
    const userId = await getUserIdFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete user's cart
    await prisma.cart.deleteMany({
      where: { userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting cart:", error);
    return NextResponse.json(
      { error: "Failed to delete cart" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
