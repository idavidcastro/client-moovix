import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_MOVIE_BY_ID } from "../../lib/queries";

export default function MovieDetail() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_MOVIE_BY_ID, {
    variables: { id },
  });

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error al cargar la película.
      </div>
    );

  const movie = data?.movieById;
  if (!movie)
    return <div className="text-center py-8">Película no encontrada.</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 flex flex-col items-center text-center gap-6">
      <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        className="w-64 rounded-md shadow-lg mx-auto"
      />
      <p className="text-white/80 text-lg mt-4">{movie.overview}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4 text-white/60">
        <span>
          <strong>Estreno:</strong> {movie.release_date}
        </span>
        <span>
          <strong>Rating:</strong> {movie.vote_average}
        </span>
      </div>
    </div>
  );
}
