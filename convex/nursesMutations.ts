import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const submitNurseApplication = mutation({
  args: {
    name: v.string(),
    contactNumber: v.string(),
    email: v.string(),
    gender: v.string(),
    nursingQualification: v.string(),
    nursingCategory: v.string(),
    serviceAreas: v.array(v.string()),
    licenseNo: v.string(),
    documentId: v.id("_storage"),
    specificSkills: v.string(),
    transportMode: v.string(),
    languagesKnown: v.array(v.string()),
  },
  returns: v.id("nurses"),
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("nurses")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("An application with this email already exists");
    }

    // Verify document exists
    const document = await ctx.db.system.get("_storage", args.documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    const nurseId = await ctx.db.insert("nurses", {
      name: args.name,
      contactNumber: args.contactNumber,
      email: args.email,
      gender: args.gender,
      nursingQualification: args.nursingQualification,
      nursingCategory: args.nursingCategory,
      serviceAreas: args.serviceAreas,
      licenseNo: args.licenseNo,
      documentId: args.documentId,
      specificSkills: args.specificSkills,
      transportMode: args.transportMode,
      languagesKnown: args.languagesKnown,
      status: "pending",
    });

    // Schedule emails asynchronously (don't block on email sending)
    await ctx.scheduler.runAfter(0, internal.emailService.sendPendingVerificationEmail, {
      email: args.email,
      name: args.name,
      applicantType: "nurse",
    });

    await ctx.scheduler.runAfter(0, internal.emailService.sendAdminNewApplicationEmail, {
      name: args.name,
      email: args.email,
      applicantType: "nurse",
    });

    return nurseId;
  },
});
