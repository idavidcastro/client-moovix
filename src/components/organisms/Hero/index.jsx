import { useQuery } from "@apollo/client/react";
import { GET_NOW_PLAYING_MOVIES, GET_MOVIE_GENRES } from "../../../lib/queries";
import HeroCarousel from "./HeroCarousel";
import TrailerModal from "./TrailerModal";
import { useMemo, useState } from "react";
import HeroSkeleton from "../../skeletons/HeroSkeleton";
import { useModal } from "../../../hooks/useModal";

export default function Hero() {
  const { loading: loadingMovies, data } = useQuery(GET_NOW_PLAYING_MOVIES);
  const { data: genreData, loading: loadingGenres } =
    useQuery(GET_MOVIE_GENRES);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const { isOpen, openModal, closeModal } = useModal();

  const genreMap = useMemo(
    () => new Map((genreData?.movieGenres ?? []).map((g) => [g.id, g.name])),
    [genreData]
  );

  function handleOpenTrailer(movie) {
    setSelectedMovie(movie);
    openModal();
  }

  function handleCloseTrailer() {
    closeModal();
    setSelectedMovie(null);
  }

  if (loadingMovies || loadingGenres) return <HeroSkeleton />;
  if (!data?.nowPlayingMovies?.length) return null;

  return (
    <div>
      <HeroCarousel
        movies={data.nowPlayingMovies}
        genreMap={genreMap}
        onOpenTrailer={handleOpenTrailer}
      />
      <TrailerModal
        open={isOpen}
        onClose={handleCloseTrailer}
        movie={selectedMovie}
      />
    </div>
  );
}
