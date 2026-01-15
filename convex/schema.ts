import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  doctors: defineTable({
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
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected")
    ),
  }).index("by_email", ["email"]),
  nurses: defineTable({
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
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected")
    ),
  }).index("by_email", ["email"]),
});
