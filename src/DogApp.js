import React, { useState, useEffect } from 'react';
import './DogApp.css';
import { getRandomDogPictures } from './API_caller';
import { SucessDog } from './SucessDog';
import { LikeCounter } from './LikeCounter';

function DogApp() {
  const [picturesOfDog, setPicturesOfDog] = useState(null);
  const [dogsLiked, setDogsLiked] = useState([]);
  const [triplet, setTriplet] = useState([]);

  useEffect(() => {
    document.title = 'Dog Chooser 3000';
    console.log(
      '%cAre you a developer looking for a job?',
      'font-size: 30px; color: red; font-weight: bold',
    );
    console.log(
      '%cThis is not it. But you can find some cool styled consoles!',
      'font-size: 20px; color: pink; font-weight: bold; background-color: black;',
    );
    console.log(
      '%cWow!',
      'font-size: 16px; color: lightBlue; font-weight: bold; background-color: grey;',
    );
  }, []);

  useEffect(() => {
    function findTriplets(dogsLiked) {
      const object = {};
      const result = [];

      dogsLiked.forEach(item => {
        if (!object[item]) object[item] = 0;
        object[item] += 1;
      });

      for (const prop in object) {
        if (object[prop] === 3) {
          result.push(prop);
        }
      }
      return result;
    }

    const tripletArray = findTriplets(dogsLiked);
    if (tripletArray.length !== 0) {
      const tripletArrayWithoutSubBreed = tripletArray[0].split('-')[0]; //need to sort out sub-breeds for requests to work properly
      setTriplet(tripletArrayWithoutSubBreed);
    }
  }, [dogsLiked]);

  const generateNewDogPictures = numberOfPictures => {
    getRandomDogPictures(numberOfPictures).then(response => {
      setPicturesOfDog(Object.values(response.message));
    });
  };

  const upvoteDog = img => {
    const dogsAlreadyLiked = [...dogsLiked];
    const afterBreedsString = img.split('breeds/')[1];
    const dogBreedString = afterBreedsString.split('/')[0];
    dogsAlreadyLiked.push(dogBreedString);
    setDogsLiked(dogsAlreadyLiked);
  };

  const resetDogsLiked = () => {
    generateNewDogPictures(12);
    setDogsLiked([]);
    setTriplet([]);
  };

  return (
    <div className="Container">
      {triplet.length !== 0 ? (
        <SucessDog
          favouriteDog={triplet}
          resetDogsLiked={resetDogsLiked}
        ></SucessDog>
      ) : (
        <>
          <LikeCounter dogsLiked={dogsLiked} />
          <h1>Welcome to the dog chooser 3000</h1>
          <h2>Press the button to generate new dogs!</h2>
          <button onClick={() => generateNewDogPictures(12)}>
            Give me new dogs!
          </button>
          {picturesOfDog && (
            <>
              <h4>Click on the pictures to like the dogs</h4>
              <div className="PicturesContainer">
                {picturesOfDog.map((picture, i) => {
                  return (
                    <div className="PictureWrapper" key={i}>
                      <img
                        className="Picture Clickable"
                        alt="a dog"
                        src={picture}
                        onClick={() => upvoteDog(picture)}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default DogApp;
