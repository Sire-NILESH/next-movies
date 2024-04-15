"use server";

import { Genre, MediaTrailerElement } from "@/types/typings";
import AppError from "../app-error";
import { mediaDetailRequest } from "../requests";
import {
  GetMediaDetailsActionSchema,
  TGetMediaDetailsActionSchema,
} from "../validation-schemas";
import {
  handleActionErrResponse,
  handleActionResponse,
} from "./actionResHandler";
import { getCurrentSessionAction } from "./authActions";

/**
 * Server action to get media details from the server.
 * @deprecated Use the route handler instead.
 *
 * Route handler example
 * @example 'GET /api/v1/media?id=424&type=movie'
 *
 * @param params
 * @returns
 */
export const getMediaDetailsAction = async (
  params: TGetMediaDetailsActionSchema
) => {
  try {
    const session = await getCurrentSessionAction();

    if (!session) throw new AppError("You need to be logged in", 401);

    // server side parse/invalidate the user provided param
    const parse = GetMediaDetailsActionSchema.safeParse(params);

    if (!parse.success)
      throw new AppError("Provided param invalidation failed", 400);

    const mediaId = parse.data.mediaId;
    const mediaType = parse.data.mediaType;

    const response = await fetch(mediaDetailRequest(mediaId, mediaType));
    const data = await response.json();

    const mediaDetails = {
      trailer: "",
      genres: [] as Genre[],
    };

    if (data?.videos) {
      const index = data.videos.results.findIndex(
        (element: MediaTrailerElement) => element.type === "Trailer"
      );

      mediaDetails.trailer = data.videos?.results[index]?.key;
    }
    if (data?.genres) {
      mediaDetails.genres = data.genres;
    }

    return handleActionResponse(mediaDetails);
  } catch (error) {
    return handleActionErrResponse(error, "Could not get media details");
  }
};
