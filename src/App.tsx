import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";

function App() {
  const [newValue, setNewValue] = useState("");

  const sentencesIllustrations = useQuery(
    api.myFunctions.listSentencesIllustrations,
    {}
  );
  const sentenceStories = useQuery(api.myFunctions.listSentencesStory, {});
  // const generateIdea = useAction(api.myFunctions.fetchRandomIdea);
  const fetchIllustrations = useAction(api.myFunctions.fetchIllustrations);

  return (
    <>
      <main className="container max-w-2xl flex flex-col gap-8">
        <h1 className="text-3xl font-extrabold mt-8 text-center">
          What value do you want to learn more about?
        </h1>

        <h2 className="text-center">Let's learn about the values!</h2>

        <form className="flex gap-2">
          <Input
            type="text"
            value={newValue}
            onChange={(event) => setNewValue(event.target.value)}
            placeholder="Type your value here"
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
              await fetchIllustrations({ value: newValue });
              setNewValue("");
            }}
            className="min-w-fit"
          >
            Save Story
          </Button>
        </form>

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

        {sentencesIllustrations &&
          sentencesIllustrations.length > 0 &&
          sentencesIllustrations[
            sentencesIllustrations.length - 1
          ].illustrationUrls.map((url: any, j: any) => (
            <div>
              <img key={j} src={url} alt={`Illustration ${j}`} />
              <p>
                {" "}
                {
                  sentencesIllustrations[sentencesIllustrations.length - 1]
                    .storySentences[j]
                }{" "}
              </p>
            </div>
          ))}

        {/* <ul> */}
        {/* {stories?.map((valueToIllustrations, i) => ( */}
        {/* <li key={i}> */}
        {/* Assuming valueToIllustrations.illustrationUrls is an array of image URLs */}
        {/* </li> */}
        {/* ))} */}
        {/* </ul> */}
      </main>
    </>
  );
}

export default App;
