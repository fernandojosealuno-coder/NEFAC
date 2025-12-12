import React from "react";
import { fotosGaleria } from "../data/fotosGaleria";

export default function Galeria() {
  return (
    <main>
      <section id="galeria-fotos">
        <h2>Galeria de Fotos</h2>
        <p>Confira alguns momentos importantes que marcam a trajetória do NEFAC.</p>
        <div className="galeria">
          {fotosGaleria.map((f, i) => (
            <figure key={i}>
              <img src={f.src} alt={f.alt} />
              <figcaption>{f.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}