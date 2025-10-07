import { X } from "lucide-react";

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed z-50 inset-0 flex items-center justify-center bg-black/80 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bg-secondary rounded-lg shadow-xl w-[900px] max-w-[90vw] h-[500px] max-h-[90vh] flex flex-col animate-modalShow"
      >
        <div className="flex items-center justify-between p-3">
          <h2 className="text-xl font-medium text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="p-1  text-primary cursor-pointer"
            aria-label="Cerrar"
          >
            <X size={26} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
