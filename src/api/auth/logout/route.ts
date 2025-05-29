import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Delete the auth token cookie
    (await cookies()).delete("auth_token");

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
    