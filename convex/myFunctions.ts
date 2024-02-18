import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query function:
// export const listIdeas = query({
//   // Validators for arguments.
//   args: {includeRandom: v.boolean()},

//   // Query function implementation.
//   handler: async (ctx, args) => {
//     // Read the database as many times as you need here.
//     // See https://docs.convex.dev/database/reading-data.
//     if (args.includeRandom) {
//       return await ctx.db.query("ideas").collect(); // Returns all documents in the 'ideas' table
//     } else {
//       return await ctx.db
//       .query("ideas")
//       .filter((q) => q.neq(q.field("random"), true)) // Only returns documents whose 'random' field is not equal to `true`
//       .collect();
//     }
//     return await ctx.db.query("ideas").collect();
//   },
// });

// // You can read data from the database via a query function:
export const listStories = query({
  // Query function implementation.
  handler: async (ctx, args) => {
    // Read the database as many times as you need here.
    // See https://docs.convex.dev/database/reading-data.
    return await ctx.db.query("valueToStory").collect(); // Returns all documents in the 'ideas' table
  },
});

// You can write data to the database via a mutation function:
// export const saveIdea = mutation({
//   // Validators for arguments.
//   args: {
//     idea: v.string(),
//     random: v.boolean(),
//   },

//   // Mutation function implementation.
//   handler: async (ctx, args) => {
//     // Insert or modify documents in the database here.
//     // Mutations can also read from the database like queries.
//     // See https://docs.convex.dev/database/writing-data.

//     // Optionally, capture the ID of the newly created document
//     const id = await ctx.db.insert("ideas", args);

//     // Optionally, return a value from your mutation.
//     return id;
//   },
// });

// You can fetch data from and send data to third-party APIs via an action:
// export const fetchRandomIdea = action({
//   // Validators for arguments.
//   args: {},

//   // Action implementation.
//   handler: async (ctx) => {
//     // Use the browser-like `fetch` API to send HTTP requests.
//     // See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
//     const response = await fetch("https://appideagenerator.com/call.php");
//     const idea = await response.text();

//     // Write or query data by running Convex mutations/queries from within an action
//     await ctx.runMutation(api.myFunctions.saveIdea, {
//       idea: idea.trim(),
//       random: true,
//     });

//     // Optionally, return a value from your action
//     return idea;
//   },
// });

// You can write data to the database via a mutation function:
export const saveStory = mutation({
  // Validators for arguments.
  args: {
    value: v.string(),
    story: v.string(),
  },

  // Mutation function implementation.
  handler: async (ctx, args) => {
    // Insert or modify documents in the database here.
    // Mutations can also read from the database like queries.
    // See https://docs.convex.dev/database/writing-data.

    // Optionally, capture the ID of the newly created document
    const id = await ctx.db.insert("valueToStory", args);

    // Optionally, return a value from your mutation.
    return id;
  },
});

// You can fetch data from and send data to third-party APIs via an action:
export const fetchStory = action({
  // Validators for arguments.
  args: {
    value: v.string(),
  },

  handler: async (ctx, args) => {
    const { default: MonsterApiClient } = require("monsterapi");
    const client = new MonsterApiClient(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjljYWU4NzQwNWQyMGYwYmNhNjdmNzdhNDE2ZmMxYzFmIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDItMTdUMDg6MzY6MjAuMTQ4NjUxIn0.n6XDxffEvvPJdNWIeohqQckDxSKW3K-bSAtoUZedCQQ"
    );

    const model = "llama2-7b-chat"; // Replace with the desired model name
    const input = {
      prompt:
        "Create a story about [X] showing " +
        args.value +
        "to [Y] in a [Z] environment, where X, Y, and Z are replaced with examples suitable for a child between ages 4 to 8. Based on this sentence, write a story with 6 sentences, each of which can correspond to an illustration in a children's picture book.",
      top_k: 40,
      top_p: 0.9,
      temp: 0.98,
      max_length: 256,
      beam_size: 1,
      system_prompt:
        "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe...",
      repetition_penalty: 1.2,
    };

    // Initialize the client with your API key
    // Replace 'your-api-key' with your actual Monster API key

    // Use the generate function to retrieve the generated content

    const response = await client.generate(model, input);

    const story = response.text;
    console.log("Generated content:", response);
    await ctx.runMutation(api.myFunctions.saveStory, {
      value: args.value,
      story: story,
    });
  },

  // Action implementation.
  // handler: async (ctx, args) => {
  //   //// Use the browser-like `fetch` API to send HTTP requests.
  //   //// See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
  //   // const response = await ctx.fetch("https://api.thirdpartyservice.com");
  //   // const data = await response.json();
  //   const payload = {
  //     "beam_size": 1,
  //     "max_length": 256,
  //     "repetition_penalty": 1.2,
  //     "temp": 0.98,
  //     "top_k": 40,
  //     "top_p": 0.9,
  //     "prompt": "Create a story about [X] showing " + args.value + "to [Y] in a [Z] environment, where X, Y, and Z are replaced with examples suitable for a child between ages 4 to 8. Based on this sentence, write a story with 6 sentences, each of which can correspond to an illustration in a children's picture book."
  //   };
  //   const headers = {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //       "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjljYWU4NzQwNWQyMGYwYmNhNjdmNzdhNDE2ZmMxYzFmIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDItMTdUMDg6MzY6MjAuMTQ4NjUxIn0.n6XDxffEvvPJdNWIeohqQckDxSKW3K-bSAtoUZedCQQ"
  //   };

  //   const url = "https://api.monsterapi.ai/v1/generate/llama2-7b-chat";
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: headers,
  //     body: JSON.stringify(payload),
  //   });
  //   const story = await response.text();
  //   const process_id = json.loads(response.text)['process_id'];

  //   const headers2 = {
  //     "accept": "application/json",
  //     "content-type": "application/json",
  //     "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjljYWU4NzQwNWQyMGYwYmNhNjdmNzdhNDE2ZmMxYzFmIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDItMTdUMDg6MzY6MjAuMTQ4NjUxIn0.n6XDxffEvvPJdNWIeohqQckDxSKW3K-bSAtoUZedCQQ"
  //   };
  //   // FINISH SEQUENTIAL
  //   const url2 = "https://api.monsterapi.ai/v1/status/" + process_id
  //   const response = requests.get(url, headers=headers)
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: headers,
  //     body: JSON.stringify(payload),
  //   });

  //   print(response.text)

  // await ctx.runMutation(api.myFunctions.saveStory, {
  //   value: args.value,
  //   story: story,
  // });
  // return story
  // }
});
