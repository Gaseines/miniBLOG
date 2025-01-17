import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

//hooks
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

//CSS
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const [tela, setTela] = useState(window.innerWidth <= 820 ? true : false);

  const [openMenu, setOpenMenu] = useState();

  const handleResize = () => {
    if (window.innerWidth <= 820) {
      setTela(true);
    } else {
      setTela(false);
    }
  };

  window.addEventListener("resize", handleResize);

  console.log(tela);

  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.brand} to={"/"}>
        mini <span>Blog</span>
      </NavLink>
      {tela && (
        <div className={styles.burguer} onClick={() => setOpenMenu(!openMenu)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="35"
            height="35"
            color="#9b84c4"
            fill="none"
          >
            <path
              d="M4 5L20 5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 12L20 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 19L20 19"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      )}
      <ul className={`${styles.links_list} ${openMenu ? styles.open : ""}`}>
        {tela &&(
          <li className={styles.close} onClick={() => setOpenMenu(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="35"
            height="35"
            color="#9b84c4"
            fill="none"
          >
            <path
              d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </li>
        )}
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to={"/register"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Registrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>{" "}
            </li>
            <li>
              <NavLink
                to={"/post/create"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Nova Postagem
              </NavLink>{" "}
            </li>
          </>
        )}
        <li>
          <NavLink
            to={"/about"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>{" "}
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
