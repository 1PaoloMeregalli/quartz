import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const SubstackFeed: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`substack-feed ${displayClass ?? ""}`}>
      <h3>Dal mio Substack</h3>
      <div id="substack-posts-container" style={{ marginBottom: "1rem" }}>
        <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>Caricamento articoli...</p>
      </div>
      <a 
        href="https://paolomeregalli.substack.com" 
        target="_blank" 
        style={{ fontWeight: "bold", textDecoration: "none", color: "var(--secondary)" }}
      >
        Vai a tutti gli articoli →
      </a>

      {/* Lo script che interroga l'RSS e genera l'HTML dinamico */}
      <script dangerouslySetInnerHTML={{
        __html: `
          fetch('https://api.rss2json.com/v1/api.json?rss_url=https://paolomeregalli.substack.com/feed')
            .then(response => response.json())
            .then(data => {
              const container = document.getElementById('substack-posts-container');
              if (data && data.items) {
                // Prende solo i primi 1 articoli
                const posts = data.items.slice(0, 1);
                container.innerHTML = posts.map(post =>
                  '<div style="margin-bottom: 12px; line-height: 1.3;"><a href="' + post.link + '" target="_blank" style="font-size: 0.9rem; font-weight: 600; text-decoration: none;">' + post.title + '</a><br><small style="font-size: 0.75rem; opacity: 0.8;">' + post.pubDate.split(' ')[0] + '</small></div>'
                ).join('');
              } else {
                container.innerHTML = '<p>Nessun articolo trovato.</p>';
              }
            })
            .catch(err => {
              document.getElementById('substack-posts-container').innerHTML = '<p style="font-size: 0.85rem; color: red;">Errore di caricamento.</p>';
            });
        `
      }} />
    </div>
  )
}

export default (() => SubstackFeed) satisfies QuartzComponentConstructor