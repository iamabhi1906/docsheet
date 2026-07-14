import { adminAuth } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const idToken = authorization.split("Bearer ")[1];

  try {
    await adminAuth.verifyIdToken(idToken, true);
    const response = NextResponse.json({ status: "success" });
    // const expiresIn = 60 * 60 * 24 * 5 * 1000;
    response.cookies.set("session", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // expires: expiresIn,
      sameSite: "lax",
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
