export default function Btn({ name, onClick, className, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center gap-3 px-5 py-3 font-medium rounded-md cursor-pointer bg-secondary/60 backdrop-blur-md text-primary shadow-xl transition-all duration-300 ease-out hover:bg-secondary/90 hover:shadow-[0_0_20px_rgba(14,116,144,0.4)] hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {icon && <span>{icon}</span>}
      {name}
    </button>
  );
}
