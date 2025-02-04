import { Home, Login } from "../view/pages";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
];

export default routes;
