import { Media } from "@/types/typings";

export const getMediaName = (media: null | Media) => {
  return (
    media?.name ?? media?.original_name ?? media?.title ?? media?.original_title
  );
};

export const filterObj = function <T extends Object>(
  obj: T,
  allowedFields: (keyof T)[]
) {
  const newObj: Partial<T> = {};
  Object.keys(obj as Partial<T>).forEach((el) => {
    if (allowedFields.includes(el as keyof T))
      newObj[el as keyof T] = obj[el as keyof T];
  });

  return newObj;
};

export const tvGenreIdMap = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
} as const;

export const movieGenreIdMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
} as const;
