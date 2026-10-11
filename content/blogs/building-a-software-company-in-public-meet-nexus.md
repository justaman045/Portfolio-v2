---
title: "I'm Building a Software Company in Public — Meet Nexus"
date: 2026-10-11
description: How I founded Nexus, a software company that designs, engineers, and sells quality software entirely in-house — with a live storefront, instant license delivery, and a build-and-sell model.
tags:
  [
    Nexus,
    Building in Public,
    Software Company,
    SaaS,
    Next.js,
    Firebase,
    Razorpay,
  ]
readingTime: 4
---

Most engineers build tools, ship them on GitHub, and move on. This time I went one step further: I founded a company around it. **Nexus** is a software company I'm building and selling through in public — every product designed, engineered, and shipped in-house, with no resellers and no outsourced code.

## Why build-and-sell

For years I've built software for others — as a Senior SDET for enterprise clients and as a hobbyist shipping side projects. The step that changes everything is _owning the product end to end_: deciding what to build, building it, pricing it, selling it, and supporting it.

Build-and-sell is that model in its purest form:

- You decide what's worth building.
- You own every line of code.
- There are no resellers and no middlemen — if something is broken, it's on you to fix it.
- Revenue is direct, per-license, and compounding.

It's a demanding way to work, but it forces quality. Nobody buys software that doesn't work.

## How the storefront works

Nexus runs as a proper software storefront, not a landing page:

- **Browse the catalogue** — each product has a real listing with features, description, and where it applies.
- **Secure checkout** — payments flow through Razorpay. Safe, instant, and familiar.
- **License-based access** — after checkout you receive a license key immediately, and it lives in your personal **Vault** dashboard.

Every purchase is tied to an email, so buyers can also track their orders anytime — no guessing whether their license was delivered.

## The stack

Building the whole thing solo meant choosing boring, reliable pieces:

- **Next.js** for the storefront — server-rendered, fast, and easy to iterate on.
- **Firebase (Firestore + Auth)** — the live catalogue, orders, and the Vault dashboard. Products are data, not code, so adding a new product doesn't require a deploy to the storefront logic.
- **Razorpay** for payments and license delivery.

Keeping the catalogue in Firestore is what makes the whole thing sustainable: I can add, price, and manage products through an admin portal without touching the frontend.

## What I've learned so far

- **Delivery is the product.** A license that arrives in seconds beats one that arrives by email after "manual processing".
- **Owning the loop changes your taste.** When support tickets reach your inbox instead of a vendor's, you design for less complexity from day one.
- **Shipping small is a strategy.** A smaller catalogue done well beats a large catalogue done badly. Quality is the only moat.

## What's next

The company is live and selling. Over the coming months I'll keep shipping quality products, writing about the journey, and sharing the wins and the failures.

If you want to see what I'm selling right now, the current catalogue is live — check it out at **https://nexusprods.vercel.app/**.

Building in public means being accountable in public. This is Nexus — I hope you'll follow along.
