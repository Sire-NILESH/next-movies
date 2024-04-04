"use server";

import { Media } from "@/types/typings";
import db from "../db/prisma";
import { getCurrentSessionAction } from "./authActions";

import AppError from "../app-error";
import {
  AddMediaToListActionSchema,
  DeleteMediaFromListActionSchema,
  TAddMediaToListAction,
  TDeleteMediaFromListAction,
} from "../validationSchemas";
import {
  handleActionErrResponse,
  handleActionResponse,
} from "./actionResHandler";

/**
 * Server action that gets all the medias present in the current logged in user's list
 *
 * @returns
 */
export const getUserListMediasAction = async () => {
  try {
    const session = await getCurrentSessionAction();

    if (!session) throw new AppError("You need to be logged in", 401);

    const user = session.user;

    const userDBData = await db.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        user_list: {
          include: {
            items: {
              include: {
                media: true,
              },
            },
          },
        },
      },
    });

    if (userDBData?.user_list?.items) {
      const list = userDBData?.user_list?.items.map((item) => {
        // @ts-ignore
        delete item.media.db_id;
        return item.media as Media;
      });

      return handleActionResponse(list);
    }

    return handleActionResponse(null);
  } catch (error) {
    return handleActionErrResponse(
      error,
      "Failed to get user's list due to internal server error"
    );
  }
};

/**
 * Server action that adds provided media to the logged in user's list.
 *
 * @param param `{ media: Media }` The media object to be added to the list.
 * @returns
 */
export const addMediaToListAction = async (param: TAddMediaToListAction) => {
  try {
    const session = await getCurrentSessionAction();

    if (!session) throw new AppError("You need to be logged in", 401);

    const user = session.user;

    // server side parse/invalidate the user provided param
    const parse = AddMediaToListActionSchema.safeParse(param);

    if (!parse.success)
      throw new AppError("Provided param invalidation failed", 400);

    const mediaParsed = parse.data.media;

    // transaction
    await db.$transaction(
      async (tx) => {
        // upsert media
        const existingMedia = await tx.media.upsert({
          where: {
            type_id: {
              id: mediaParsed.id,
              type: mediaParsed.type,
            },
          },
          update: {}, // No update needed, just return the existing media
          create: {
            id: mediaParsed.id,
            name: mediaParsed.name,
            title: mediaParsed.title,
            media_type: mediaParsed.media_type,
            release_date: mediaParsed.release_date,
            first_air_date: mediaParsed.first_air_date,
            genre_ids: mediaParsed.genre_ids,
            origin_country: mediaParsed.origin_country,
            original_name: mediaParsed.original_name,
            original_title: mediaParsed.original_title,
            original_language: mediaParsed.original_language,
            backdrop_path: mediaParsed.backdrop_path,
            overview: mediaParsed.overview,
            popularity: mediaParsed.popularity,
            poster_path: mediaParsed.poster_path,
            vote_average: mediaParsed.vote_average,
            vote_count: mediaParsed.vote_count,
            type: mediaParsed.type,
          },
        });

        // add media to list of user
        await tx.userMediaList.upsert({
          where: {
            userId: user.id,
          },
          create: {
            userId: user.id,
            items: {
              create: {
                mediaId: existingMedia.id,
                mediaType: existingMedia.type,
              },
            },
          },
          update: {
            items: {
              create: {
                mediaId: existingMedia.id,
                mediaType: existingMedia.type,
              },
            },
          },
        });

        // await tx.userMediaList.update({
        //   where: {
        //     userId: user.id,
        //   },
        //   data: {
        //     items: {
        //       create: {
        //         mediaId: existingMedia.id,
        //         mediaType: existingMedia.type,
        //       },
        //     },
        //   },
        // });
      },
      {
        maxWait: 5000, // default: 2000
        timeout: 10000, // default: 5000
      }
    );
  } catch (error) {
    return handleActionErrResponse(
      error,
      "Could not add media due to internal server error"
    );
  }
};

/**
 * Server action that removes media from the logged in user's list.
 *
 * @param param `{ mediaId: Number, mediaType : MediaType }` The media object to be added to the list.
 * @returns
 */
export const deleteMediaFromListAction = async (
  param: TDeleteMediaFromListAction
) => {
  try {
    const session = await getCurrentSessionAction();

    if (!session) throw new AppError("You need to be logged in", 401);

    const user = session.user;

    // server side parse/invalidate the user provided param
    const parse = DeleteMediaFromListActionSchema.safeParse(param);

    if (!parse.success)
      throw new AppError("Provided param invalidation failed", 400);

    const mediaId = parse.data.mediaId;
    const mediaType = parse.data.mediaType;

    // transaction
    await db.$transaction(
      async (tx) => {
        const userList = await tx.userMediaList.findUnique({
          where: { userId: user.id },
        });

        if (userList) {
          await tx.userMediaListItem.delete({
            where: {
              mediaType_mediaId_userMediaListId: {
                userMediaListId: userList.id,
                mediaId: mediaId,
                mediaType: mediaType,
              },
            },
          });
        }

        // now check if the media is in the list of any user.
        const mediaExistsInSomeUserList = await tx.userMediaListItem.findFirst({
          where: {
            mediaId: mediaId,
            mediaType: mediaType,
          },
        });

        // if it doesnt exist, delete media from table.
        if (!mediaExistsInSomeUserList) {
          // const tenDaysAgo = new Date();
          // tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

          await tx.media.delete({
            where: {
              type_id: {
                id: mediaId,
                type: mediaType,
              },
            },
          });
        }
      },
      {
        maxWait: 5000, // default: 2000
        timeout: 10000, // default: 5000
      }
    );
  } catch (error) {
    return handleActionErrResponse(
      error,
      "Could not remove media due to internal server error"
    );
  }
};
