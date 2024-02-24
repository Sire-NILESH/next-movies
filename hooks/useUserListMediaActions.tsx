"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { Media } from "@/types/typings";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { toastStyle } from "@/constants/toast-styles";

type Props = {
  media: Media | DocumentData | null;
};

const useUserListMediaActions = ({ media }: Props) => {
  const { data: session, status } = useSession();
  const [medias, setMedias] = useState<DocumentData[] | Media[]>([]);

  console.log(session);
  console.log({ medias });

  // Find all the medias in the user's list
  useEffect(() => {
    if (session?.user) {
      return onSnapshot(
        collection(db, "customers", session?.user?.uid, "myList"),
        (snapshot) => setMedias(snapshot.docs)
      );
    }
  }, [session?.user, media?.id]);

  // Check if the media is already in the user's list
  const isMediaUserListed = useMemo(
    () => medias.findIndex((result) => result.data().id === media?.id) !== -1,
    [media?.id, medias]
  );

  const handleList = async () => {
    try {
      if (isMediaUserListed && session?.user?.uid) {
        await deleteDoc(
          doc(
            db,
            "customers",
            session?.user?.uid,
            "myList",
            media?.id.toString()!
          )
        );

        toast(
          `${
            media?.title || media?.original_name
          } has been removed from My List`,
          {
            duration: 8000,
            style: toastStyle,
          }
        );
      } else if (session?.user?.uid) {
        await setDoc(
          doc(
            db,
            "customers",
            session?.user?.uid,
            "myList",
            media?.id.toString()!
          ),
          {
            ...media,
          }
        );

        toast(
          `${media?.title || media?.original_name} has been added to My List`,
          {
            duration: 8000,
            style: toastStyle,
          }
        );
      }
    } catch (error) {
      console.log(error);
      toast("Failed to add item to your list", {
        duration: 8000,
        style: toastStyle,
      });
    }
  };

  return { isMediaUserListed, medias, handleList };
};

export default useUserListMediaActions;
