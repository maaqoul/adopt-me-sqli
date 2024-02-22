import { PET_API_URL } from "./constants";

const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];
  const apiRes = await fetch(`${PET_API_URL}?animal=${animal}`);

  if (!apiRes.ok) {
    throw new Error(`breeds fetch not ok`);
  }

  return apiRes.json();
};

export default fetchBreedList;
