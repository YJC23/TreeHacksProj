import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ideas: defineTable({
    idea: v.string(),
    random: v.boolean(),
  }),
  stories: defineTable({
    value: v.string(),
    story: v.string(),
    imageUrls: v.string(),
  }),
});
