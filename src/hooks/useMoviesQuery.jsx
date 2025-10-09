import { useQuery } from "@apollo/client/react";

export default function useMoviesQuery(query) {
  const { loading, error, data } = useQuery(query);
  // Extrae el array de películas del primer key
  const movies = data ? data[Object.keys(data)[0]] : [];
  return { loading, error, movies };
}
