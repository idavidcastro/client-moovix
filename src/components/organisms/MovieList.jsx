import CardMovie from "../molecules/CardMovie";

export default function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <p className="text-center text-secondary mt-6">No movies available</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4 mb-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          aria-label={`Movie: ${movie.title}`}
          className="group bg-primary/10 rounded-xl overflow-hidden shadow-md flex flex-col cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <CardMovie
            img_path={movie.poster_path}
            title={movie.title}
            release_date={movie.release_date}
            classname="h-[320px] aspect-auto object-cover"
          />
          <div className="p-3 flex-1 flex flex-col justify-between">
            <h3 className="text-base font-semibold text-primary mb-1 line-clamp-2 group-hover:text-primary/80 transition-colors">
              {movie.title}
            </h3>
            <span className="text-xs text-secondary">{movie.release_date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
