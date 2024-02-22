import { PET_API_URL } from "./constants";

const fetchSearch = async ({ queryKey }) => {
  const { animal, location, breed } = queryKey[1];
  const queryParams = new URLSearchParams({
    animal,
    location,
    breed,
  }).toString();

  const apiRes = await fetch(`${PET_API_URL}?${queryParams}`);

  if (!apiRes.ok) {
    throw new Error(`fetch search is not okay`);
  }

  return apiRes.json();
};

export default fetchSearch;
