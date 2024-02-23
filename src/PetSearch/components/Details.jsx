import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import fetchPet from "../../service/fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "../../ErrorBoundary";
import { useContext, useState } from "react";
import Modal from "../../ui/Modal";
import AdoptedPetContext from "../../contexts/adoptedPetContext";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const results = useQuery(["details", id], fetchPet);

  // navigator
  const navigate = useNavigate();
  // context
  const [, setAdoptedPet] = useContext(AdoptedPetContext);

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
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p> really sweet Pet</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>would like to adopt {pet.name}</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
