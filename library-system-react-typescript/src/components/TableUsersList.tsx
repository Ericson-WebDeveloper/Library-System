import React from "react";
import { DatasWPage } from "../models/DatasPage";
import { Role } from "../models/Role";
import { User } from "../models/User";
import UsersListItems from "./UsersListItems";

type TableUsersListProps = {
  users: DatasWPage<User<Role>> | null;
};

const TableUsersList = ({ users }: TableUsersListProps) => {
  return (
    <>
      {users?.data?.map((user: User<Role>, index: number) => {
        return <UsersListItems user={user} key={index} />;
      })}
    </>
  );
};

export default TableUsersList;
