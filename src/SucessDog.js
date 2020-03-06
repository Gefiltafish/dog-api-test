import React, { useState, useEffect } from 'react';
import './DogApp.css';
import { getBreedPictures } from './API_caller';

export function SucessDog({ favouriteDog, resetDogsLiked }) {
  const [picturesOfFavouriteDog, setPicturesOfFavouriteDog] = useState([]);

  useEffect(() => {
    getBreedPictures(favouriteDog).then(response => {
      setPicturesOfFavouriteDog(Object.values(response.message));
    });
  }, [favouriteDog]);

  return (
    <div className="Container">
      <h1>Your favourite dog is a {favouriteDog.toUpperCase()}!</h1>
      <div className="PicturesContainer">
        {picturesOfFavouriteDog.map((picture, i) => {
          return (
            <div className="PictureWrapper" key={i}>
              <img className="Picture" alt="a dog" src={picture} />
            </div>
          );
        })}
      </div>
      <h4>Still not sure if this is the dog for you?</h4>
      <button onClick={resetDogsLiked}>Like other dogs</button>
    </div>
  );
}
