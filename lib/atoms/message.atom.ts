import { atom } from "jotai";
import { MessageType } from "@/lib/enums/MessageType.enum";

export const messageAtom = atom<{
  /**
   * Message should be an UNTRANSLATED FIELD.
   * Translation is done in the component itself.
   */
  message: string;
  type: MessageType;
} | null>(null);
