import React from "react";
import { dadosEquipe } from "../data/dadosEquipe";

export default function Equipe() {
  return (
    <main>
      <section id="equipe-nefac">
        <h2>Equipe NEFAC</h2>
        <p>Conheça os pesquisadores e estudantes que movem a produção de conhecimento e extensão do nosso Núcleo.</p>
        <div className="equipe-container">
          {dadosEquipe.map((m, i) => (
            <div className="membro" key={i}>
              <img src={m.foto} alt={m.altFoto} />
              <h3>{m.nome}</h3>
              <p><strong>{m.cargo}</strong><br />{m.descricao}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}