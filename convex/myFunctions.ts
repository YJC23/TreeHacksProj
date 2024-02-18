import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// // You can read data from the database via a query function:
export const listDefault = mutation({
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("valueToIllustrations", {
      illustrationUrls: [
        "https://cdn.discordapp.com/attachments/1208329573167538226/1208635076741431296/DALLE_2024-02-17_15.41.59_-_In_a_vividly_colored_lush_garden_brimming_with_a_variety_of_vibrant_flowers_and_dense_foliage_a_friendly_green_turtle_stands_beside_a_small_grey_mou.webp?ex=65e40021&is=65d18b21&hm=fabb5bff13b7fdaa52498605f0184f03ef122f7e1cebde6f58af6afc682b25e6&",
        "https://cdn.discordapp.com/attachments/1208329573167538226/1208635077261660180/DALLE_2024-02-17_15.42.05_-_In_a_lush_vibrant_garden_filled_with_a_myriad_of_flowers_a_small_grey_mouse_climbs_onto_the_back_of_a_friendly_green_turtle._Both_characters_are_smi.webp?ex=65e40021&is=65d18b21&hm=3723aa1ae6730405e9a3184ea095a93b11744a5284999af567750e79341441ef&",
        "https://cdn.discordapp.com/attachments/1208329573167538226/1208635077916102666/DALLE_2024-02-17_15.42.43_-_In_a_sunlit_garden_filled_with_a_profusion_of_flowers_a_small_grey_mouse_sits_on_the_back_of_a_friendly_green_turtle_both_of_them_laughing_heartily.webp?ex=65e40021&is=65d18b21&hm=4f468a3b9e4f3dc4c09faa4f44a34e0d723ed72b444a3fdf779f6f4ed90a423b&",
        "https://cdn.discordapp.com/attachments/1208329573167538226/1208635078423617566/DALLE_2024-02-17_20.42.36_-_The_mouse_whispers_into_the_turtles_ear_pointing_to_a_hidden_spot_behind_a_bush_with_a_treasure_trove_of_berries_their_faces_filled_with_excitement.webp?ex=65e40022&is=65d18b22&hm=33cf494dbbf33959ef98a98b14faef4953906521e2d2590dae11f890db1eabbd&",
        "https://cdn.discordapp.com/attachments/1208329573167538226/1208635078981451806/DALLE_2024-02-17_20.43.18_-_The_turtle_and_mouse_with_wide_eyes_and_open_mouths_discover_a_secret_berry_patch_bathed_in_sunlight_with_butterflies_fluttering_around._This_image.webp?ex=65e40022&is=65d18b22&hm=b9a7bd8753255e0ecfee895b5f1c48e3b291456aa551b02d5c48aef1515884bb&",
        "https://cdn.discordapp.com/attachments/1208329573167538226/1208635079610343434/DALLE_2024-02-17_20.43.26_-_The_turtle_and_mouse_sit_together_eating_berries_surrounded_by_their_animal_friends_in_the_garden_with_the_sun_setting_in_the_background_casting_a_.webp?ex=65e40022&is=65d18b22&hm=d2df82b4fc49e1d0f197f5b3bafbcb7e1b3704eebb0467c9840150935f25fc97&",
      ],
      storySentences: [
        "Tommy the turtle found Max the mouse looking sad because he couldn't reach the ripe strawberries in the garden.",
        "Tommy offered to carry Max on his back so they could pick the strawberries together.",
        "With Tommy's help, Max reached the strawberries, and they shared the juicy fruit happily.",
        "Grateful for Tommy's kindness, Max decided to share a secret: he knew where the juiciest berries were hidden.",
        "Together, they ventured deeper into the garden, where Max showed Tommy a secluded spot full of the biggest, juiciest berries they had ever seen.",
        "From that day on, Tommy and Max became the best of friends, always sharing and exploring the garden's wonders together.",
      ],
      value: "Kindness",
    });
  },
});

