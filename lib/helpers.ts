import { Media } from "@/types/typings";

export const getMediaName = (media: null | Media) => {
  return (
    media?.name ?? media?.original_name ?? media?.title ?? media?.original_title
  );
};
