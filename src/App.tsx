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

  return (
    <>
      <Splash />
      <div className="body-container">
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
              Create Story
            </Button>
          </form>
          {/* <StoryBlock> </StoryBlock> */}

          {/* <ul className="full-story">
            {stories && stories.length > 0 && (
              <li>{stories[stories.length - 1].story}</li>
            )}
          </ul> */}
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
              count !== sentencesIllustrations.length && (
                <button
                  type="button"
                  className="next-button"
                  onClick={handleIncrement}
                >
                  Next Page
                </button>
              )}
          </div>
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
