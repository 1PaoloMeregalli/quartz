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
          light: "#FDFDFD", // Spazio e silenzio (255)
          lightgray: "#E0E4E2", // Bordi discreti
          gray: "#A0ABA4", // Grigio 255 per il grafo
          darkgray: "#323534", // Nero 255 per il corpo del testo (Leggibilità)
          dark: "#485470", // Indaco (Non Solo Yoga) per i Titoli
          secondary: "#EB5046", // Rosso 255 per i Link (Azione)
          tertiary: "#FF1E89", // Rosa Fluo (ppinch) per l'interazione
          highlight: "rgba(194, 178, 250, 0.15)", // Accenno Lilla per i blocchi
          textHighlight: "#D8F87088", // Verde Acido (ppinch) per evidenziare
        },
        darkMode: {
          light: "#1E201F", // Il tuo Nero 255 come sfondo profondo
          lightgray: "#323534", 
          gray: "#A0ABA4", 
          darkgray: "#D4D9D6", 
          dark: "#FDFDFD", 
          secondary: "#D8F870", // In dark mode, il Verde Acido diventa il colore dei link (massimo contrasto)
          tertiary: "#FF1E89", // Rosa Fluo per l'hover
          highlight: "rgba(235, 80, 70, 0.15)", // Rosso 255 in trasparenza
          textHighlight: "#48547088", // Indaco come evidenziatore
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
