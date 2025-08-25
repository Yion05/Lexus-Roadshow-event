import * as React from "react";
import { Navigate, Outlet } from "react-router";
import baseURL, { summaryAPI } from "../api/summaryAPI";
import axios from "axios";
import type { APIResponse, isAuth } from "../types/types";
// import { Navigate, Outlet } from "react-router-dom";
// import SummaryApi, { baseURL } from "../common/api/summaryAPI";
// import axios from "axios";
// import type { CookieRes } from "../common/type";
// import toast from "react-hot-toast";

const AuthRoute = () => {
    

  const [isAuthorized, setIsAuthorized] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkAuth = async() => {
      try {
        const response = await axios.get<APIResponse<isAuth>>(
          `${baseURL}/${summaryAPI.authAPI.url}`,
          { withCredentials: true }
        );
        if (response.data.output?.isAuth) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          alert("Unauthorized access.")
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthorized === null) {
    return <div>Checking authentication...</div>;
  }

  if (isAuthorized) {
    return <Outlet></Outlet>;
  } else {
    return <Navigate to={"/"}/>
  }
};

export default AuthRoute;
