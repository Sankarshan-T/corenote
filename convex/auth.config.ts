import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://champion-perch-75.clerk.accounts.dev",
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;