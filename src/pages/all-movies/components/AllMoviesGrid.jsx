import React, { useState } from "react";
import Card from "../../../components/molecules/CardMovie";
import MovieHoverContent from "./MovieHoverContent";

export default function AllMoviesGrid({ movies, onOpenTrailer }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {movies.map((movie) => {
        return (
          <div
            key={movie.id}
            className="relative group transition-transform duration-300 lg:hover:scale-125 lg:hover:z-30"
            onMouseEnter={() => setHoveredId(movie.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div>
              <Card movie={movie} variant="horizontal" />
              <span className="absolute bottom-2 right-2 opacity-60 text-primary text-[10px] font-bold px-2 py-0.5 z-10 no-underline select-none">
                moovix
              </span>
            </div>
            {/* Hover content - solo visible en desktop (lg+) */}
            <MovieHoverContent
              movie={movie}
              isVisible={hoveredId === movie.id}
              onOpenTrailer={onOpenTrailer}
            />
          </div>
        );
      })}
    </div>
  );
}
