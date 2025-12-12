// Vercel serverless function (Node 18+). Salve em /api/instagram.js
// Usa APIFY_TOKEN guardado nas variáveis de ambiente no Vercel (APIFY_TOKEN).

export default async function handler(req, res) {
  const token = process.env.APIFY_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "APIFY_TOKEN não configurado" });
  }

  const username = req.query.username || "nefacunipampa";
  const actorId = "coderx~instagram-profile-scraper-bio-posts"; // ajuste se usar outro actor

  try {
    // 1) Inicia o run do actor
    const runResp = await fetch(`https://api.apify.com/v2/acts/${actorId}/runs?token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileUrl: `https://www.instagram.com/${username}/`, resultsLimit: 12 })
    });
    if (!runResp.ok) {
      const txt = await runResp.text();
      return res.status(500).json({ error: "Erro iniciando actor", details: txt });
    }
    const runData = await runResp.json();
    const datasetId = runData.defaultDatasetId;
    if (!datasetId) return res.status(500).json({ error: "Dataset não encontrado no run" });

    // 2) Pega os itens do dataset (vê se já está pronto)
    const itemsUrl = `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}&clean=1&format=json`;
    let itemsResp, items;
    for (let i = 0; i < 6; i++) {
      itemsResp = await fetch(itemsUrl);
      if (!itemsResp.ok) {
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }
      items = await itemsResp.json();
      if (Array.isArray(items) && items.length) break;
      await new Promise(r => setTimeout(r, 1000));
    }

    return res.status(200).json(items || []);
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}