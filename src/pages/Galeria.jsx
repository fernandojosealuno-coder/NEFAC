import React from "react";
import { fotosGaleria } from "../data/fotosGaleria";

export default function Galeria() {
  const base = import.meta.env.BASE_URL || "/";

  const resolve = (url) => {
    if (!url) return url;
    return url.startsWith("http") ? url : `${base}${url.replace(/^\//, "")}`;
  };

  return (
    <main>
      <section id="galeria-fotos">
        <h2>Galeria de Fotos</h2>
        <p>Confira alguns momentos importantes que marcam a trajetória do NEFAC.</p>
        <div className="galeria">
          {fotosGaleria.map((f, i) => (
            <figure key={i}>
              <img src={resolve(f.src)} alt={f.alt} />
              <figcaption>{f.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}