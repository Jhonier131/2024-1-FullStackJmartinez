import { create } from 'zustand';

export const useStore = create((set) => ({
    dataUser: null,
    setDataUser: (newUsuario) => set({ dataUser: newUsuario }),
  }));
