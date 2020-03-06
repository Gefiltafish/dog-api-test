export const getBreedPictures = (breed: string): Promise<Response> => {
  const response = fetch(
    `https://dog.ceo/api/breed/${breed}/images/random/4`,
  ).then(response => {
    return response.json();
  });
  return response;
};

export const getRandomDogPictures = (
  numberOfPictures: number,
): Promise<Response> => {
  const response = fetch(
    `https://dog.ceo/api/breeds/image/random/${numberOfPictures}`,
  ).then(response => {
    return response.json();
  });
  return response;
};
