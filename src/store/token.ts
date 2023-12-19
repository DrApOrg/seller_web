import { create } from "zustand";

// Definir el tipo de estado para el store
type TokenStore = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const useTokenStore = create<TokenStore>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));
