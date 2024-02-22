import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import fetchPet from "../../service/fetchPet";
import Carousel from "./Carousel";

const Details = () => {
  const { id } = useParams();

  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  const [pet] = results.data;

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.location}`}</h2>
        <button>Adopt {pet.name}</button>
        <p> really sweet Pet</p>
      </div>
    </div>
  );
};

export default Details;
