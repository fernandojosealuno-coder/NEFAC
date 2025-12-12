import React, { useEffect, useState } from "react";

export default function Noticias() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      // Tenta buscar /api/instagram — mas lê como texto e tenta JSON.parse (defensivo)
      try {
        // Em dev local (localhost) normalmente não há função serverless rodando,
        // então ainda vamos tentar, mas tratamos respostas inválidas.
        const res = await fetch("/api/instagram");
        if (res.ok) {
          const txt = await res.text();
          try {
            const data = JSON.parse(txt);
            if (mounted) {
              setPosts(normalize(data));
              setLoading(false);
              return;
            }
          } catch (parseErr) {
            // resposta não é JSON (por exemplo: Vite está servindo o arquivo .js em vez de um endpoint)
            console.warn("Resposta de /api/instagram não é JSON — usando arquivo local. Erro parse:", parseErr.message);
          }
        } else {
          console.warn("/api/instagram retornou status:", res.status);
        }
      } catch (e) {
        console.warn("Erro ao buscar /api/instagram:", e.message || e);
      }

      // Fallback para arquivo local (sempre disponível no projeto)
      try {
        // Preferimos instagram_with_local.json se você tiver baixado imagens locais (veja script)
        const prefer = await import("../data/instagram_with_local.json").catch(() => null);
        const localPrefer = prefer ? (prefer.default || prefer) : null;
        if (localPrefer && localPrefer.length) {
          if (mounted) {
            setPosts(normalize(localPrefer));
            setLoading(false);
            return;
          }
        }

        const local = await import("../data/instagram.json");
        if (mounted) {
          setPosts(normalize(local.default || local));
          setLoading(false);
        }
      } catch (err) {
        console.error("Erro ao importar arquivo local de dados:", err);
        if (mounted) {
          setError("Não foi possível carregar notícias (API e arquivo local falharam).");
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => { mounted = false; };
  }, []);

  function normalize(raw) {
    const arr = Array.isArray(raw) ? raw : (raw.items || []);
    return arr.map((item, idx) => {
      const image =
        // Prioriza imagem local caso você a tenha baixado (localImage criado pelo script)
        item.localImage ||
        item.displayUrl ||
        (Array.isArray(item.images) && item.images[0]) ||
        item.imageUrl ||
        item.thumbnailUrl ||
        (item.owner && (item.owner.profile_pic_url || item.ownerProfilePicUrl)) ||
        null;

      return {
        id: item.id || item.shortCode || item.shortcode || idx,
        image,
        caption: (item.caption || item.firstComment || "").trim(),
        date: item.timestamp || item.datePublished || item.createdAt || item.time || null,
        likes: item.likesCount || item.likes || item.likeCount || null,
        commentsCount: item.commentsCount || (item.latestComments && item.latestComments.length) || 0,
        postUrl: item.url || (item.shortCode ? `https://www.instagram.com/p/${item.shortCode}/` : null),
        alt: item.alt || item.description || ""
      };
    }).filter(p => p.image);
  }

  if (loading) return <main style={{ padding: 20 }}><p>Carregando notícias...</p></main>;
  if (error) return <main style={{ padding: 20 }}><p>{error}</p></main>;
  if (!posts || posts.length === 0) return <main style={{ padding: 20 }}><p>Nenhuma notícia encontrada.</p></main>;

  return (
    <main style={{ padding: 20 }}>
      <section>
        <h2>Notícias — Instagram NEFAC</h2>
        <p>Publicações recentes extraídas do Instagram do NEFAC.</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 16,
          marginTop: 12
        }}>
          {posts.map(p => (
            <article key={p.id} style={{ background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 6px 16px rgba(0,0,0,0.06)" }}>
              <a href={p.postUrl || "#"} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                <img src={p.image} alt={p.alt || "Imagem do Instagram"} style={{ width: "100%", height: 200, objectFit: "cover" }} />
              </a>
              <div style={{ padding: 12, color: "#154360" }}>
                <p style={{ margin: 0 }}>{p.caption}</p>
                <div style={{ marginTop: 8, color: "#6b7a86", fontSize: "0.85rem" }}>
                  {p.date && <span>{new Date(p.date).toLocaleString()}</span>}
                  {typeof p.likes === "number" && <span style={{ marginLeft: 12 }}>❤️ {p.likes}</span>}
                  {typeof p.commentsCount === "number" && <span style={{ marginLeft: 12 }}>💬 {p.commentsCount}</span>}
                </div>
                {p.postUrl && <p style={{ marginTop: 8 }}><a href={p.postUrl} target="_blank" rel="noopener noreferrer">Abrir no Instagram</a></p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}