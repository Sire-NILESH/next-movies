"use client";

import { db } from "@/lib/firebase";
import { Movie } from "@/lib/typings";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

function useList(uid: string | undefined) {
  const [list, setList] = useState<DocumentData[] | Movie[]>([]);

  useEffect(() => {
    if (!uid) return;

    return onSnapshot(
      collection(db, "customers", uid, "myList"),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, [uid]);

  return list;
}

export default useList;
