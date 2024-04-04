"use client";

import { getMediaDetailsAction } from "@/lib/actions/dataAction";
import { Genre, Media } from "@/types/typings";
import { useEffect, useState } from "react";

type Props = {
  media: Media | null;
};

const useGetMediaInfo = ({ media }: Props) => {
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [trailerLoading, setTrailerLoading] = useState<boolean>(false);
  const [trailerError, setTrailerError] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<string | string[] | null>(null);

  useEffect(() => {
    if (!media) return;

    async function fetchMedia() {
      setTrailerLoading(true);

      try {
        if (media !== null) {
          const mediaDetails = await getMediaDetailsAction({
            mediaId: media.id,
            mediaType: media.media_type ? media.media_type : media.type,
          });

          if (mediaDetails.error || !mediaDetails.data) {
            throw new Error(
              "Failed to get media details or could not be found"
            );
          }

          if (mediaDetails.data.trailer.length > 0)
            setTrailer(mediaDetails.data.trailer);

          if (mediaDetails.data.genres.length > 0)
            setGenres(mediaDetails.data.genres);
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
