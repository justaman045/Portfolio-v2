import { NextResponse } from "next/server";

import { validateEnv } from "@/lib/env";

// Validate environment at load time
validateEnv();

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    // In a production setup, this would integrate with an email service
    // (e.g., Mailchimp, ConvertKit, or Google Apps Script). For now, we
    // acknowledge the subscription successfully.
    console.log(`[newsletter] New subscriber: ${email}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[newsletter] Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: "Internal error" },
      { status: 500 }
    );
  }
}
