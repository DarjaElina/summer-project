import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

const Root = () => {
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