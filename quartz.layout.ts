import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import SubstackFeed from "./quartz/components/SubstackFeed"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
//  afterBody: [],
//CORREZIONE MIA E IL PRECEDNETE AFETRBODY LHO SPENTO IO
afterBody: [
/*
// Grafico Grande: VISIBILE SOLO IN HOME
    Component.ConditionalRender({
      component: Component.Graph({
        localGraph: {
          drag: true,
          zoom: true,
          depth: 1,
          // leggibilità “tipo Obsidian”
          focusOnHover: false,
          scale: 1.5,      // <-- QUESTO ti avvicina
          fontSize: 1.5,   // <-- QUESTO rende leggibili le etichette
          opacityScale: 15,
          showTags: true,
          enableRadial: false,
          repelForce: 1.5,
          centerForce: 0.1,
          linkDistance: 80,
      },
        globalGraph: {
          drag: true,
          zoom: true,
          depth: -1,
          focusOnHover: false,   // <<--- IMPORTANTISSIMO
          scale: 1.5,      // opzionale: anche il globale più leggibile
          fontSize: 1.0,
          opacityScale: 15,
          showTags: true,
          enableRadial: true,
          repelForce: 1.5,
          centerForce: 0.1,
          linkDistance: 80,
         },
      }),
      // condition: (_) => true, // da inserire se voglio che compaia su tuttte le pagine
      condition: (page) => page.fileData.slug === "index",
    }),
  */

    // --- LISTA ARTICOLI RECENTI (Solo in Home) ---
    Component.ConditionalRender({
      component: Component.RecentNotes({ 
        title: "Ultimi Aggiornamenti", 
        limit: 5,
        showTags: true
      }),
      // condition: (_) => true,
      condition: (page) => page.fileData.slug === "index",
    }),
// AGGIUNGI QUESTI BOTTONI DI CONDIVISIONE
  Component.ConditionalRender({
  component: Component.ShareButtons(),
  condition: (page) => page.fileData.slug !== "index",
}),

  ],
  footer: Component.Footer({
    links: {
      "Privacy (Zero Tracking)": "/Privacy",
      "SubStack": "https://paolomeregalli.substack.com/",
      "LinkedIn": "https://www.linkedin.com/in/paolomeregalli/",
      "Scrivimi una Mail": "mailto:paolo.meregalli@gmail.com",
      //"Feed RSS (No Algoritmi)": "/index.xml",
      // GitHub: "https://github.com/jackyzha0/quartz",
      // "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
    }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
 beforeBody: [
    // Briciole di pane: VISIBILI OVUNQUE TRANNE CHE IN HOME
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      // condition: (_) => true,
      condition: (page) => page.fileData.slug !== "index",
    }),
    
    // Titolo, Meta e Tag (sempre visibili)
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
//CORREZIONE MIA
  pageBody: Component.Content(),

  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({ 
    filterFn: (node) => {
      const name = (node.name ?? "")
      const slug = (node.slug ?? "")
      const path = (node.path ?? "")

      // Nascondi tutto ciò che inizia con "_"
      if (name.startsWith("_") || slug.startsWith("_") || path.includes("/_")) {
         return false
    }
    return true
     },
    }),
  ],

 right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    SubstackFeed(),
  ],
}
// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({ 
     filterFn: (node) => {
      const name = (node.name ?? "")
      const slug = (node.slug ?? "")
      const path = (node.path ?? "")

      // Nascondi tutto ciò che inizia con "_"
      if (name.startsWith("_") || slug.startsWith("_") || path.includes("/_")) {
         return false
    }
    return true
     },
    }),
  ],
  right: [],
}