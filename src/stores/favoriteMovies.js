import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoriteMoviesStore = create(
  persist(
    (set) => ({
      favoriteMovies: [],

      addFavoriteMovie: (movie) =>
        set((state) => ({
          favoriteMovies: [...state.favoriteMovies, movie],
        })),

      removeFavoriteMovie: (id) =>
        set((state) => ({
          favoriteMovies: state.favoriteMovies.filter((m) => m.id !== id),
        })),
    }),
    { name: "favorite-movies" }
  )
);
