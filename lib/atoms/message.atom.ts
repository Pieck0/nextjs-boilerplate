import { MessageType } from "@/components/MessageContainer";
import { atom } from "jotai";

export const messageAtom = atom<{
  /**
   * Message should be an UNTRANSLATED FIELD.
   * Translation is done in the component itself.
   */
  message: string;
  type: MessageType;
} | null>(null);
