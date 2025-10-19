export default function HeroSkeleton() {
  return (
    <div className="relative animate-pulse">
      {/* Fondo del hero */}
      <div className="flex items-end justify-start w-full h-[40vh] sm:h-[40vh] lg:h-screen px-[5%] py-[10%] bg-secondary">
        {/* Capas de fondo */}
        <div className="absolute inset-0 bg-bg" />
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Contenido simulado */}
        <div className="relative z-20">
          {/* Título */}
          <div className="h-7 sm:h-10 md:h-10 lg:h-12 w-3/4 bg-gray-700 rounded mt-3" />

          {/* Descripción */}
          <div className="space-y-3 mt-7 hidden lg:block">
            <div className="h-4 w-xl bg-gray-700 rounded" />
            <div className="h-4 w-11/12 bg-gray-700 rounded" />
            <div className="h-4 w-xl bg-gray-700 rounded" />
            <div className="h-4 w-11/12 bg-gray-700 rounded" />
          </div>

          {/* Géneros */}
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-6 lg:mt-7">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-5 sm:h-6 w-16 sm:w-20 bg-gray-700 rounded-md"
              />
            ))}
          </div>

          {/* Botones */}
          <div className="hidden lg:flex items-center gap-4 mt-6">
            <div className="h-12 sm:h-15 w-36 sm:w-40 bg-gray-700 rounded-lg" />

            <div className="h-10 w-10 rounded-full bg-gray-700" />
            <div className="h-10 w-10 rounded-full bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
