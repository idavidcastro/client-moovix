export default function Btn({ name, onClick, className, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center ${className}`}
    >
      {icon && <span>{icon}</span>}
      {name}
    </button>
  );
}
