"use client";

import Row from "./row";
import useUserList from "@/hooks/useUserList";

const UserListRow = () => {
  const { userList } = useUserList();

  if (!userList) return null;

  return (
    <>
      {userList.length > 0 ? <Row title="My List" medias={userList} /> : null}
    </>
  );
};

export default UserListRow;
