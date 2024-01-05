import React, { useState } from 'react';

const ImageDisplay = (props) => {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <>
      {imageError ? (
        <img
          src={
            props.image
              ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSZpPDnjQBynSxEHYXo-orWYtvNybtifvhMUdsVjEhuOFpkDYPshISj_TpITVzJullxW4&usqp=CAU'
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png'
          }
          alt="Placeholder"
          className={props?.className || ''}
          style={props?.style || {}}
        />
      ) : (
        <img
          src={props?.src}
          alt={props?.alt}
          className={props?.className || ''}
          style={props?.style || {}}
          onError={handleImageError}
        />
      )}
    </>
  );
};

export default ImageDisplay;
