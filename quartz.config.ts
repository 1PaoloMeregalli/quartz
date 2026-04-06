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
    pageTitleSuffix: "Ing.",
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
        // header: "Inter",
        //body: "Inter",
        //code: "Fragment Mono",
        title: "Schibsted Grotesk",
        //header: "Schibsted Grotesk",
        header: "Lora",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
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
         light: "#FAF7F1",        // carta calda, silenziosa, accogliente
         lightgray: "#E6DFD2",    // bordi, separatori, UI soft
         gray: "#92A095",         // grafo, metadati, elementi secondari
         darkgray: "#27302C",     // testo principale: profondo ma non duro
         dark: "#4E5D75",         // titoli, struttura, pensiero, profondità
         secondary: "#A95038",    // terracotta viva: presenza umana, energia gentile
         tertiary: "#4F7265",     // salvia profonda: hover, link secondari, respiro organico
         highlight: "rgba(232, 185, 119, 0.18)", // albicocca morbida per tag/menu attivo
         textHighlight: "#DDEB8A66", // evidenziatore vivo ma naturale, meno neon
        },
       darkMode: {
        light: "#171A19",        // fondo scuro bosco-notte
        lightgray: "#2C3330",    // separatori e superfici secondarie
        gray: "#8F9E95",         // grafo e metadata
        darkgray: "#D9DED7",     // testo principale
        dark: "#F6F3EC",         // titoli chiari, caldi, non bianchi puri
        secondary: "#E2A56B",    // terracotta illuminata / albicocca cotta
        tertiary: "#8AB7A4",     // salvia luminosa per hover e interazioni
        highlight: "rgba(226, 165, 107, 0.16)",
        textHighlight: "#DDEB8A55",
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
