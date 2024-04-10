"use client";

import { toastStyle } from "@/constants/toast-styles";
import {
  addMediaToListAction,
  deleteMediaFromListAction,
} from "@/lib/actions/userListActions";
import { getMediaName } from "@/lib/helpers";
import { Media } from "@/types/typings";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import toast from "react-hot-toast";
import useUserList from "./useUserList";

type Props = {
  media: Media | null;
};

const useUserListMediaActions = ({ media }: Props) => {
  const { data: session } = useSession();

  const { userList, mutate } = useUserList();

  // Check if the media is already in the user's list
  const isMediaUserListed = useMemo(
    () => userList?.findIndex((result) => result.id === media?.id) !== -1,
    [media?.id, userList]
  );

  const handleList = async () => {
    try {
      if (isMediaUserListed && session?.user && media) {
        toast("Removing...", {
          duration: 8000,
          style: toastStyle,
        });

        const res = await deleteMediaFromListAction({
          mediaId: media.id,
          mediaType: media.type,
        });

        if (res?.error) throw new Error(res.error);

        // mutate the userlist from useSWR cache
        // see https://swr.vercel.app/docs/mutation#bound-mutate
        userList &&
          (await mutate({
            data: {
              list: [...userList.filter((item) => item.id !== media.id)],
            },
          }));

        toast(
          `${
            media?.title || media?.original_name
          } has been removed from My List`,
          {
            duration: 8000,
            style: toastStyle,
          }
        );
      } else if (session?.user && media) {
        toast("Adding...", {
          duration: 8000,
          style: toastStyle,
        });

        const res = await addMediaToListAction({ media });

        if (res?.error) throw new Error(res.error);

        // mutate the userlist from useSWR cache
        // see https://swr.vercel.app/docs/mutation#bound-mutate
        userList &&
          (await mutate({
            data: {
              list: [...userList, media],
            },
          }));

        toast(`${getMediaName(media)} has been added to My List`, {
          duration: 8000,
          style: toastStyle,
        });
      }
    } catch (error) {
      toast("Something went wrong", {
        duration: 8000,
        style: toastStyle,
      });
    }
  };

  return { isMediaUserListed, handleList };
};

export default useUserListMediaActions;
