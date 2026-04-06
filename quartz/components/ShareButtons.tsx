import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import styles from "./styles/shareButtons.scss"

export default (() => {
  function ShareButtons(props: QuartzComponentProps) {
    const title =
      props.fileData.frontmatter?.title ??
      props.fileData.slug ??
      props.cfg.pageTitle

    const baseUrl = `https://${props.cfg.baseUrl}`
    const slug = props.fileData.slug === "index" ? "" : `/${props.fileData.slug}`
    const url = `${baseUrl}${slug}`

    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`

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

          <a
            class="share-button"
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Condividi su X"
          >
            X
          </a>
        </div>
      </section>
    )
  }

  ShareButtons.css = styles
  return ShareButtons
}) satisfies QuartzComponentConstructor