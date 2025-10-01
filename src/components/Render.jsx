import { useQuery } from "@apollo/client/react";
import { GET_POPULAR_MOVIES } from "../lib/queries";

export default function Render() {
  const { loading, error, data } = useQuery(GET_POPULAR_MOVIES);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error 😢: {error.message}</p>;
  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 Películas Populares</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {data.popularMovies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ borderRadius: "8px" }}
            />
            <h3>{movie.title}</h3>
            <p>⭐ {movie.vote_average}</p>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
