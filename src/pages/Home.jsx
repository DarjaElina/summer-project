import { NavLink, Link, Outlet } from "react-router";
import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
};

export default Home;
