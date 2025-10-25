import { Film } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-16 sm:py-24 md:py-32 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-800 mb-4 sm:mb-6">
        <Film className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" />
      </div>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
        No hay películas disponibles
      </h3>
      <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-md mx-auto">
        Vuelve pronto para descubrir nuevas películas
      </p>
    </div>
  );
}
