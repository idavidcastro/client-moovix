import { Check, Plus } from "lucide-react";
import useFavorites from "../../hooks/useFavorites";

function AddListBtn({ movie, className = "", onChange }) {
  const { toggle, isFavorite } = useFavorites();

  const fav = movie && movie.id != null ? isFavorite(movie.id) : false;

  const handleClick = () => {
    if (!movie || movie.id == null) {
      console.warn("AddListBtn: se requiere un objeto 'movie' con 'id'.");
      return;
    }
    toggle(movie);
    if (typeof onChange === "function") {
      // la comunicación con la lista actualizada se maneja en el hook via evento
      // pero mantenemos el callback para compatibilidad
      const raw = localStorage.getItem("myList");
      const list = raw ? JSON.parse(raw) : [];
      onChange(list);
    }
  };

  return (
    <button
      className={`rounded-full p-2 text-primary hover:scale-110 transition-transform bg-primary/10 border border-primary/20 cursor-pointer ease-in-out duration-500 ${
        fav
          ? "bg-primary text-bg hover:bg-primary hover:text-bg"
          : "hover:bg-primary hover:text-bg"
      } ${className}`}
      aria-pressed={fav}
      aria-label={fav ? "Quitar de mi lista" : "Agregar a mi lista"}
      onClick={handleClick}
      title={fav ? "Quitar de mi lista" : "Agregar a mi lista"}
    >
      {fav ? <Check /> : <Plus />}
    </button>
  );
}

export default AddListBtn;
