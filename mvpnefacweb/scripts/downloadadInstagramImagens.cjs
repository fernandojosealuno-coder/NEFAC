const fs = require("fs");
const path = require("path");
const axios = require("axios");

async function download(url, outPath) {
  const writer = fs.createWriteStream(outPath);
  const res = await axios.get(url, {
    responseType: "stream",
    timeout: 30000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://www.instagram.com/",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
    maxRedirects: 5,
  });

  return new Promise((resolve, reject) => {
    res.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function tryDownload(url, outPath, tries = 3) {
  for (let i = 1; i <= tries; i++) {
    try {
      await download(url, outPath);
      return true;
    } catch (err) {
      console.warn(`Tentativa ${i} falhou para ${url}: ${err.message || err}`);
      if (i === tries) throw err;
      await new Promise((r) => setTimeout(r, 800 * i));
    }
  }
}

(async () => {
  try {
    const dataPath = path.resolve("src", "data", "instagram.json");
    if (!fs.existsSync(dataPath)) {
      console.error("src/data/instagram.json não encontrado.");
      process.exit(1);
    }

    const items = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const outDir = path.resolve("public", "insta");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const result = [];

    for (const item of items) {
      const id = item.id || item.shortCode || item.shortcode || Date.now().toString();
      const remote = item.displayUrl || (Array.isArray(item.images) && item.images[0]) || item.imageUrl;
      if (!remote) {
        result.push({ ...item });
        continue;
      }

      const extMatch = remote.match(/\.(jpg|jpeg|png|webp)(?:\?|$)/i);
      const ext = extMatch ? extMatch[1].toLowerCase() : "jpg";
      const fileName = `${id}.${ext}`;
      const outPath = path.join(outDir, fileName);

      try {
        console.log(`Baixando (${fileName}) ${remote}`);
        await tryDownload(remote, outPath, 3);
        console.log(`Salvo: ${outPath}`);
        result.push({ ...item, localImage: `/insta/${fileName}` });
      } catch (err) {
        console.warn(`Falha ao baixar ${remote}: ${err.message || err}`);
        result.push({ ...item }); // sem localImage
      }

      await new Promise((r) => setTimeout(r, 250));
    }

    const outJson = path.resolve("src", "data", "instagram_with_local.json");
    fs.writeFileSync(outJson, JSON.stringify(result, null, 2), "utf8");
    console.log(`Gerado: ${outJson}`);
    console.log("Concluído.");
  } catch (err) {
    console.error("Erro no script:", err);
    process.exit(1);
  }
})();