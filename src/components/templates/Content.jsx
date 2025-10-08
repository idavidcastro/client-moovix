import MoviesCarousel from "../molecules/MoviesCarousel";
import { GET_POPULAR_MOVIES } from "../../lib/queries";
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
    </main>
  );
}
