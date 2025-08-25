import { createBrowserRouter } from "react-router";
import Main from "../components/main";
import LoginPage from "../pages/login";
import AuthRoute from "../hook/auth";
import AdminPanel from "../pages/panel";
import ReverseRoute from "../hook/auth_reverse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <ReverseRoute />,
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
        ],
      },
      {
        path: "panel",
        element: <AuthRoute />,
        children: [
          {
            index: true,
            element: <AdminPanel />,
          },
        ],
      },
    ],
  },
]);

export default router;
