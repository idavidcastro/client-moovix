import { useState } from "react";
import { Check, Plus } from "lucide-react";
export default function FavBtn({ initial = false, onChange, className = "" }) {
  const [fav, setFav] = useState(initial);

  const handleClick = () => {
    setFav((prev) => {
      const newFav = !prev;
      if (onChange) onChange(newFav);
      return newFav;
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-full p-2 text-primary hover:scale-110 transition-transform  bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary hover:text-bg ${className}`}
      aria-label={fav ? "Quitar de la lista" : "Agregar a la lista"}
    >
      {fav ? <Plus /> : <Check />}
    </button>
  );
}
