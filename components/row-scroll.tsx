"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";

import { Media } from "@/types/typings";
import Thumbnail from "./thumbnail";

interface Props {
  medias: Media[];
}

const RowScroll = ({ medias }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="group relative md:-ml-2">
      <ChevronLeftIcon
        className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
          !isMoved && "hidden"
        }`}
        onClick={() => handleClick("left")}
      />

      <div
        ref={rowRef}
        className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
      >
        {medias.map((media) => (
          <Thumbnail key={media.id} media={media} />
        ))}
      </div>

      <ChevronRightIcon
        className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
        onClick={() => handleClick("right")}
      />
    </div>
  );
};

export default RowScroll;
