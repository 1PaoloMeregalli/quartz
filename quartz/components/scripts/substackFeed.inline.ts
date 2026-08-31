document.addEventListener("nav", () => {
  const container = document.getElementById("substack-posts-container")
  if (!container) return

  container.innerHTML = '<p style="font-size: 0.85rem; opacity: 0.7;">Caricamento articoli...</p>'

  fetch("https://api.rss2json.com/v1/api.json?rss_url=https://paolomeregalli.substack.com/feed")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.items && data.items.length > 0) {
        const posts = data.items.slice(0, 3)
        container.innerHTML = posts
          .map(
            (post: { link: string; title: string; pubDate: string }) =>
              '<div style="margin-bottom: 12px; line-height: 1.3;"><a href="' +
              post.link +
              '" target="_blank" style="font-size: 0.9rem; font-weight: 600; text-decoration: none;">' +
              post.title +
              '</a><br><small style="font-size: 0.75rem; opacity: 0.8;">' +
              post.pubDate.split(" ")[0] +
              "</small></div>",
          )
          .join("")
      } else {
        container.innerHTML = "<p>Nessun articolo trovato.</p>"
      }
    })
    .catch(() => {
      container.innerHTML =
        '<p style="font-size: 0.85rem; color: red;">Errore di caricamento.</p>'
    })
})
