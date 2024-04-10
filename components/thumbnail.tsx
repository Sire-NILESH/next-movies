"use client";

import { mediaAtom, modalAtom } from "@/atoms/appAtoms";
import { getMediaName } from "@/lib/helpers";
import { Media } from "@/types/typings";
import { useSetAtom } from "jotai";
import Image from "next/image";

interface Props {
  media: Media;
}

function Thumbnail({ media }: Props) {
  const setShowModal = useSetAtom(modalAtom);
  const setCurrentMedia = useSetAtom(mediaAtom);
  return (
    <div
      className={
        "relative min-w-[210px] aspect-video cursor-pointer transition duration-200 ease-out md:min-w-[260px] group md:hover:scale-105 rounded-sm md:rounded overflow-hidden"
      }
      onClick={() => {
        setCurrentMedia(media);
        setShowModal(true);
      }}
    >
      <div className="w-full px-3 py-2 z-10 absolute bottom-0 text-xs md:text-sm text-white text-shadow-md bg-gradient-to-t from-neutral-800/50 to-transparent">
        <span className="line-clamp-1">{getMediaName(media)}</span>
      </div>

      <Image
        src={`https://image.tmdb.org/t/p/w300${
          media.backdrop_path || media.poster_path
        }`}
        className="object-cover"
        fill={true}
        sizes="(max-width: 768px) 260px, 260px"
        alt={getMediaName(media) ?? "media"}
      />
    </div>
  );
}

export default Thumbnail;
