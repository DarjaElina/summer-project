import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import EventList from "./components/EventList/EventList";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

const App = () => (
  <>
    <RouterProvider router={router} />
  </>
);

export default App;
