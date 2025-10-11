export default function MoviesCarouselSkeleton({ variant = "vertical" }) {
  const isHorizontal = variant === "horizontal";

  const aspectRatio = isHorizontal ? "aspect-[16/9]" : "aspect-[2/3]";
  const maxCards = isHorizontal ? 4 : 6;

  const getVisibilityClasses = (index) => {
    if (isHorizontal) {
      if (index < 2) return "";
      if (index === 2) return "hidden sm:block";
      if (index === 3) return "hidden lg:block";
    } else {
      if (index < 3) return "";
      if (index === 3) return "hidden sm:block";
      if (index === 4) return "hidden lg:block";
      if (index === 5) return "hidden xl:block";
    }
    return "";
  };

  return (
    <section className="relative animate-pulse">
      {/* header del carousel */}
      <div className="flex items-center justify-between px-[5%] mb-2 sm:mb-3">
        <div className="h-5 sm:h-7 md:h-8 w-32 sm:w-40 md:w-56 bg-gray-700 rounded-sm" />
        <div className="flex items-center space-x-2">
          <div className="h-5 w-16 sm:w-20 md:w-24 bg-gray-700 rounded-sm" />
        </div>
      </div>

      {/* grid de skeleton cards */}
      <div
        className={`grid gap-2 ${
          isHorizontal
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
            : "grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        }`}
      >
        {Array.from({ length: maxCards }).map((_, index) => (
          <div
            key={index}
            className={`bg-gray-700 rounded-sm ${aspectRatio} w-full ${getVisibilityClasses(
              index
            )}`}
          />
        ))}
      </div>
    </section>
  );
}
