import MoviesCarousel from "../molecules/MoviesCarousel";
import {
  GET_POPULAR_MOVIES,
  GET_TOP_RATED_MOVIES,
  GET_UPCOMING_MOVIES,
} from "../../lib/queries";
import Hero from "../organisms/Hero/index.jsx";
import useMoviesQuery from "../../hooks/useMoviesQuery";

export default function Content() {
  const popular = useMoviesQuery(GET_POPULAR_MOVIES);
  const topRated = useMoviesQuery(GET_TOP_RATED_MOVIES);
  const upcoming = useMoviesQuery(GET_UPCOMING_MOVIES);

  return (
    <main className="space-y-6">
      <section id="hero">
        <Hero />
      </section>
      <section id="popular">
        <MoviesCarousel
          title="Populares"
          link="/allmovies"
          movies={popular.movies}
          loading={popular.loading}
          error={popular.error}
        />
      </section>
      <section id="top-rated">
        <MoviesCarousel
          title="Recomendadas"
          link="/allmovies"
          movies={topRated.movies}
          loading={topRated.loading}
          error={topRated.error}
          variant="horizontal"
        />
      </section>
      <section id="upcoming">
        <MoviesCarousel
          title="Próximos Estrenos"
          link="/allmovies"
          movies={upcoming.movies}
          loading={upcoming.loading}
          error={upcoming.error}
        />
      </section>
    </main>
  );
}
