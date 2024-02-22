import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "../service/fetchBreedList";

export default function useBreedList(animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);
  console.log(results);
  return [results?.data ?? [], results.status];
}
