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
        title="Popular Movies"
        link="/allmovies"
        query={GET_POPULAR_MOVIES}
      />
      <MoviesCarousel
        title="Top Rated Movies"
        link="/top-rated"
        query={GET_TOP_RATED_MOVIES}
      />
      <MoviesCarousel
        title="Upcoming Movies"
        link="/upcoming"
        query={GET_UPCOMING_MOVIES}
      />
    </main>
  );
}
