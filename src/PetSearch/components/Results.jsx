import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <div>No Pets Found</div>
      ) : (
        pets.map((pet) => <Pet key={pet.id} {...pet} />)
      )}
    </div>
  );
};

export default Results;
