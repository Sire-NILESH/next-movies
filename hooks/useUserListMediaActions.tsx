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
import { Movie } from "@/types/typings";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { toastStyle } from "@/lib/constants";

type Props = {
  movie: Movie | DocumentData | null;
};

const useUserListMediaActions = ({ movie }: Props) => {
  const { data: session, status } = useSession();
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);

  // Find all the movies in the user's list
  useEffect(() => {
    if (session?.user) {
      return onSnapshot(
        collection(db, "customers", session?.user.uid, "myList"),
        (snapshot) => setMovies(snapshot.docs)
      );
    }
  }, [session?.user, movie?.id]);

  // Check if the movie is already in the user's list
  const isMediaUserListed = useMemo(
    () => movies.findIndex((result) => result.data().id === movie?.id) !== -1,
    [movie?.id, movies]
  );

  const handleList = async () => {
    if (isMediaUserListed && session?.user?.uid) {
      await deleteDoc(
        doc(
          db,
          "customers",
          session?.user?.uid,
          "myList",
          movie?.id.toString()!
        )
      );

      toast(
        `${movie?.title || movie?.original_name} has been removed from My List`,
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
          movie?.id.toString()!
        ),
        {
          ...movie,
        }
      );

      toast(
        `${movie?.title || movie?.original_name} has been added to My List.`,
        {
          duration: 8000,
          style: toastStyle,
        }
      );
    }
  };

  return { isMediaUserListed, movies, handleList };
};

export default useUserListMediaActions;
