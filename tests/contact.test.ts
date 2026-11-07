import { describe, it, expect } from "vitest";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must contain at least 3 characters.",
  }),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, {
    message: "Please write something more descriptive.",
  }),
  social: z.string().url().optional().or(z.literal("")),
  honeypot: z.string().max(0, {
    message: "Invalid submission.",
  }),
});

describe("Contact form schema", () => {
  it("accepts a valid submission with empty honeypot", () => {
    const result = formSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello, this is a test message.",
      social: "",
      honeypot: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a submission with a filled honeypot (bot)", () => {
    const result = formSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello, this is a test message.",
      social: "",
      honeypot: "filled-by-bot",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes("honeypot"))).toBe(
        true
      );
    }
  });

  it("rejects a name shorter than 3 characters", () => {
    const result = formSchema.safeParse({
      name: "Jo",
      email: "john@example.com",
      message: "Hello, this is a test message.",
      social: "",
      honeypot: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = formSchema.safeParse({
      name: "John Doe",
      email: "not-an-email",
      message: "Hello, this is a test message.",
      social: "",
      honeypot: "",
    });
    expect(result.success).toBe(false);
  });

  it("accepts an optional social URL", () => {
    const result = formSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello, this is a test message.",
      social: "https://twitter.com/johndoe",
      honeypot: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a non-URL social value", () => {
    const result = formSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello, this is a test message.",
      social: "not-a-url",
      honeypot: "",
    });
    expect(result.success).toBe(false);
  });
});
