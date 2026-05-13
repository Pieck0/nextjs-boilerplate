import { atom } from "jotai";
import { ModalType } from "../enums/ModalType.enum";

export const showModalAtom = atom<{
  type: ModalType;
  onSuccess?: () => void | Promise<void>;
} | null>(null);
