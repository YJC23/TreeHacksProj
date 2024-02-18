import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// // You can read data from the database via a query function:
export const listSentencesStory = query({
  // Query function implementation.
  handler: async (ctx, args) => {
    // Read the database as many times as you need here.
    // See https://docs.convex.dev/database/reading-data.
    return await ctx.db.query("valueToStory").collect(); // Returns all documents in the 'ideas' table
  },
});

export const listSentencesIllustrations = query({
  // Query function implementation.
  handler: async (ctx, args) => {
    // Read the database as many times as you need here.
    // See https://docs.convex.dev/database/reading-data.
    return await ctx.db.query("valueToIllustrations").collect(); // Returns all documents in the 'ideas' table
  },
});

export const saveStory = mutation({
  args: {
    value: v.string(),
    storySentences: v.array(v.string()),
    illustrationDescriptions: v.array(v.string()),
  },

  handler: async (ctx, args) => {
    const id = await ctx.db.insert("valueToStory", args);
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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjRmNTZlZTliOGM1MmRiNDg2YzM2ZGYzMDgwNTkxZGY1IiwiY3JlYXRlZF9hdCI6IjIwMjQtMDItMThUMDE6MTA6NDguMTQ0NDg5In0.j3s8646SkRACThpmtpwOZ-8Nzs_2HiNml3UybXIHhTQ"
    );
    const example =
      "Sentence: In a lush, vibrant forest, Toby the Turtle shows kindness to Benny the Bird who has injured his wing.\n Story Sentence 1: Toby the Turtle found Benny the Bird lying on the ground, unable to fly because of his injured wing.\n Illustration Description 1: Toby the Turtle, with a gentle and caring expression, stands beside Benny the Bird, who looks sad with a bandaged wing, both characters are in the middle of a colorful, whimsical forest filled with oversized flowers and twisty trees, in the style of Dr. Seuss.\n Story Sentence 2: With a warm smile, Toby offered to carry Benny on his back to see the wise old owl for help.\n Illustration Description 2: Benny the Bird, looking hopeful, is perched on Toby the Turtle's back as Toby walks determinedly along a winding path through the forest, passing by imaginative creatures peeking out from behind the trees, all depicted in the style of Dr. Seuss.\n Story Sentence 3: When they reached the wise old owl's tree, he gently fixed Benny's wing with a special leaf wrap.\n Illustration Description 4: The wise old owl, wearing glasses and looking knowledgeable, carefully wraps Benny the Bird's wing with a glowing, magical leaf, as Toby the Turtle watches with admiration, all within an intricately hollowed-out tree filled with books and potions, in the style of Dr. Seuss.\n Story Sentence 4: Benny, feeling much better, thanked Toby and the forest friends for their kindness and help.\n Illustration Description 5: Benny the Bird, with his wing neatly wrapped, joyfully flaps his other wing in gratitude towards Toby the Turtle and the gathered forest animals, including Felix the Fox and the wise old owl, in a sunny glade surrounded by whimsically shaped trees and flowers, in the style of Dr. Seuss.\n Story Sentence 5: With a heart full of joy, Benny promised to always help others, as Toby and the friends cheered and celebrated their new friendship.\n Illustration Description 6: Benny the Bird, perched on a branch with Toby the Turtle, Felix the Fox, and the wise old owl below, all cheering with a vibrant, colorful forest backdrop filled with playful, happy creatures and a rainbow stretching across the sky, in the style of Dr. Seuss.";

    const model = "llama2-7b-chat"; // Replace with the desired model name
    const input = {
      prompt:
        "Create a story about [X] showing " +
        args.value +
        "to [Y] in a [Z] environment, where X, Y, and Z are replaced with examples suitable for a child between ages 4 to 8. Make sure the story contains no violence. Based on this, write a story with exactly 4 sentences, each of which can correspond to an illustration in a children's picture book. After each sentence, include the description of the illustration. Each illustration description should use the full character names and descriptions. The description should not have textual explanations within the imagery itself. Here is an example output: " +
        example,
      top_k: 40,
      top_p: 0.9,
      temp: 0.98,
      max_length: 400,
      beam_size: 1,
      system_prompt:
        "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible.",
      repetition_penalty: 1.2,
    };

    const response = await client.generate(model, input);

    const story = response.text;
    console.log("Generated content:", response);

    const linesArray = story.split("\n");
    const storySentences = [];
    const illustrationDescriptions = [];

    for (let i = 1; i < linesArray.length; i++) {
      const line = linesArray[i];
      const [label, sentence] = line.split(": ");

      if (i % 2 === 1) {
        storySentences.push(sentence);
      } else {
        illustrationDescriptions.push(sentence);
      }
    }

    await ctx.runMutation(api.myFunctions.saveStory, {
      value: args.value,
      storySentences: storySentences,
      illustrationDescriptions: illustrationDescriptions,
    });
    return [storySentences, illustrationDescriptions];
  },
});

export const fetchIllustrations = action({
  // Validators for arguments.
  args: {
    value: v.string(),
    // storySentences:v.array(v.string()),
    // illustrationDescriptions:v.array(v.string()),
  },

  handler: async (ctx, args) => {
    const [storySentences, illustrationDescriptions] = await fetchStory.call(
      undefined,
      ctx,
      { value: args.value }
    );

    const { default: MonsterApiClient } = require("monsterapi");
    const client = new MonsterApiClient(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjljYWU4NzQwNWQyMGYwYmNhNjdmNzdhNDE2ZmMxYzFmIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDItMTdUMDg6MzY6MjAuMTQ4NjUxIn0.n6XDxffEvvPJdNWIeohqQckDxSKW3K-bSAtoUZedCQQ"
    );

    const model = "sdxl-base"; // Replace with the desired model name

    const url_list = [];
    for (const description of illustrationDescriptions) {
      const input = {
        prompt: description + " It should be in the style of Dr. Seuss.",
        samples: 1,
        steps: 50,
        aspect_ratio: "square",
        guidance_scale: 7.5,
        seed: 2414,
      };

      const response = await client.generate(model, input);
      console.log("Generated content:", response);

      const illustration_url = response["output"][0];
      url_list.push(illustration_url);
    }

    console.log("Illustration Urls: ", url_list);
    await ctx.runMutation(api.myFunctions.saveUrls, {
      value: args.value,
      storySentences: storySentences,
      illustrationUrls: url_list,
    });
  },
});

export const saveUrls = mutation({
  args: {
    value: v.string(),
    storySentences: v.array(v.string()),
    illustrationUrls: v.array(v.string()),
  },

  handler: async (ctx, args) => {
    const id = await ctx.db.insert("valueToIllustrations", args);
    return id;
  },
});
