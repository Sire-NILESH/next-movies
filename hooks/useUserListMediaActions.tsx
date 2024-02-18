"use client";

import React, { useEffect, useMemo, useState } from "react";
import useAuth from "./useAuth";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { Movie } from "@/lib/typings";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

type Props = {
  movie: Movie | DocumentData | null;
};

const toastStyle = {
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "16px",
  padding: "15px",
  borderRadius: "9999px",
  maxWidth: "1000px",
};

const useUserListMediaActions = ({ movie }: Props) => {
  const { user } = useAuth();
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);

  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot) => setMovies(snapshot.docs)
      );
    }
  }, [user, movie?.id]);

  // Check if the movie is already in the user's list
  const isMediaUserListed = useMemo(
    () => movies.findIndex((result) => result.data().id === movie?.id) !== -1,
    [movie?.id, movies]
  );

  const handleList = async () => {
    if (isMediaUserListed) {
      await deleteDoc(
        doc(db, "customers", user!.uid, "myList", movie?.id.toString()!)
      );

      toast(
        `${movie?.title || movie?.original_name} has been removed from My List`,
        {
          duration: 8000,
          style: toastStyle,
        }
      );
    } else {
      await setDoc(
        doc(db, "customers", user!.uid, "myList", movie?.id.toString()!),
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
