import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        
        {/* Questa parte legge i link dal file di configurazione */}
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>

        {/* --- DISCLAIMER AMAZON --- */}
        <p style={{ marginTop: "1rem", fontSize: "0.8rem", opacity: 0.6 }}>
           In qualità di Affiliato Amazon, potrei ricevere un guadagno da alcuni acquisti: 
           a te non costa un cent in più, ma il mio ego ringrazia per il caffè virtuale. ☕
        </p>
        {/* ------------------------- */}

      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor