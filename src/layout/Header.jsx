import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/layout/header.css"

function Header() {
    return (
        <header className="top">
            <h1>Météo</h1>
            <nav className="navigation">
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : null)}
                >
                    Accueil
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? "active" : null)}
                >
                    A propos de l'app
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;
