import { useState } from "react";
import Card from "../../../components/molecules/CardMovie";
import MenuLaptop from "./MenuLaptop";
import MenuMobile from "./MenuMobile";

export default function AllMoviesGrid({ movies, onOpenTrailer }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {movies.map((movie) => {
        return (
          <div
            key={movie.id}
            className="relative flex group transition-transform duration-300 lg:hover:scale-125 lg:hover:z-30"
            onMouseEnter={() => setHoveredId(movie.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative w-1/2 lg:w-full overflow-hidden">
              <div className="relative">
                <Card movie={movie} variant="horizontal" />
                <span className="absolute bottom-2 right-2 opacity-60 text-primary text-[10px] font-bold px-2 py-0.5 z-10 select-none pointer-events-none">
                  moovix
                </span>
              </div>
            </div>

            {/* menu en laptop (lg+) */}
            <MenuLaptop
              movie={movie}
              isVisible={hoveredId === movie.id}
              onOpenTrailer={onOpenTrailer}
            />
            <MenuMobile movie={movie} onOpenTrailer={onOpenTrailer} />
          </div>
        );
      })}
    </div>
  );
}
