import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import Navbar from "./Navbar";

/*
  Header estruturado para ter:
  - background (opcional) via classe header--image
  - caixa central clara (hero-box) com logo + título
  - nav no canto superior direito (Navbar)
*/
export default function Header() {
  // pega base configurada no vite (para GitHub Pages o base normalmente é '/RepoName/')
  const base = import.meta.env.BASE_URL || "/";

  return (
    <header className="site-header header--image" role="banner">
      <div className="header-top">
        <HamburgerMenu />
        <Navbar />
      </div>

      <div className="header-inner">
        <div className="hero-box" aria-hidden={false}>
          <div className="logo">
            <img src={`${base}fotos/LOGO.jpg`} alt="Logotipo NEFAC" />
          </div>

          <div className="hero-text">
            <h1>Núcleo de Estudos em Família e Cronicidade</h1>
            <p className="hero-sub">UNIPAMPA — ensino · pesquisa · extensão</p>
          </div>
        </div>
      </div>
    </header>
  );
}