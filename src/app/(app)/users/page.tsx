/** @format */

import { UserContainer } from "@/container";
import React, { Suspense } from "react";

const UserPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserContainer />
    </Suspense>
  );
};

export default UserPage;
