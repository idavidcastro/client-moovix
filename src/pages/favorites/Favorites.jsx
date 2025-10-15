import React, { useState } from "react";
import { useFavoriteMoviesStore } from "../../stores/favoriteMovies";
import MoviesGrid from "../../components/molecules/MoviesGrid.jsx";
import EmptyState from "../../components/molecules/EmptyState";
import TrailerModal from "../../components/organisms/Hero/TrailerModal";

function Favorites() {
  const favorites = useFavoriteMoviesStore((state) => state.favoriteMovies);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleOpenTrailer(movie) {
    setSelectedMovie(movie);
    setOpen(true);
  }

  function handleCloseTrailer() {
    setOpen(false);
    setSelectedMovie(null);
  }

  if (!favorites.length) {
    return (
      <EmptyState
        title="No hay películas en favoritos"
        description="Agrega películas a favoritos para verlas aquí"
      />
    );
  }

  return (
    <section className="min-h-screen">
      <div className="pt-24 pb-8 px-[5%]">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 cursor-default">
          Mi lista
        </h1>
      </div>

      <div className="px-[5%]">
        <MoviesGrid movies={favorites} onOpenTrailer={handleOpenTrailer} />
      </div>

      {open && selectedMovie && (
        <TrailerModal
          movie={selectedMovie}
          open={open}
          onClose={handleCloseTrailer}
        />
      )}
    </section>
  );
}

export default Favorites;
