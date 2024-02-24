"use client";

import { Genre, MediaTrailerElement, Media } from "@/types/typings";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

type Props = {
  media: Media | DocumentData | null;
};

const useGetMediaInfo = ({ media }: Props) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [trailerLoading, setTrailerLoading] = useState<boolean>(false);
  const [trailerError, setTrailerError] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<string | string[]>("");

  useEffect(() => {
    if (!media) return;

    async function fetchMedia() {
      setTrailerLoading(true);

      try {
        const url = `https://api.themoviedb.org/3/${
          media?.media_type ? media?.media_type : media?.type
        }/${media?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`;

        const response = await fetch(url);
        const data = await response.json();

        if (data?.videos) {
          const index = data.videos.results.findIndex(
            (element: MediaTrailerElement) => element.type === "Trailer"
          );

          setTrailer(data.videos?.results[index]?.key);
        }
        if (data?.genres) {
          setGenres(data.genres);
        }
      } catch (_err) {
        setTrailerError(true);
      } finally {
        setTrailerLoading(false);
      }
    }

    fetchMedia();
  }, [media]);

  return {
    trailer: { trailer, trailerLoading, trailerError },
    genres,
  };
};

export default useGetMediaInfo;
