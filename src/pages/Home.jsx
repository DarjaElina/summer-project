
import { NavLink, Link } from "react-router";
import React from 'react'

const Home = () => {
  return (
    <div>Home
         <nav>
        <ul>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/calander">Calander</NavLink>
          <NavLink to="/login">Log In</NavLink>
        </ul>
      </nav>
    </div>
  )
}

export default Home;