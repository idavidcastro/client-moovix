import React from "react";
import MovieCardWithHover from "../../components/molecules/MovieCardWithHover";

export default function AllMoviesGrid({ movies, onOpenTrailer }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {movies.map((movie) => (
        <MovieCardWithHover
          key={movie.id}
          movie={movie}
          onOpenTrailer={onOpenTrailer}
        />
      ))}
    </div>
  );
}
