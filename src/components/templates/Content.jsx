import MoviesCarousel from "../molecules/MoviesCarousel";
import { GET_POPULAR_MOVIES } from "../../lib/queries";
import Hero from "../organisms/Hero";

export default function Content() {
  return (
    <main>
      <Hero />
      <MoviesCarousel
        title="Rated Movies"
        link="/allmovies"
        query={GET_POPULAR_MOVIES}
      />
    </main>
  );
}
