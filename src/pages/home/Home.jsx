import MoviesCarousel from "../../components/molecules/MoviesCarousel.jsx";
import {
  GET_POPULAR_MOVIES,
  GET_TOP_RATED_MOVIES,
  GET_UPCOMING_MOVIES,
} from "../../lib/queries";
import Hero from "../../components/organisms/Hero/index.jsx";
import useMoviesQuery from "../../hooks/useMoviesQuery";

export default function Home() {
  const popular = useMoviesQuery(GET_POPULAR_MOVIES);
  const topRated = useMoviesQuery(GET_TOP_RATED_MOVIES);
  const upcoming = useMoviesQuery(GET_UPCOMING_MOVIES);

  return (
    <div className="space-y-6">
      <Hero />
      <section id="popular">
        <MoviesCarousel
          title="Populares"
          link="/allmovies?category=popular"
          movies={popular.movies}
          loading={popular.loading}
        />
      </section>
      <section id="top-rated">
        <MoviesCarousel
          title="Recomendadas"
          link="/allmovies?category=top-rated"
          movies={topRated.movies}
          loading={topRated.loading}
          variant="horizontal"
        />
      </section>
      <section id="upcoming">
        <MoviesCarousel
          title="Próximamente"
          link="/allmovies?category=upcoming"
          movies={upcoming.movies}
          loading={upcoming.loading}
        />
      </section>
    </div>
  );
}
