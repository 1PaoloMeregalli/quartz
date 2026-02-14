import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const ShareButtons: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
    const title = fileData.frontmatter?.title ?? "Articolo interessante"
    const url = `https://${cfg.baseUrl}/${fileData.slug}`
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    return (
      <div class="share-buttons">
        <span class="share-label">💭 Condividi questo pensiero:</span>
        <div class="share-links">
          <a 
            href={`mailto:?subject=${encodedTitle}&body=Ho trovato interessante questo articolo:%0A%0A${encodedUrl}`}
            aria-label="Condividi via Email"
            title="Condividi via Email"
          >
            ✉️ Email
          </a>
          <a 
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su LinkedIn"
            title="Condividi su LinkedIn"
          >
            LinkedIn
          </a>
          <a 
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su Twitter/X"
            title="Condividi su Twitter/X"
          >
            𝕏 Twitter
          </a>
          <a 
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su WhatsApp"
            title="Condividi su WhatsApp"
          >
            📱 WhatsApp
          </a>
        </div>
      </div>
    )
  }

  ShareButtons.css = `
    .share-buttons {
      margin: 3rem 0 2rem 0;
      padding: 1.5rem 0;
      border-top: 1px solid var(--lightgray);
    }

    .share-label {
      display: block;
      font-size: 0.9rem;
      color: var(--gray);
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .share-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .share-links a {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.5rem 1rem;
      background: var(--light);
      border: 1px solid var(--lightgray);
      border-radius: 6px;
      color: var(--darkgray);
      text-decoration: none;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }

    .share-links a:hover {
      background: var(--lightgray);
      color: var(--dark);
      border-color: var(--gray);
      transform: translateY(-2px);
    }

    /* Mobile: stack verticalmente se necessario */
    @media (max-width: 600px) {
      .share-links {
        flex-direction: column;
      }
      
      .share-links a {
        width: 100%;
        justify-content: center;
      }
    }
  `

  return ShareButtons
}) satisfies QuartzComponentConstructor