import { X } from "lucide-react";

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed z-50 inset-0 flex items-center justify-center bg-black/90 p-4 animate-fadeIn overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bg-secondary rounded-lg shadow-xl w-full sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[1200px] animate-modalShow"
      >
        {/* Header del modal */}
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-primary line-clamp-1 flex-1 pr-4">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-primary hover:text-primary/80 transition-colors cursor-pointer rounded-full hover:bg-primary/10"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* contenedor del contenido con aspect ratio 16:9 para videos */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <div className="absolute inset-0 w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
