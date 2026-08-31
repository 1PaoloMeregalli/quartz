import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/substackFeed.inline"

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
    </div>
  )
}

SubstackFeed.afterDOMLoaded = script

export default (() => SubstackFeed) satisfies QuartzComponentConstructor
