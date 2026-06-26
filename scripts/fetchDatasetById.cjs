const fs = require('fs');
const path = require('path');
const axios = require('axios');

const datasetId = process.argv[2]; // passe como argumento: ex: 5VE6b7eQpXU2a6aB2
if (!datasetId) {
  console.error('Uso: node scripts/fetchDatasetById.cjs <DATASET_ID>');
  process.exit(1);
}
const token = process.env.APIFY_TOKEN;
if (!token) {
  console.error('Defina APIFY_TOKEN no ambiente (ex: $env:APIFY_TOKEN=\"seu_token\")');
  process.exit(1);
}

(async () => {
  try {
    const url = `https://api.apify.com/v2/datasets/${datasetId}/items?clean=1&format=json&token=${token}`;
    console.log('Buscando dataset em:', url);
    const res = await axios.get(url, { timeout: 30000 });
    const items = res.data;
    const outDir = path.resolve('src', 'data');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, 'instagram.json');
    fs.writeFileSync(outFile, JSON.stringify(items, null, 2), 'utf8');
    console.log(`Salvo ${Array.isArray(items) ? items.length : 1} itens em ${outFile}`);
  } catch (err) {
    console.error('Erro ao buscar dataset:', err.response?.status, err.response?.data || err.message);
    process.exit(1);
  }
})();