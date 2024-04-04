"use client";

import { userListState } from "@/atoms/appAtoms";
import { getUserListMediasAction } from "@/lib/actions/userListActions";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

function useList() {
  const [_, setUserList] = useRecoilState(userListState);

  // Find all the medias in the user's list
  useEffect(() => {
    let ignore = false;

    getUserList();

    async function getUserList() {
      try {
        const list = await getUserListMediasAction();

        if (list?.error) throw new Error(list.error);

        if (list?.data && !ignore) {
          setUserList([...list.data]);
        }
      } catch (error) {}
    }

    // cleanup
    return () => {
      ignore = true;
    };
  }, [setUserList]);
}

export default useList;
