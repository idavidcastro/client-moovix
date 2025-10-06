import { X } from "lucide-react";
export default function Modal({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed z-50 inset-0 flex items-center justify-center transition-colors
        ${open ? "visible bg-black/80" : "invisible"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-bg-secondary rounded-sm shadow transition-all w-[900px] h-[500px] flex flex-col justify-center items-center
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <div className="flex items-center justify-between p-2">
          <h1>titulo</h1>
          <button
            onClick={onClose}
            className="rounded-sm cursor-pointer text-primary bg-secondary hover:bg-primary hover:text-secondary"
          >
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
