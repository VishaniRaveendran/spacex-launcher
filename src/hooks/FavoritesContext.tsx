"use client";
import React, { createContext, useContext } from "react";
import { useFavorites } from "@/hooks/useFavorites";

const FavoritesContext = createContext<
  ReturnType<typeof useFavorites> | undefined
>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const favorites = useFavorites();
  return (
    <FavoritesContext.Provider value={favorites}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider"
    );
  return ctx;
}
