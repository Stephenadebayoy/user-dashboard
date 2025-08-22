/** @format */

import UserComponent from "@/components/ui/user";
import React from "react";

const UserContainer = () => {
  const defaultParams = {
    q: "",
    sort: "name",
    order: "asc",
    page: "1",
    limit: "10",
  };

  return <UserComponent searchParams={defaultParams} />;
};

export default UserContainer;
