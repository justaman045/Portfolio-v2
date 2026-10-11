import dns from "node:dns";

import { NextResponse } from "next/server";

// Some hosts advertise broken IPv6 first; prefer IPv4 so the outbound POST
// to Google does not hang on an unreachable AAAA route.
dns.setDefaultResultOrder("ipv4first");

async function deliver(submitUrl: string, body: string): Promise<boolean> {
  // A single retry covers transient connection failures. A timeout is not
  // retried: Apps Script may already have recorded the row, and retrying
  // would duplicate it.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body,
        redirect: "manual",
        signal: AbortSignal.timeout(60_000),
      });

      const location = res.headers.get("location") ?? "";

      // Google Apps Script web apps redirect `/exec` to their echo host for
      // every request. Reaching that redirect means `doPost` executed and the
      // row was recorded. (Browsers then get the JSON; server-side clients get
      // a 405 block page, so we must not follow it.) A dead deployment instead
      // answers 404 with no redirect.
      if (
        res.status >= 300 &&
        res.status < 400 &&
        location.includes("script.googleusercontent.com")
      ) {
        return true;
      }

      if (res.ok) {
        const json = (await res.json()) as { success?: boolean };
        if (json.success) return true;
      }

      console.error(
        `[contact] submit attempt ${attempt} failed: status ${res.status}`
      );
    } catch (error) {
      console.error(`[contact] submit attempt ${attempt} threw:`, error);
      if (
        error instanceof Error &&
        (error.name === "TimeoutError" || error.name === "AbortError")
      ) {
        return false;
      }
    }
  }

  return false;
}

export async function POST(req: Request) {
  const submitUrl = process.env.CONTACT_SUBMIT_URL;

  if (!submitUrl) {
    return new NextResponse(
      "Please configure the CONTACT_SUBMIT_URL env variable",
      { status: 500 }
    );
  }

  try {
    const { name, email, message, social } = await req.json();

    const delivered = await deliver(
      submitUrl,
      JSON.stringify({ name, email, message, social })
    );

    if (!delivered) {
      return new NextResponse("Failed to submit the form", { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] unexpected error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}