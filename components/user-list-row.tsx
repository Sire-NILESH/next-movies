"use client";

import { userListState } from "@/atoms/appAtoms";
import { useRecoilState } from "recoil";
import Row from "./row";
import useList from "@/hooks/useList";

const UserListRow = () => {
  const [userList] = useRecoilState(userListState);

  useList();

  return (
    <>
      {userList?.length > 0 ? <Row title="My List" medias={userList} /> : null}
    </>
  );
};

export default UserListRow;
