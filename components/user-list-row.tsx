"use client";

import useList from "@/hooks/useList";
import React from "react";
import Row from "./row";
import { useSession } from "next-auth/react";

const UserListRow = () => {
  const { data: session } = useSession();

  const user = session?.user;

  const list = useList(user?.uid);
  return <> {list.length > 0 ? <Row title="My List" movies={list} /> : null}</>;
};

export default UserListRow;
