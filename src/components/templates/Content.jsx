import MoviesCarousel from "../molecules/MoviesCarousel";
import {
  GET_POPULAR_MOVIES,
  GET_TOP_RATED_MOVIES,
  GET_UPCOMING_MOVIES,
} from "../../lib/queries";
import Hero from "../organisms/Hero/index.jsx";

export default function Content() {
  return (
    <main className="space-y-6">
      <Hero />
      <MoviesCarousel
        title="Populares"
        link="/allmovies"
        query={GET_POPULAR_MOVIES}
      />
      <MoviesCarousel
        title="Mejor Valoradas"
        link="/allmovies"
        query={GET_TOP_RATED_MOVIES}
        variant="horizontal"
      />
      <MoviesCarousel
        title="Próximos Estrenos"
        link="/allmovies"
        query={GET_UPCOMING_MOVIES}
      />
    </main>
  );
}
