import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Splash } from "@/components/ui/splash"
import { Header } from "@/components/ui/header"
import { Story } from "@/components/ui/story"
import { StoryBlock } from "@/components/ui/story-block"

// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";

function App() {
  const [newValue, setNewValue] = useState("");

  const stories = useQuery(api.myFunctions.listStories, {});
  // const generateIdea = useAction(api.myFunctions.fetchRandomIdea);
  const fetchStory = useAction(api.myFunctions.fetchStory);

  return (
    <>
      <Splash/>
      <div className="body-container">
        <Header/>

        <main className="container max-w-2xl flex flex-col gap-8">
          <form className="flex gap-2">
            <Input
              className="search"
              type="text"
              value={newValue}
              onChange={(event) => setNewValue(event.target.value)}
              placeholder="Choose a value: compassion, kindness, respect for a teacher..."
            />
            <Button
              type="submit"
              disabled={!newValue}
              title={
                newValue
                  ? "Save your story to the database"
                  : "You must enter a value first"
              }
              onClick={async (e) => {
                e.preventDefault();
                await fetchStory({ value: newValue });
                setNewValue("");
              }}
              className="min-w-fit"
            >
              Create Story
            </Button>
          </form>
          <StoryBlock>

          </StoryBlock>

          {/* <div className="flex justify-between items-center">
            <Button
              onClick={async () => {
                await fetchStory();
              }}
              title="Generate a random story"
            >
              Generate a random story
            </Button>

            <div
              className="flex gap-2"
              title="Uh oh, this checkbox doesn't work! Until we fix it ;)"
            >
              
            </div>
          </div> */}

          {/* <ul>
            {stories?.map((valueStory, i) => (
              <li key={i}>{valueStory.story}</li>
            ))}
          </ul> */}
          <ul className="full-story">
            {stories && stories.length > 0 && (
              <li>{stories[stories.length - 1].story}</li>
            )}
          </ul>
        </main>
      </div>
    </>
  );
}

export default App;
