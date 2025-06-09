import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Root from "./pages/Root";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Events from "./pages/Events";
import CalendarPage from "./pages/Calendar/Calendar";
import MapPage from "./pages/MapPage";
import CreateEvent from "./pages/CreateEvent";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "./App.css";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import Contact from "./pages/Contact";
import EventDetails from "./pages/EventDetails/EventDetails";
import PublicEvents from "./pages/PublicEvents";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <PageNotFound /> },
      { path: "events/public/", element: <PublicEvents /> },
      { path: "events/public/:id", element: <EventDetails /> },
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
          {
            path: "themetoggle", 
            element: <ThemeToggle />,
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
