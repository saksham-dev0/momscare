import { query, action } from "./_generated/server";
import { v } from "convex/values";

export const getAllApplicants = query({
  args: {},
  returns: v.array(
    v.object({
      id: v.string(),
      type: v.union(v.literal("doctor"), v.literal("nurse")),
      name: v.string(),
      email: v.string(),
      status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    const doctors = await ctx.db.query("doctors").collect();
    const nurses = await ctx.db.query("nurses").collect();

    const applicants = [
      ...doctors.map((doc) => ({
        id: doc._id,
        type: "doctor" as const,
        name: doc.name,
        email: doc.email,
        status: doc.status,
        createdAt: doc._creationTime,
      })),
      ...nurses.map((doc) => ({
        id: doc._id,
        type: "nurse" as const,
        name: doc.name,
        email: doc.email,
        status: doc.status,
        createdAt: doc._creationTime,
      })),
    ];

    // Sort by creation time, newest first
    return applicants.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const getDoctorById = query({
  args: { id: v.id("doctors") },
  returns: v.union(
    v.object({
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
      status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const doctor = await ctx.db.get(args.id);
    if (!doctor) {
      return null;
    }
    return {
      name: doctor.name,
      contactNumber: doctor.contactNumber,
      email: doctor.email,
      medicalQualification: doctor.medicalQualification,
      specialization: doctor.specialization,
      serviceAreas: doctor.serviceAreas,
      licenseNo: doctor.licenseNo,
      documentId: doctor.documentId,
      experience: doctor.experience,
      clinicalExperience: doctor.clinicalExperience,
      availability: doctor.availability,
      status: doctor.status,
    };
  },
});

export const getNurseById = query({
  args: { id: v.id("nurses") },
  returns: v.union(
    v.object({
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
      status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const nurse = await ctx.db.get(args.id);
    if (!nurse) {
      return null;
    }
    return {
      name: nurse.name,
      contactNumber: nurse.contactNumber,
      email: nurse.email,
      gender: nurse.gender,
      nursingQualification: nurse.nursingQualification,
      nursingCategory: nurse.nursingCategory,
      serviceAreas: nurse.serviceAreas,
      licenseNo: nurse.licenseNo,
      documentId: nurse.documentId,
      specificSkills: nurse.specificSkills,
      transportMode: nurse.transportMode,
      languagesKnown: nurse.languagesKnown,
      status: nurse.status,
    };
  },
});

export const getDocumentUrl = action({
  args: { documentId: v.id("_storage") },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.documentId);
  },
});
