import React from "react";
import { dadosContato } from "../data/dadosContato";

export default function Contato() {
  return (
    <main>
      <section>
        <h2>Fale Conosco</h2>
        <p>Entre em contato com a coordenação do Núcleo de Estudos em Família e Cronicidade (NEFAC) na UNIPAMPA.</p>
        <div>
          <h3>Informações de Contato</h3>
          <p><strong>E-mail:</strong> <a href={`mailto:${dadosContato.email}`}>{dadosContato.email}</a></p>
          <p><strong>Telefone:</strong> {dadosContato.telefone}</p>
          <h3>Localização</h3>
          <p><strong>Instituição:</strong> {dadosContato.instituicao}</p>
          <p><strong>Endereço:</strong> {dadosContato.endereco}</p>
          <p><strong>Bairro:</strong> {dadosContato.Bairro}</p>
          <p><strong>Cidade:</strong> {dadosContato.cidade}</p>
          <p className="nota-contato">
            Para informações detalhadas sobre as linhas de pesquisa, consulte o <a href="http://dgp.cnpq.br/dgp/espelhogrupo/234883" target="_blank" rel="noopener noreferrer">Diretório do CNPq</a>.
          </p>
        </div>
        <div className="mapa-container">
          <iframe
            src="https://www.google.com/maps?q=Universidade+Federal+do+Pampa+Uruguaiana&output=embed"
            title="mapa"
            style={{ width: "100%", height: "100%", border: 0 }}
            allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}