export const getAllBreeds = async () => {
  const response = fetch('https://dog.ceo/api/breeds/list/all').then(
    response => {
      return response.json();
    },
  );
  return response;
};

export const getBreed = async (breed: string) => {
  const response = fetch(`https://dog.ceo/api/breed/${breed}/images`).then(
    response => {
      return response.json();
    },
  );
  return response;
};
