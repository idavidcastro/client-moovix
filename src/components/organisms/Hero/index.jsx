import { useQuery } from "@apollo/client/react";
import { GET_NOW_PLAYING_MOVIES, GET_MOVIE_GENRES } from "../../../lib/queries";
import HeroCarousel from "./HeroCarousel";
import TrailerModal from "./TrailerModal";
import { useMemo, useState } from "react";
import HeroSkeleton from "../../skeletons/HeroSkeleton";

export default function Hero() {
  const { loading: loadingMovies, data } = useQuery(GET_NOW_PLAYING_MOVIES);
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

  if (loadingMovies || loadingGenres) return <HeroSkeleton />;
  if (!data?.nowPlayingMovies?.length) return null;

  return (
    <>
      <HeroCarousel
        movies={data.nowPlayingMovies}
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
