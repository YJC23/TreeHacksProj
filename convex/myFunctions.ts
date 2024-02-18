import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query function:
export const listStories = query({
  // Validators for arguments.
  args: {},

  // Query function implementation.
  handler: async (ctx, args) => {
    // if (args.value == "Kindness") {
    return await ctx.db.query("stories").collect(); // Returns all documents in the 'ideas' table
    // }
    // else {
    //   return await ctx.db
    //     .query("stories")
    //     .filter((q) => q.neq(q.field("random"), true)) // Only returns documents whose 'random' field is not equal to `true`
    //     .collect();
    // }
  },
});

// You can write data to the database via a mutation function:
export const saveStory = mutation({
  // Validators for arguments.
  args: {
    value: v.string(),
    story: v.string(),
    imageUrls: v.string(),
  },

  // Mutation function implementation.
  handler: async (ctx, args) => {
    // Insert or modify documents in the database here.
    // Mutations can also read from the database like queries.
    // See https://docs.convex.dev/database/writing-data.

    // Optionally, capture the ID of the newly created document
    const id = await ctx.db.insert("stories", args);
    // Optionally, return a value from your mutation.
    return id;
  },
});

export const listIdeas = query({
  // Validators for arguments.
  args: {
    includeRandom: v.boolean(),
  },

  // Query function implementation.
  handler: async (ctx, args) => {
    if (args.includeRandom) {
      return await ctx.db.query("ideas").collect(); // Returns all documents in the 'ideas' table
    } else {
      return await ctx.db
        .query("ideas")
        .filter((q) => q.neq(q.field("random"), true)) // Only returns documents whose 'random' field is not equal to `true`
        .collect();
    }
  },
});

// You can write data to the database via a mutation function:
export const saveIdea = mutation({
  // Validators for arguments.
  args: {
    idea: v.string(),
    random: v.boolean(),
  },

  // Mutation function implementation.
  handler: async (ctx, args) => {
    // Insert or modify documents in the database here.
    // Mutations can also read from the database like queries.
    // See https://docs.convex.dev/database/writing-data.

    // Optionally, capture the ID of the newly created document
    const id = await ctx.db.insert("ideas", args);

    // Optionally, return a value from your mutation.
    return id;
  },
});

// You can fetch data from and send data to third-party APIs via an action:
export const fetchRandomIdea = action({
  // Validators for arguments.
  args: {},

  // Action implementation.
  handler: async (ctx) => {
    // Use the browser-like `fetch` API to send HTTP requests.
    // See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
    const response = await fetch("https://appideagenerator.com/call.php");
    const idea = await response.text();

    // Write or query data by running Convex mutations/queries from within an action
    await ctx.runMutation(api.myFunctions.saveIdea, {
      idea: idea.trim(),
      random: true,
    });

    // Optionally, return a value from your action
    return idea;
  },
});
