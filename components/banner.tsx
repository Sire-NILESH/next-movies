import Image from "next/image";
import { baseUrl } from "../constants/media";
import { getMediaName } from "@/lib/helpers";
import { Media } from "@/types/typings";
import BannerAction from "./banner-actions";

interface Props {
  medias: Media[];
}

function Banner({ medias }: Props) {
  // random media for banner
  const media = medias[Math.floor(Math.random() * medias.length)];

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          priority
          src={`${baseUrl}${media?.backdrop_path || media?.poster_path}`}
          fill={true}
          className="object-cover"
          alt={`Banner of ${getMediaName(media)}` ?? "media banner"}
        />
      </div>

      <h1 className="pt-10 lg:pt-0 md:h-16 lg:h-28 md:py-4 text-2xl font-bold md:text-4xl lg:text-7xl line-clamp-2 text-shadow-md">
        {media?.title ?? media?.name ?? media?.original_name}
      </h1>

      <div className="flex items-center space-x-2 text-sm md:text-base md:space-x-6 flex-wrap text-shadow-md">
        <p className="font-semibold text-green-500">
          {media?.vote_average ? (media?.vote_average * 10).toFixed(2) : 0}%
          Match
        </p>
        <p className="font-light">
          {media?.release_date || media?.first_air_date}
        </p>
        <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
          HD
        </div>
        <p>{media?.type.toUpperCase()}</p>
      </div>

      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl line-clamp-5">
        {media?.overview}
      </p>

      <BannerAction media={media} />
    </div>
  );
}

export default Banner;
