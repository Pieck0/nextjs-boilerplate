import { MessageType } from "@/components/MessageContainer";
import { atom } from "jotai";

export const messageAtom = atom<{ message: string; type: MessageType } | null>(
  null,
);
