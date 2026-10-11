import { NextResponse } from "next/server";

import { portfolio } from "@/config/content";

export async function GET() {
  const communityEnabled = portfolio.navigation.mainNav.some(
    (item) => item.href === "/community" && item.enabled !== false
  );

  if (!communityEnabled) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const discordLink = process.env.NEXT_PUBLIC_DISCORD_LINK;

  if (!discordLink) {
    return new NextResponse("Discord link not configured", {
      status: 500,
    });
  }

  return NextResponse.redirect(discordLink);
}