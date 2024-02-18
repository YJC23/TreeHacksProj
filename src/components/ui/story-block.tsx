import React, { useState, useEffect } from 'react';
import bg from '../../assets/sample.png'

function StoryBlock() {
//   const [imageUrl, setImageUrl] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Define the async function to fetch the image
//     async function fetchDalleImage() {
//       setIsLoading(true);
//       try {
//         const response = await fetch('YOUR_DALL-E_API_ENDPOINT', {
//           method: 'GET', // or 'POST', depending on the API requirements
//           headers: {
//             // Your required headers, like API keys or content type
//           },
//           // body: JSON.stringify({ /* Your payload if needed for a POST request */ }),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setImageUrl(data.imageUrl); // Update the state with the received image URL
//       } catch (error) {
//         setError('Failed to load image');
//         console.error("Error fetching image:", error);
//       }
//       setIsLoading(false);
//     }

//     // Call the async function
//     fetchDalleImage();
//   }, []); // Empty dependency array means this effect will only run once, after the initial render

  // Render the component
  return (
    <>
      <div className="image-container">
        {/* {isLoading && <p>Loading image...</p>}
        {error && <p>{error}</p>}
        {imageUrl && <img src={imageUrl} alt="Generated from DALL-E" />} */}
        <img className="story-img" src={bg}/>
        <p className="caption">This is my story.</p>
        <button type="button" className="next-button">
        Next Page
      </button>
      </div>
      {/* <div>

      </div> */}

    </>
  );
}

export { StoryBlock };