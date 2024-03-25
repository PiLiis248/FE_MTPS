import { Navigate, Outlet, useNavigate } from "react-router-dom";

import React, { useEffect } from "react";
import { PATHS } from "../../constants/path";
import tokenMethod from "../../utils/token";
import { useAuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ redirectPath = "/" }) => {
  const { isLogged } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!!tokenMethod.get()) {
      navigate(PATHS.LOGIN);
    }
  }, [isLogged]);

  if (!!!tokenMethod.get()) {
    if (redirectPath) {
      return <Navigate to={redirectPath} />;
    } else {
      navigate(-1);
    }
  }

  return <Outlet />;
};

export default PrivateRoute;