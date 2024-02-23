"use client";

import Image from "next/image";
import { useRecoilState } from "recoil";
import { DocumentData } from "firebase/firestore";
import { modalState, movieState } from "@/atoms/appAtoms";
import { Movie } from "@/types/typings";

interface Props {
  // When using firebase
  movie: Movie | DocumentData;
}

function Thumbnail({ movie }: Props) {
  const [_showModal, setShowModal] = useRecoilState(modalState);
  const [_currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
    <div
      className={
        "relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 rounded-sm md:rounded overflow-hidden"
      }
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w300${
          movie.backdrop_path || movie.poster_path
        }`}
        className="object-cover"
        fill={true}
        sizes="(max-width: 768px) 260px, 260px"
        alt={movie.name ?? movie.title}
      />
    </div>
  );
}

export default Thumbnail;
