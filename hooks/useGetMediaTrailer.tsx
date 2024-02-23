"use client";

import { Genre, MediaTrailerElement, Movie } from "@/types/typings";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

type Props = {
  movie: Movie | DocumentData | null;
};

const useGetMediaInfo = ({ movie }: Props) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [trailerLoading, setTrailerLoading] = useState<boolean>(false);
  const [trailerError, setTrailerError] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<string | string[]>("");

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      setTrailerLoading(true);

      try {
        const url = `https://api.themoviedb.org/3/${
          movie?.media_type ? movie?.media_type : movie?.type
        }/${movie?.id}?api_key=${
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

    fetchMovie();
  }, [movie]);

  return {
    trailer: { trailer, trailerLoading, trailerError },
    genres,
  };
};

export default useGetMediaInfo;
