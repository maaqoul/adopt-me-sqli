import { useContext, useState } from "react";

import useBreedList from "../../hooks/useBreedList";
import Results from "../components/Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "../../service/fetchSearch";
import AdoptedPetContext from "../../contexts/adoptedPetContext";

const ANIMALS = ["dog", "cat", "bird"];
const SearchParams = () => {
  const [animal, updateAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const [requestParams, setRequestParams] = useState({
    animal: "",
    location: "",
    breed: "",
  });

  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery(["search", requestParams], fetchSearch);

  const pets = results?.data || [];

  function fetchPets(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = {
      animal: formData.get("animal") ?? "",
      breed: formData.get("breed") ?? "",
      location: formData.get("location") ?? "",
    };
    setRequestParams(obj);
  }
  return (
    <div className="search-params">
      <form onSubmit={fetchPets}>
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>

        {ANIMALS.length ? (
          <label htmlFor="animal">
            Animal
            <select
              id="animal"
              name="animal"
              value={animal}
              onChange={(e) => updateAnimal(e.target.value)}
            >
              <option />
              {ANIMALS.map((animal) => (
                <option value={animal} key={animal}>
                  {animal}
                </option>
              ))}
            </select>
          </label>
        ) : (
          "no animal found"
        )}
        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={!breeds.length} name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed.id} value={breed.breed}>
                {breed.breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
