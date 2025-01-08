import React from "react";
import { NavLink } from "react-router-dom";

//CSS
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.brand} to={"/"}>
        mini <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink to={"/"} className={({isActive}) => (isActive ? styles.active : '')}>Home</NavLink>
        </li>
        <li>
          {" "}
          <NavLink to={"/about"} className={({isActive}) => (isActive ? styles.active : '')}>Sobre</NavLink>{" "}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
