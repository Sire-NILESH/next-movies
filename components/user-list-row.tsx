"use client";

import useAuth from "@/hooks/useAuth";
import useList from "@/hooks/useList";
import React from "react";
import Row from "./row";

const UserListRow = () => {
  const { user, loading } = useAuth();
  const list = useList(user?.uid);
  return <> {list.length > 0 ? <Row title="My List" movies={list} /> : null}</>;
};

export default UserListRow;
