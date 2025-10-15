import { useQuery } from "@apollo/client/react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  GET_POPULAR_MOVIES,
  GET_TOP_RATED_MOVIES,
  GET_UPCOMING_MOVIES,
} from "../../lib/queries";
import NavBar from "../../components/organisms/NavBar";
import Footer from "../../components/organisms/Footer";
import TrailerModal from "../../components/organisms/Hero/TrailerModal";
import MoviesGrid from "../../components/molecules/MoviesGrid";
import AllMoviesSkeleton from "../../components/skeletons/AllMoviesSkeleton";
// import EmptyState from "../../components/molecules/EmptyState";

export default function AllMovies() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "popular";
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const categoryConfig = {
    popular: {
      query: GET_POPULAR_MOVIES,
      title: "Populares",
      dataKey: "popularMovies",
    },
    "top-rated": {
      query: GET_TOP_RATED_MOVIES,
      title: "Recomendadas",
      dataKey: "topRatedMovies",
    },
    upcoming: {
      query: GET_UPCOMING_MOVIES,
      title: "Próximamente",
      dataKey: "upcomingMovies",
    },
  };

  const config = categoryConfig[category] || categoryConfig.popular;
  const { loading, data } = useQuery(config.query);

  function handleOpenTrailer(movie) {
    setSelectedMovie(movie);
    setOpen(true);
  }

  function handleCloseTrailer() {
    setOpen(false);
    setSelectedMovie(null);
  }

  return (
    <>
      <section className="min-h-screen">
        <NavBar />

        <div className="pt-24 pb-8 px-[5%]">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 cursor-default">
            {config.title}
          </h1>
        </div>

        <div className="px-[5%]">
          {loading && <AllMoviesSkeleton />}

          {/* Temporalmente comentado para ver empty state */}
          {data && data[config.dataKey] && (
            <MoviesGrid
              movies={data[config.dataKey]}
              onOpenTrailer={handleOpenTrailer}
            />
          )}
        </div>
        {/* Empty State - FORZADO PARA PRUEBA */}
        {/* <EmptyState /> */}
        <Footer />
        <TrailerModal
          open={open}
          onClose={handleCloseTrailer}
          movie={selectedMovie}
        />
      </section>
    </>
  );
}
