"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { baseUrl } from "../constants/media";

import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { Media } from "@/types/typings";
import { modalState, mediaState } from "@/atoms/appAtoms";

interface Props {
  netflixOriginals: Media[];
}

function Banner({ netflixOriginals }: Props) {
  const [media, setMedia] = useState<Media | null>(null);
  const [_showModal, setShowModal] = useRecoilState(modalState);
  const [_, setCurrentMedia] = useRecoilState(mediaState);

  useEffect(() => {
    setMedia(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          priority
          src={`${baseUrl}${media?.backdrop_path || media?.poster_path}`}
          fill={true}
          className="object-cover"
          alt={media?.name ?? "media banner"}
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl line-clamp-2">
        {media?.title ?? media?.name ?? media?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl line-clamp-5">
        {media?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMedia(media);
            setShowModal(true);
          }}
        >
          More Info
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
}

export default Banner;