export const listDefault2 = mutation({
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("valueToIllustrations", {
      illustrationUrls: [
        "https://processed-model-result.s3.us-east-2.amazonaws.com/9fa9cf62-5ceb-4c5e-b70d-9cf753813b16_0.png",
        "https://processed-model-result.s3.us-east-2.amazonaws.com/3f6d0d70-cf00-4ea8-95cd-e71a35c363d4_0.png",
        "https://processed-model-result.s3.us-east-2.amazonaws.com/c7398201-94c4-4f1c-bbe1-81bad12ce8dd_0.png",
        "https://processed-model-result.s3.us-east-2.amazonaws.com/bff68c66-d7b9-4753-8d14-54b1a0f51564_0.png",
      ],
      storySentences: [
        "Sammy the Squirrel, with determination in his eyes, climbs up a tall tree to reach acorns at the top. The background is filled with lush green leaves and bright blue sky.",
        "As Sammy the Squirrel continues his efforts with gritted teeth, the heavy wind blows, almost knocking him off the tree. The acorns are still far up the tree.",
        "Sammy the Squirrel grabs onto a branch to hang on as the wind blows him away, managing to hold onto the tree. The acorns are still far up the tree.",
        "In triumphant joy, Sammy the Squirrel holds onto the prized acorn between his teeth, surrounded by dappled sunlight filtering through the leaves above.",
      ],
      value: "Perseverance",
    });
  },
});

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
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjljYWU4NzQwNWQyMGYwYmNhNjdmNzdhNDE2ZmMxYzFmIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDItMTdUMDg6MzY6MjAuMTQ4NjUxIn0.n6XDxffEvvPJdNWIeohqQckDxSKW3K-bSAtoUZedCQQ"
    );
    const example =
      "Characters: Toby the Turtle and Benny the Bird.\n Story Sentence 1: Toby the Turtle found Benny the Bird lying on the ground, unable to fly because of his injured wing.\n Illustration Description 1: Toby the Turtle, with a gentle and caring expression, stands beside Benny the Bird, who looks sad with a bandaged wing, both characters are in the middle of a colorful, whimsical forest filled with oversized flowers and twisty trees.\n Story Sentence 2: With a warm smile, Toby offered to carry Benny on his back to see the wise old owl for help.\n Illustration Description 2: Benny the Bird, looking hopeful, is perched on Toby the Turtle's back as Toby walks determinedly along a winding path through the forest.\n Story Sentence 3: When they reached the wise old owl's tree, he gently fixed Benny's wing with a special leaf wrap.\n Illustration Description 3: The wise old owl, wearing glasses and looking knowledgeable, carefully wraps Benny the Bird's wing with a glowing, magical leaf, within an intricately hollowed-out tree filled with books.\n Story Sentence 4: Benny, feeling much better, thanked Toby and the forest friends for their kindness and help.\n Illustration Description 4: Benny the Bird, with his wing neatly wrapped, joyfully flaps his other wing in gratitude towards Toby the Turtle and the wise old owl, in a sunny glade surrounded by whimsically shaped trees and flowers.";
    const model = "llama2-7b-chat"; // Replace with the desired model name
    const input = {
      prompt:
        "Create a story about [X] showing " +
        args.value +
        "to [Y] in a [Z] environment, where X, Y, and Z are replaced with examples suitable for a child between ages 4 to 8. Make sure the story contains no violence. First, state which two characters are in the story. Next, write a story with exactly 4 sentences, each of which can correspond to an illustration in a children's picture book. After each sentence, include the description of the illustration. Each illustration description should use the full character names and descriptions. The description should not have textual explanations within the imagery itself. Here is an example output: " +
        example,
      top_k: 40,
      top_p: 0.9,
      temp: 0.98,
      max_length: 500,
      beam_size: 1,
      system_prompt:
        "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible.",
      repetition_penalty: 1.2,
    };

    const response = await client.generate(model, input);

    const story = response.text;
    console.log("Generated content:", response);

    const linesArray = story.split(/\n\n|\n/);
    const storySentences = [];
    const illustrationDescriptions = [];

    const characters = linesArray[1].split(":")[1];

    for (let i = 2; i < linesArray.length; i++) {
      const line = linesArray[i];
      const [label, sentence] = line.split(":");

      if (i % 2 === 0) {
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
    return [characters, storySentences, illustrationDescriptions];
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
    const [characters, storySentences, illustrationDescriptions] =
      await fetchStory.call(undefined, ctx, { value: args.value });

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
