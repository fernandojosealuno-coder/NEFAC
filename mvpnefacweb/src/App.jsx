import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Equipe from "./pages/Equipe";
import Galeria from "./pages/Galeria";
import Contato from "./pages/Contato";
import Noticias from "./pages/Noticias";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}