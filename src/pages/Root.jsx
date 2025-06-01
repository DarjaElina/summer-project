import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <>
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default Root;