export default function MoviesCarouselSkeleton({ variant = "vertical" }) {
  const isHorizontal = variant === "horizontal";

  // Altura de las cards según la variante
  const cardHeight = isHorizontal
    ? "h-[100px] xs:h-[120px] sm:h-[140px] md:h-[150px] lg:h-[160px] xl:h-[180px] 2xl:h-[200px]"
    : "h-[200px] xs:h-[300px] sm:h-[300px] md:h-[350px] lg:h-[480px] xl:h-[480px] 2xl:h-[520px]";

  // Número máximo de cards para cubrir todos los breakpoints
  const maxCards = isHorizontal ? 4 : 6;

  // Clases de visibilidad según breakpoint para cada card
  const getVisibilityClasses = (index) => {
    if (isHorizontal) {
      // Horizontal: 2, 3, 3, 4, 4 cards según breakpoint
      if (index < 2) return ""; // Cards 0-1: siempre visibles
      if (index === 2) return "hidden sm:block"; // Card 2: visible desde sm
      if (index === 3) return "hidden lg:block"; // Card 3: visible desde lg
    } else {
      // Vertical: 3, 4, 4, 5, 6 cards según breakpoint
      if (index < 3) return ""; // Cards 0-2: siempre visibles
      if (index === 3) return "hidden sm:block"; // Card 3: visible desde sm
      if (index === 4) return "hidden lg:block"; // Card 4: visible desde lg
      if (index === 5) return "hidden xl:block"; // Card 5: visible desde xl
    }
    return "";
  };

  return (
    <section className="relative animate-pulse">
      {/* Header del carousel */}
      <div className="flex items-center justify-between px-[5%] mb-2 sm:mb-3">
        <div className="h-6 sm:h-7 md:h-8 w-32 sm:w-40 md:w-56 bg-gray-700 rounded" />
        <div className="flex items-center space-x-2">
          <div className="h-5 w-16 sm:w-20 md:w-24 bg-gray-700 rounded" />
        </div>
      </div>

      {/* Grid de skeleton cards */}
      <div className="">
        <div
          className={`grid gap-3 ${
            isHorizontal
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
              : "grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          }`}
        >
          {Array.from({ length: maxCards }).map((_, index) => (
            <div
              key={index}
              className={`bg-gray-700 rounded-lg ${cardHeight} w-full ${getVisibilityClasses(
                index
              )}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
