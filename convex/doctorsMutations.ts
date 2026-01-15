import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const submitDoctorApplication = mutation({
  args: {
    name: v.string(),
    contactNumber: v.string(),
    email: v.string(),
    medicalQualification: v.string(),
    specialization: v.string(),
    serviceAreas: v.array(v.string()),
    licenseNo: v.string(),
    documentId: v.id("_storage"),
    experience: v.number(),
    clinicalExperience: v.string(),
    availability: v.object({
      days: v.array(v.string()),
      timeRanges: v.optional(
        v.record(
          v.string(),
          v.object({
            start: v.string(),
            end: v.string(),
          })
        )
      ),
      is247: v.boolean(),
    }),
  },
  returns: v.id("doctors"),
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("doctors")
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

    const doctorId = await ctx.db.insert("doctors", {
      name: args.name,
      contactNumber: args.contactNumber,
      email: args.email,
      medicalQualification: args.medicalQualification,
      specialization: args.specialization,
      serviceAreas: args.serviceAreas,
      licenseNo: args.licenseNo,
      documentId: args.documentId,
      experience: args.experience,
      clinicalExperience: args.clinicalExperience,
      availability: args.availability,
      status: "pending",
    });

    // Schedule emails asynchronously (don't block on email sending)
    await ctx.scheduler.runAfter(0, internal.emailService.sendPendingVerificationEmail, {
      email: args.email,
      name: args.name,
      applicantType: "doctor",
    });

    await ctx.scheduler.runAfter(0, internal.emailService.sendAdminNewApplicationEmail, {
      name: args.name,
      email: args.email,
      applicantType: "doctor",
    });

    return doctorId;
  },
});
