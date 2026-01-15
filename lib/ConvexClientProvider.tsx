"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(() => {
    // Get the Convex URL from environment variable
    // During build, if NEXT_PUBLIC_CONVEX_URL is not set, use a placeholder
    // to prevent the ConvexReactClient constructor from throwing an error
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://different-stoat-462.convex.cloud";
    
    try {
      return new ConvexReactClient(convexUrl);
    } catch (error) {
      // Fallback: create client with placeholder if initialization fails
      console.warn("Failed to initialize Convex client, using placeholder:", error);
      return new ConvexReactClient("https://different-stoat-462.convex.cloud");
    }
  }, []);

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}