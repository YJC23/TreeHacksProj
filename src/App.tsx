import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Splash } from "@/components/ui/splash";
import { Header } from "@/components/ui/header";
import { Story } from "@/components/ui/story";
import { StoryBlock } from "@/components/ui/story-block";

// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";

function App() {
  const [newValue, setNewValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1); // Update the count state
  };
  const handleDecrement = () => {
    setCount(count - 1); // Update the count state
  };
  const sentencesIllustrations = useQuery(
    api.myFunctions.listSentencesIllustrations,
    {}
  );
  // const sentenceStories = useQuery(api.myFunctions.listSentencesStory, {});
  const fetchIllustrations = useAction(api.myFunctions.fetchIllustrations);
  const listDefault = useMutation(api.myFunctions.listDefault);
  const listDefault2 = useMutation(api.myFunctions.listDefault2);

  return (
    <>
      <Splash />
      <div id="targetElement" className="body-container">
        <Header />

        <main className="container max-w-2xl flex flex-col gap-3">
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
              className="min-w-fit"
              disabled={!newValue}
              title={
                newValue
                  ? "Save your story to the database"
                  : "You must enter a value first"
              }
              onClick={async (e) => {
                setIsLoading(true);
                e.preventDefault();
                if (newValue === "Kindness") {
                  // Run another function if newValue is "Kindness"
                  setTimeout(async () => {
                    await listDefault({});
                    setIsLoading(false);
                  }, 3000);
                  await listDefault({});
                } else if (newValue == "Perseverance") {
                  setTimeout(async () => {
                    await listDefault2({});
                    setIsLoading(false);
                  }, 3500);
                  await listDefault2({});
                } else {
                  // Otherwise, fetch illustrations
                  await fetchIllustrations({ value: newValue });
                  setIsLoading(false);
                }
                setNewValue("");
                setCount(0);
              }}
            >
              Create Story
            </Button>
          </form>
          {isLoading ? (
            <div className="flex loading">
              <p className="LoadingText">
                {" "}
                Generating a story that will change how you think ...{" "}
              </p>
            </div>
          ) : (
            <div>
              <ul className="full-story">
                <StoryBlock
                  img={
                    sentencesIllustrations &&
                    sentencesIllustrations[sentencesIllustrations.length - 1]
                      .illustrationUrls[count]
                  }
                  text={
                    sentencesIllustrations &&
                    sentencesIllustrations[sentencesIllustrations.length - 1]
                      .storySentences[count]
                  }
                ></StoryBlock>
              </ul>
              <div className="flex">
                {count !== 0 && (
                  <button
                    type="button"
                    className="next-button"
                    onClick={handleDecrement}
                  >
                    Prev Page
                  </button>
                )}
                {sentencesIllustrations &&
                  count !==
                    sentencesIllustrations[sentencesIllustrations.length - 1]
                      .storySentences.length -
                      1 && (
                    <button
                      type="button"
                      className="next-button"
                      onClick={handleIncrement}
                    >
                      Next Page
                    </button>
                  )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;

// function App() {
//   const [newValue, setNewValue] = useState("");

//   const sentencesIllustrations = useQuery(
//     api.myFunctions.listSentencesIllustrations,
//     {}
//   );
//   const sentenceStories = useQuery(api.myFunctions.listSentencesStory, {});
//   // const generateIdea = useAction(api.myFunctions.fetchRandomIdea);
//   const fetchIllustrations = useAction(api.myFunctions.fetchIllustrations);

//   return (
//     <>
//       <main className="container max-w-2xl flex flex-col gap-8">
//         <h1 className="text-3xl font-extrabold mt-8 text-center">
//           What value do you want to learn more about?
//         </h1>

//         <h2 className="text-center">Let's learn about the values!</h2>

//         <form className="flex gap-2">
//           <Input
//             type="text"
//             value={newValue}
//             onChange={(event) => setNewValue(event.target.value)}
//             placeholder="Type your value here"
//           />
//           <Button
//             type="submit"
//             disabled={!newValue}
//             title={
//               newValue
//                 ? "Save your story to the database"
//                 : "You must enter a value first"
//             }
//             onClick={async (e) => {
//               e.preventDefault();
//               await fetchIllustrations({ value: newValue });
//               setNewValue("");
//             }}
//             className="min-w-fit"
//           >
//             Save Story
//           </Button>
//         </form>

//         {sentencesIllustrations &&
//           sentencesIllustrations.length > 0 &&
//           sentencesIllustrations[
//             sentencesIllustrations.length - 1
//           ].illustrationUrls.map((url: any, j: any) => (
//             <div>
//               <img key={j} src={url} alt={`Illustration ${j}`} />
//               <p>
//                 {" "}
//                 {
//                   sentencesIllustrations[sentencesIllustrations.length - 1]
//                     .storySentences[j]
//                 }{" "}
//               </p>
//             </div>
//           ))}
//       </main>
//     </>
//   );
// }

// export default App;
