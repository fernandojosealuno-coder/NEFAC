const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Ajuste o actorId se necessário (verifique o actor no Apify)
const actorId = "coderx~instagram-profile-scraper-bio-posts";

async function startActor(input) {
  const token = process.env.APIFY_TOKEN;
  if (!token) throw new Error("Defina APIFY_TOKEN no ambiente.");

  const runUrl = `https://api.apify.com/v2/acts/${actorId}/runs?token=${token}`;
  try {
    const resp = await axios.post(runUrl, input, { headers: { "Content-Type": "application/json" } });
    return resp.data;
  } catch (err) {
    if (err.response) {
      console.error("Erro HTTP ao iniciar actor:");
      console.error("Status:", err.response.status);
      console.error("Body:", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error("Erro (sem response):", err.message || err);
    }
    throw err;
  }
}

async function fetchDataset(datasetId) {
  const token = process.env.APIFY_TOKEN;
  const itemsUrl = `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}&clean=1&format=json`;
  for (let i = 0; i < 15; i++) {
    try {
      const r = await axios.get(itemsUrl);
      if (r.data && r.data.length) return r.data;
    } catch (e) {
      // aguarda e tenta novamente
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error("Timeout ao aguardar dataset.");
}

async function main() {
  const username = process.argv[2] || "nefacunipampa";
  try {
    console.log("Iniciando actor no Apify para:", username);

    // A maioria dos actors do tipo 'profile-scraper' aceita 'usernames' (array).
    // Aqui mandamos esse formato principal e também deixamos fallback caso seja necessário.
    const input = {
      usernames: [username],
      resultsLimit: 12
    };

    let run = await startActor(input);

    // Se o actor retornar dataset em outro lugar, pega defaultDatasetId
    let datasetId = run.defaultDatasetId;
    if (!datasetId) {
      console.log("defaultDatasetId não encontrado na resposta inicial do actor. Verifique os logs do actor.");
      process.exit(1);
    }

    console.log("DatasetId:", datasetId);
    const items = await fetchDataset(datasetId);

    const outDir = path.resolve("src", "data");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, "instagram.json");
    fs.writeFileSync(outFile, JSON.stringify(items, null, 2), "utf8");
    console.log(`Dados salvos em ${outFile} (${items.length} itens)`);
  } catch (err) {
    console.error("Falha:", err.message || err);
    process.exit(1);
  }
}

main();