import { RouterOutput } from "@/lib/trpcInferTypes";
import { atom } from "jotai";

export const productGalleryAtom = atom<
  RouterOutput["product"]["getAllProducts"][number] | null
>(null);
