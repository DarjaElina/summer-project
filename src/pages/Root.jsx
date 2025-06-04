import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router"; // Use react-router-dom
import { Toaster } from "react-hot-toast";

const Root = () => {
  // You can keep useLocation if you need it for other purposes,
  // but it's not needed for making the footer always show.
  // const location = useLocation();
  // const isHomePage = location.pathname === '/';

  return (
    <>
      <Header/>
      <main>
        <Outlet />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontWeight: '500',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              icon: '✅',
            },
            error: {
              icon: '❌',
            },
          }}
        />
      </main>
      <Footer/>
    </>
  );
};

export default Root;