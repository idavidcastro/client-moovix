import { Link } from "react-router-dom";
import { Info } from "lucide-react";

export default function BtnInfo({ movie, className }) {
  return (
    <Link
      className={`rounded-full p-[11px] hover:bg-primary ease-in-out duration-500 hover:text-bg text-primary hover:scale-110 transition-transform bg-primary/20 cursor-pointer ${className}`}
      title={"Más detalles"}
      to={`/movie/${movie.id}`}
    >
      {<Info size={18} />}
    </Link>
  );
}
