import { useQuery } from "@apollo/client/react";

export default function useMoviesQuery(query) {
  const { loading, error, data } = useQuery(query);

  const movies = data ? data[Object.keys(data)[0]] : [];

  return { loading, error, movies };
}
