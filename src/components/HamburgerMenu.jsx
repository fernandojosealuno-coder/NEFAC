import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { navLinks } from "../data/globalConfig";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // adiciona classe para deslocamento do main/footer (se você quiser esse efeito)
    if (open) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");

    return () => document.body.classList.remove("menu-open");
  }, [open]);

  // JSX do menu (vai para document.body via portal)
  const menu = (
    <>
      <nav className={`mobile-menu${open ? " menu-open" : ""}`} aria-hidden={!open}>
        <button
          className="close-btn"
          aria-label="Fechar Menu"
          onClick={() => setOpen(false)}
        >
          X
        </button>

        {navLinks.map((link) => (
          <Link key={link.label} to={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>

      {open && <div className="mobile-menu-backdrop" onClick={() => setOpen(false)} />}
    </>
  );

  return (
    <>
      <button
        className="hamburger"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {typeof document !== "undefined" ? createPortal(menu, document.body) : null}
    </>
  );
}