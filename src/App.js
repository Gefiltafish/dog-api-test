import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAllBreeds, getBreed } from './API_caller';

function App() {
  const [allDogbreeds, setAllDogBreeds] = useState(null);
  const [selectedDogBreed, setSelectedDogBreed] = useState(null);
  const [picturesOfDog, setPicturesOfDog] = useState(null);

  const dogSelecter = useRef(null);

  useEffect(() => {
    getAllBreeds().then(response => {
      setAllDogBreeds(Object.keys(response.message));
    });
  });

  useEffect(() => {
    getBreed(selectedDogBreed).then(result => {
      setPicturesOfDog(Object.values(result.message.slice(0, 20)));
    });
  }, [selectedDogBreed]);

  return (
    <header className="Header">
      <h1>Welcome to the dog chooser 3000</h1>
      <h2>Select a dog breed you would like to check out!</h2>
      <button className="Button Like"></button>
      <select
        ref={dogSelecter}
        onChange={() => setSelectedDogBreed(dogSelecter.current.value)}
      >
        {allDogbreeds &&
          allDogbreeds.map((dog, i) => {
            return (
              <option value={dog} key={i}>
                {dog.toUpperCase()}
              </option>
            );
          })}
      </select>
      {selectedDogBreed && (
        <>
          <h4>
            Here are some beautiful pictures of{' '}
            {selectedDogBreed.charAt(0).toUpperCase() +
              selectedDogBreed.slice(1)}{' '}
            dogs
          </h4>
          <div className="PicturesContainer">
            {picturesOfDog.map((picture, i) => {
              return (
                <div className="PictureWrapper" key={i}>
                  <img className="Picture" alt="a dog" src={picture} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </header>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a className="App-link" href="https://dog.ceo/dog-api/">
    //       Visit used API for reference
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
