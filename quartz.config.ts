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
    pageTitleSuffix: " | Paolo Meregalli",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "it-IT",
    baseUrl: "www.paolomeregalli.it",
/*    baseUrl: "quartz.jzhao.xyz", */
    ignorePatterns: ["private", "templates", ".obsidian","__bozze"],
    defaultDateType: "modified",
    theme: {
  fontOrigin: "googleFonts",
  typography: {
    title: "Schibsted Grotesk",
    header: "Schibsted Grotesk",
    body: "Source Sans Pro",
    code: "IBM Plex Mono",
  },
  colors: {
    lightMode: {
      light: "#FCFBF8",
      lightgray: "#E8E5DF",
      gray: "#98A1A0",
      darkgray: "#2B2D2C",
      dark: "#2F3338",
      secondary: "#B25D42",
      tertiary: "#4F6782",
      highlight: "rgba(224, 171, 114, 0.12)",
      textHighlight: "#DCEB925C",
    },
    darkMode: {
      light: "#181A1B",
      lightgray: "#2E3234",
      gray: "#97A09D",
      darkgray: "#D9DDD8",
      dark: "#F7F5F1",
      secondary: "#E0A573",
      tertiary: "#8EAAC1",
      highlight: "rgba(224, 165, 115, 0.14)",
      textHighlight: "#DCEB9250",
    },
  },
},
    /* theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
       title: "Schibsted Grotesk",
       header: "Schibsted Grotesk",
       body: "Source Sans Pro",
       code: "IBM Plex Mono",
     },
     colors: {
      lightMode: {
       light: "#FCFBF7",
       lightgray: "#E8E3D8",
       gray: "#98A49B",
       darkgray: "#2A312F",
       dark: "#52627B",
       secondary: "#B15A41",
       tertiary: "#5C7A6B",
       highlight: "rgba(236, 191, 128, 0.16)",
       textHighlight: "#DCEB9266",
       },
      darkMode: {
       light: "#181B1A",
       lightgray: "#2D3431",
       gray: "#93A097",
       darkgray: "#DCE1DA",
       dark: "#F7F4EE",
       secondary: "#E4AB73",
       tertiary: "#90B9A8",
       highlight: "rgba(228, 171, 115, 0.15)",
       textHighlight: "#DCEB9255",
      },
    },*/
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
