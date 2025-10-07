export default function Btn({ name, onClick, className, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center gap-3 px-5 py-3 font-medium transition rounded-md shadow-md cursor-pointer bg-secondary text-primary hover:bg-secondary/90 ${className}`}
    >
      {icon && <span>{icon}</span>}
      {name}
    </button>
  );
}
