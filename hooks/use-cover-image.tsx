import { create } from "zustand";

type CoverImageStore = {
    url: string | undefined;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useCoverImage = create<CoverImageStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));