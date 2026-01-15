"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = action({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
