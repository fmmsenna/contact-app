import React, { useContext, useEffect } from "react";
import { SessionContext } from "./SessionContext";
import { useNavigate, Outlet } from "react-router-dom";

function AuthGuard() {
  const { session } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/");
      return;
    }
  }, []);

  return <Outlet />;
}

export default AuthGuard;
