import { PET_API_URL } from "./constants";

export async function requestBreedList(animal) {
  const queryParams = new URLSearchParams({
    animal,
  }).toString();

  const url = `${PET_API_URL}?${queryParams}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return { json, status: "loaded" };
  } catch (error) {
    console.error("Error fetchind data :", error);
    return { json: [], status: "unsuccessful" };
  }
}
