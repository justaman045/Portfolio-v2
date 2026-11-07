import * as Sentry from "@sentry/nextjs";

const sentryServerConfig = Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the `repository` property in sentry.server.config.ts,
  // so that the correct release will be detected automatically.
});

export default sentryServerConfig;
