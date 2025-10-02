import { useQuery } from "@apollo/client/react";
import { GET_POPULAR_MOVIES } from "../../lib/queries";
import NavBar from "../../components/organisms/NavBar";
import MovieList from "../../components/organisms/MovieList";

export default function AllMovies() {
  const { loading, error, data } = useQuery(GET_POPULAR_MOVIES);

  return (
    <section className="min-h-screen px-[5%]">
      <NavBar />
      <div className="pt-24">
        <h1 className="text-3xl font-bold text-primary ">
          Todas las películas
        </h1>
        {loading && <p className="text-primary">Cargando...</p>}
        {error && <p className="text-red-500 ">Error: {error.message}</p>}
        {data && <MovieList movies={data.popularMovies} />}
      </div>
    </section>
  );
}
