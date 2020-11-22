import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/auth.hook";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const history = useHistory();
  const { logout } = useContext(AuthContext);
  const logoutHandler = (event) => {
    event.preventDefault();
    logout();
    history.push("/");
  };
  return (
    <nav>
      <div class={`nav-wrapper blue darken-1 ${styles.navbar}`}>
        <span class="brand-logo">Сокращение ссылок</span>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Создать</NavLink>
          </li>
          <li>
            <NavLink to="/links">Ссылки</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
