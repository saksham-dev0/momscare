import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const updateDoctorStatus = mutation({
  args: {
    id: v.id("doctors"),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Basic admin check - can be enhanced later
    // For now, we'll allow the mutation but in production you'd check auth
    
    const doctor = await ctx.db.get(args.id);
    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const previousStatus = doctor.status;

    await ctx.db.patch(args.id, {
      status: args.status,
    });

    // Send approval email if status changed to "approved"
    if (args.status === "approved" && previousStatus !== "approved") {
      await ctx.scheduler.runAfter(0, internal.emailService.sendApprovedEmail, {
        email: doctor.email,
        name: doctor.name,
        applicantType: "doctor",
      });
    }

    return null;
  },
});

export const updateNurseStatus = mutation({
  args: {
    id: v.id("nurses"),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Basic admin check - can be enhanced later
    // For now, we'll allow the mutation but in production you'd check auth
    
    const nurse = await ctx.db.get(args.id);
    if (!nurse) {
      throw new Error("Nurse not found");
    }

    const previousStatus = nurse.status;

    await ctx.db.patch(args.id, {
      status: args.status,
    });

    // Send approval email if status changed to "approved"
    if (args.status === "approved" && previousStatus !== "approved") {
      await ctx.scheduler.runAfter(0, internal.emailService.sendApprovedEmail, {
        email: nurse.email,
        name: nurse.name,
        applicantType: "nurse",
      });
    }

    return null;
  },
});
