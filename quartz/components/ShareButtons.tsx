import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import styles from "./styles/shareButtons.scss"

export default (() => {
  function ShareButtons(props: QuartzComponentProps) {
    const baseUrl = `https://${props.cfg.baseUrl}`
    const slug = props.fileData.slug === "index" ? "" : `/${props.fileData.slug}`
    const url = `${baseUrl}${slug}`
    const encodedUrl = encodeURIComponent(url)

    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`

    return (
      <section class="share-buttons">
        <p class="share-buttons-label">Condividi questo pensiero:</p>

        <div class="share-buttons-actions">
          <a
            class="share-button"
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su LinkedIn"
          >
            LinkedIn
          </a>

          <button
            class="share-button share-button-copy"
            type="button"
            data-share-url={url}
            aria-label="Copia il link della pagina"
          >
            Copia link
          </button>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener("click", async function (event) {
                const target = event.target;
                if (!(target instanceof Element)) return;

                const button = target.closest(".share-button-copy");
                if (!(button instanceof HTMLButtonElement)) return;

                const url = button.getAttribute("data-share-url") || window.location.href;
                const originalText = button.textContent || "Copia link";

                try {
                  if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(url);
                  } else {
                    const input = document.createElement("input");
                    input.value = url;
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand("copy");
                    input.remove();
                  }

                  button.textContent = "Copiato";
                  window.setTimeout(() => {
                    button.textContent = originalText;
                  }, 1400);
                } catch {
                  button.textContent = "Errore";
                  window.setTimeout(() => {
                    button.textContent = originalText;
                  }, 1400);
                }
              });
            `,
          }}
        />
      </section>
    )
  }

  ShareButtons.css = styles
  return ShareButtons
}) satisfies QuartzComponentConstructor