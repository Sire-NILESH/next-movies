import { userListState } from "@/atoms/appAtoms";
import { useRecoilState } from "recoil";
import Row from "./row";

const UserListRow2 = () => {
  const [userList] = useRecoilState(userListState);
  return (
    <>
      {userList?.length > 0 ? <Row title="My List" medias={userList} /> : null}
    </>
  );
};

export default UserListRow2;
