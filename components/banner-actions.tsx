"use client";

import { mediaAtom, modalAtom } from "@/atoms/appAtoms";
import { Media } from "@/types/typings";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useSetAtom } from "jotai";
import { FaPlay } from "react-icons/fa";

interface Props {
  media: Media;
}

function BannerAction({ media }: Props) {
  const setShowModal = useSetAtom(modalAtom);
  const setCurrentMedia = useSetAtom(mediaAtom);

  return (
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
  );
}

export default BannerAction;
