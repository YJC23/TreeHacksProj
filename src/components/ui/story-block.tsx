const StoryBlock = (props: any) => {
  // Render the component
  return (
    <>
      <div className="image-container">
        {/* {isLoading && <p>Loading image...</p>}
        {error && <p>{error}</p>}
        {imageUrl && <img src={imageUrl} alt="Generated from DALL-E" />} */}
        <img className="story-img" src={props.img} />
        <p className="caption"> {props.text} </p>
      </div>
    </>
  );
};

export { StoryBlock };
