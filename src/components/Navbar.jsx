import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../data/globalConfig";

export default function Navbar() {
  return (
    <nav className="top-nav" aria-label="Navegação principal">
      {navLinks.map((link, idx) => (
        <React.Fragment key={link.label}>
          <Link to={link.href} style={{ color: "inherit", textDecoration: "none" }}>
            {link.label}
          </Link>
          {idx < navLinks.length - 1 && " |"}
        </React.Fragment>
      ))}
    </nav>
  );
}
