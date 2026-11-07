"use client";

import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

interface NewsletterFormProps {
  /** Label for the email input */
  label?: string;
  /** Text for the submit button */
  buttonText?: string;
}

/**
 * Newsletter subscription form with client-side validation and
 * POST to /api/newsletter. Shows success/error states inline.
 */
export function NewsletterForm({
  label = "Email address",
  buttonText = "Subscribe",
}: NewsletterFormProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const result = schema.safeParse({ email });
    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error.errors[0]?.message || "Invalid email");
      return;
    }

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: result.data.email }),
      });

      if (!res.ok) {
        const body = (await res.json()) as { message?: string };
        setStatus("error");
        setErrorMessage(
          body.message || "Subscription failed. Please try again."
        );
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Subscription failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "success" ? (
        <div className="flex flex-col items-center text-center py-8">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="font-bold text-foreground mb-2">Subscribed!</h3>
          <p className="text-muted-foreground">
            Thank you for subscribing. You&apos;ll hear from me soon.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <label
              htmlFor="newsletter-email"
              className="text-sm font-medium text-foreground"
            >
              {label}
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              disabled={status === "submitting"}
              placeholder="you@example.com"
            />
            {errorMessage && (
              <p className="text-sm text-destructive">{errorMessage}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Subscribing..." : buttonText}
          </button>
        </>
      )}
    </form>
  );
}
