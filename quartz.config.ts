import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Ing. Paolo  Meregalli",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "www.paolomeregalli.it",
/*    baseUrl: "quartz.jzhao.xyz", */
    ignorePatterns: ["private", "templates", ".obsidian","__bozze"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter",
        code: "Fragment Mono",
        title: "Inter",
        /* header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono", */
      },
      /* colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },*/
      colors: {
        lightMode: {
          light: "#FCFCFA", // Un bianco impercettibilmente più caldo (quasi carta), meno clinico del bianco puro FDFDFD.
          lightgray: "#E5E5E5", 
          gray: "#A0ABA4", // Grigio 255 per le connessioni del grafo.
          darkgray: "#2B2D2C", // Un nero/grigio profondissimo per il testo. Alta leggibilità, zero affaticamento.
          dark: "#485470", // IL TERZO OCCHIO (Indaco). I titoli dei tuoi post invitano alla riflessione profonda.
          secondary: "#EB5046", // LA RADICE (Rosso 255). Il tuo nome e i tuoi link tornano a pulsare di energia e pragmatismo.
          tertiary: "#485470", // Quando passi il mouse su un link rosso, diventa Indaco: dall'azione alla riflessione.
          highlight: "rgba(255, 201, 130, 0.15)", // IL CALORE (Salmone). Lo sfondo dei tag e della pagina attiva nel menu. Smorza l'aggressività del rosso creando un contrasto accogliente e organico.
          textHighlight: "#D8F87088", // LA CREATIVITÀ (Verde ppinch). Per l'evidenziatore di testo: la scintilla di caos creativo.
        },
        darkMode: {
          light: "#1A1C1B", // Fondo scuro, radicato e silenzioso.
          lightgray: "#323534", 
          gray: "#A0ABA4", 
          darkgray: "#D4D9D6", 
          dark: "#FDFDFD", 
          secondary: "#ffc982", // Nel tema scuro il rosso "spacca" troppo gli occhi. Usiamo il Salmone: caldo, creativo e molto leggibile.
          tertiary: "#85C7AD", // Acquamarina per le interazioni.
          highlight: "rgba(255, 201, 130, 0.15)", 
          textHighlight: "#D8F87088", 
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
