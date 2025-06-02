import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Root from "./pages/Root";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Events from "./pages/Events";
import CalendarPage from "./pages/CalendarPage";
import MapPage from "./pages/MapPage";
import CreateEvent from "./pages/CreateEvent";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "*", element: <PageNotFound /> },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "events/create",
            element: <CreateEvent />,
          },
          {
            path: "events",
            element: <Events />,
          },
          {
            path: "calendar",
            element: <CalendarPage />,
          },
          {
            path: "map",
            element: <MapPage />,
          },
        ],
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
