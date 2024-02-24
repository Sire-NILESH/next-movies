"use client";

import {
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import MuiModal from "@mui/material/Modal";

import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player/lazy"; //remember to make it '/lazy' for lazy loading
import { useRecoilState } from "recoil";

import { modalState, mediaState } from "@/atoms/appAtoms";
import useGetMediaInfo from "@/hooks/useGetMediaTrailer";
import useUserListMediaActions from "@/hooks/useUserListMediaActions";
import { by639_1 } from "iso-language-codes";

function Modal() {
  const [showModal, setShodwModal] = useRecoilState(modalState);
  const [media] = useRecoilState(mediaState);
  const [muted, setMuted] = useState(false);

  const {
    trailer: { trailer, trailerError, trailerLoading },
    genres,
  } = useGetMediaInfo({ media });

  const { isMediaUserListed, handleList } = useUserListMediaActions({
    media,
  });

  const handleClose = () => {
    setShodwModal(false);
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="!md:top-7 fixed !top-14 left-0 right-0 z-50 mx-auto w-[94%] max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>
        {/* the 3rd party video player */}
        {/* the exact styling to make it responsive with that strange margin top value is provided by the Docs*/}
        <div className="relative bg-black pt-[56.25%]">
          {trailer ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              playing
              muted={muted}
            />
          ) : (
            <div className="absolute top-[35%] flex w-full items-center justify-center md:top-[50%]">
              <p className="inline-block text-2xl font-semibold text-gray-400">
                {trailerLoading
                  ? "Loading..."
                  : trailerError
                  ? "Sorry, video is unavailable"
                  : "Sorry, video is unavailable"}
              </p>
            </div>
          )}

          <div className="absolute bottom-4 flex w-full items-center justify-between px-4 md:bottom-10 md:px-10">
            <div className="flex space-x-4 md:space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-4 text-base font-bold text-black transition hover:bg-[#e6e6e6] md:px-8 md:text-xl">
                <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                Play
              </button>
              <button className="modalButton" onClick={handleList}>
                {isMediaUserListed ? (
                  <CheckIcon className="h-4 w-4 md:h-7 md:w-7" />
                ) : (
                  <PlusIcon className="h-4 w-4 md:h-7 md:w-7" />
                )}
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-4 w-4 md:h-6 md:w-6" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-4 w-4 md:h-6 md:w-6" />
              ) : (
                <VolumeUpIcon className="h-4 w-4 md:h-6 md:w-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-4 py-8 md:px-10">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {(media!.vote_average * 10).toFixed(2)}% Match
              </p>
              <p className="font-light">
                {media?.release_date || media?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="text-base md:w-5/6">{media?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{" "}
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Language:</span>{" "}
                  {
                    // @ts-ignore
                    by639_1[media?.original_language].name
                      ? // @ts-ignore
                        by639_1[media?.original_language].name
                      : "unknown"
                  }
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {media?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default React.memo(Modal);
