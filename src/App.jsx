
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import Map from './pages/Map';
import Calander from './pages/Calander';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path:'events',
        element:<Events/>,
      },
      {
        path: 'createevent',
        element: <CreateEvent />,
      },
      {
        path: 'map',
        element: <Map />,
      },
      {
        path: 'calander',
        element: <Calander />,
      }
      
    ],
  },
]);

const App = () => (
  <>
    
    <RouterProvider router={router} />
   
  </>
  
);

export default App; 


