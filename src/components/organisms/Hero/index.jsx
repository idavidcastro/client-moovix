import { useQuery } from "@apollo/client/react";
import { GET_POPULAR_MOVIES, GET_MOVIE_GENRES } from "../../../lib/queries";
import HeroCarousel from "./HeroCarousel";
import TrailerModal from "./TrailerModal";
import { useMemo, useState } from "react";

export default function Hero() {
  const { loading: loadingMovies, data } = useQuery(GET_POPULAR_MOVIES);
  const { data: genreData, loading: loadingGenres } =
    useQuery(GET_MOVIE_GENRES);

  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const genreMap = useMemo(
    () => new Map((genreData?.movieGenres ?? []).map((g) => [g.id, g.name])),
    [genreData]
  );

  function handleOpenTrailer(movie) {
    setSelectedMovie(movie);
    setOpen(true);
  }

  function handleCloseTrailer() {
    setOpen(false);
    setSelectedMovie(null);
  }

  if (loadingMovies || loadingGenres)
    return <p className="text-center">Cargando...</p>;
  if (!data?.popularMovies?.length) return null;

  return (
    <>
      <HeroCarousel
        movies={data.popularMovies}
        genreMap={genreMap}
        onOpenTrailer={handleOpenTrailer}
      />
      <TrailerModal
        open={open}
        onClose={handleCloseTrailer}
        movie={selectedMovie}
      />
    </>
  );
}
