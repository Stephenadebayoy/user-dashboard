/** @format */

import { LoginContainer } from "@/container";
import React, { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContainer />;
    </Suspense>
  );
};

export default LoginPage;
