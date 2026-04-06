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
          light: "#FDFDFD", // Il foglio bianco puro, per far respirare il testo.
          lightgray: "#E5E5E5", // Bordi leggerissimi e non invadenti.
          gray: "#A0ABA4", // Il tuo Grigio 255 per le linee di collegamento del grafo.
          darkgray: "#323534", // Il tuo Nero 255 per i testi. Garantisce massima leggibilità.
          dark: "#1A1A1A", // Un nero quasi assoluto per far risaltare bene i Titoli H1 e H2.
          secondary: "#485470", // L'Indaco: governa i link, il titolo del sito e l'albero di navigazione. Calmo, elegante, da "studio".
          tertiary: "#EB5046", // Il Rosso 255: si accende SOLO quando passi il mouse sui link o sul grafo.
          highlight: "rgba(72, 84, 112, 0.1)", // Sfondo delicatissimo color Indaco per i tag e i blocchi, addio effetto rosa.
          textHighlight: "#D8F87088", // Il verde acido di ppinch, perfetto come vero e proprio evidenziatore per il testo.
        },
        darkMode: {
          light: "#1E201F", // Fondo scuro riposante (Nero 255).
          lightgray: "#323534", 
          gray: "#A0ABA4", 
          darkgray: "#D4D9D6", 
          dark: "#FDFDFD", 
          secondary: "#85C7AD", // L'Acquamarina di 255 per i link sul tema scuro, rilassante per gli occhi ma tecnico.
          tertiary: "#EB5046", // Rosso 255 al passaggio del mouse.
          highlight: "rgba(133, 199, 173, 0.15)", // Sfondo leggero Acquamarina.
          textHighlight: "#D8F87088", // Evidenziatore verde acido.
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
