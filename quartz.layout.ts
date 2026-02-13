import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
//  afterBody: [],
//CORREZIONE MIA E IL PRECEDNETE AFETRBODY LHO SPENTO IO
afterBody: [
    // --- LISTA ARTICOLI RECENTI (Solo in Home) ---
    Component.ConditionalRender({
      component: Component.RecentNotes({ 
        title: "Ultimi Aggiornamenti", 
        limit: 3,
        showTags: true
      }),
      condition: (_) => true,
      // oggi condition: (page) => page.fileData.slug === "index",
    }),
  ],
  footer: Component.Footer({
    links: {
      "Privacy (Zero Tracking)": "/Privacy",
      // "Feed RSS (No Algoritmi)": "/index.xml",
      "LinkedIn": "https://www.linkedin.com/in/paolomeregalli/",
      "Scrivimi una Mail": "mailto:paolo.meregalli@gmail.com",
       GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
    }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
 beforeBody: [
    // Briciole di pane: VISIBILI OVUNQUE TRANNE CHE IN HOME
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (_) => true,
      // OGGI condition: (page) => page.fileData.slug !== "index",
    }),
    
    // Titolo, Meta e Tag (sempre visibili)
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),

    // Grafico Grande: VISIBILE SOLO IN HOME
    Component.ConditionalRender({
      component: Component.Graph({
        localGraph: {
          drag: true,
          zoom: true,
          depth: 1,
          // leggibilità “tipo Obsidian”
          focusOnHover: false,
          scale: 2.0,      // <-- QUESTO ti avvicina
          fontSize: 1.5,   // <-- QUESTO rende leggibili le etichette
          opacityScale: 15,
          showTags: true,
          enableRadial: false,
          repelForce: 0.5,
          centerForce: 0.3,
          linkDistance: 30,
      },
        globalGraph: {
          drag: true,
          zoom: true,
          depth: -1,
          focusOnHover: false,   // <<--- IMPORTANTISSIMO
          scale: 2.0,      // opzionale: anche il globale più leggibile
          fontSize: 1.0,
          opacityScale: 15,
          showTags: true,
          enableRadial: true,
          repelForce: 0.5,
          centerForce: 0.3,
          linkDistance: 30,
         },
      }),
      condition: (_) => true,
      // OGGI condition: (page) => page.fileData.slug === "index",
    }),
  ],
//CORREZIONE MIA
 //  pageBody: Component.Content(),

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
   // Component.Graph(),
   // Component.DesktopOnly(Component.TableOfContents()),
   // Component.Backlinks(),
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