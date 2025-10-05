import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "myList";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Leer desde localStorage al montar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setFavorites(raw ? JSON.parse(raw) : []);
    } catch (err) {
      console.error("useFavorites: error leyendo localStorage:", err);
      setFavorites([]);
    }

    // sincroniza con otras pestañas (storage) y con la misma pestaña (evento custom)
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          setFavorites(e.newValue ? JSON.parse(e.newValue) : []);
        } catch (err) {
          console.error("useFavorites: error parseando storage event:", err);
        }
      }
    };

    const onCustom = (e) => {
      // evento dispatchado internamente para sincronizar en la misma pestaña
      if (e?.detail) {
        setFavorites(Array.isArray(e.detail) ? e.detail : []);
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("favorites_updated", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("favorites_updated", onCustom);
    };
  }, []);

  const saveFavorites = useCallback((items) => {
    try {
      const payload = Array.isArray(items) ? items : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      // actualizar estado local
      setFavorites(payload);
      // notificar otras instancias en la misma pestaña
      window.dispatchEvent(
        new CustomEvent("favorites_updated", { detail: payload })
      );
      return payload;
    } catch (err) {
      console.error("useFavorites: error guardando favoritos:", err);
      return null;
    }
  }, []);

  const add = useCallback((movie) => {
    if (!movie || movie.id == null) return null;
    let newList;
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      newList = [...prev.filter((m) => m.id !== movie.id), movie];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
        window.dispatchEvent(
          new CustomEvent("favorites_updated", { detail: newList })
        );
      } catch (err) {
        console.error("useFavorites.add error:", err);
      }
      return newList;
    });
    return newList;
  }, []);

  const remove = useCallback((id) => {
    if (id == null) return null;
    let newList;
    setFavorites((prev) => {
      newList = prev.filter((m) => m.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
        window.dispatchEvent(
          new CustomEvent("favorites_updated", { detail: newList })
        );
      } catch (err) {
        console.error("useFavorites.remove error:", err);
      }
      return newList;
    });
    return newList;
  }, []);

  const toggle = useCallback((movie) => {
    if (!movie || movie.id == null) return null;
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      const newList = exists
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev.filter((m) => m.id !== movie.id), movie];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
        window.dispatchEvent(
          new CustomEvent("favorites_updated", { detail: newList })
        );
      } catch (err) {
        console.error("useFavorites.toggle error:", err);
      }
      return newList;
    });
    return null;
  }, []);

  const isFavorite = useCallback(
    (id) => {
      if (id == null) return false;
      return favorites.some((m) => m.id === id);
    },
    [favorites]
  );

  return {
    favorites,
    add,
    remove,
    toggle,
    isFavorite,
    saveFavorites,
  };
}
