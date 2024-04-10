import { Media } from "@/types/typings";
import { atom } from "jotai";

export const modalAtom = atom(false);
export const mediaAtom = atom<Media | null>(null);
  