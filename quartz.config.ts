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
