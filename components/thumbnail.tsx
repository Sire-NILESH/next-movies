"use client";

import Image from "next/image";
import { useRecoilState } from "recoil";
import { DocumentData } from "firebase/firestore";
import { modalState, mediaState } from "@/atoms/appAtoms";
import { Media } from "@/types/typings";

interface Props {
  // When using firebase
  media: Media | DocumentData;
}

function Thumbnail({ media }: Props) {
  const [_showModal, setShowModal] = useRecoilState(modalState);
  const [_currentMedia, setCurrentMedia] = useRecoilState(mediaState);
  return (
    <div
      className={
        "relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 rounded-sm md:rounded overflow-hidden"
      }
      onClick={() => {
        setCurrentMedia(media);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w300${
          media.backdrop_path || media.poster_path
        }`}
        className="object-cover"
        fill={true}
        sizes="(max-width: 768px) 260px, 260px"
        alt={media.name ?? media.title}
      />
    </div>
  );
}

export default Thumbnail;
