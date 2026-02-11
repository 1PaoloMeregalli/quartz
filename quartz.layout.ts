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
        showTags: false
      }),
      condition: (page) => page.fileData.slug === "index",
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
      condition: (page) => page.fileData.slug !== "grafo",
    }),
    
    // Titolo, Meta e Tag (sempre visibili)
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),

    // Grafico Grande: VISIBILE SOLO IN HOME
    Component.ConditionalRender({
      component: Component.Graph({
        localGraph: false, // false = mostra tutto il sito (effetto galassia)
        showTags: true, //AGGIUNTO IO
//        linkDistance: 2, //AGGIUNTO IO
        depth: 1 , // Profondità infinita
//DA QUI
// --- NUOVI PARAMETRI FISICI ---
        repelForce: 0.05,   // Spingi MENO (Default è molto più alto)
        centerForce: 1.5,  // Tira di PIÙ verso il centro
        linkDistance: 2,  // Corde corte
       scale: 1,        // Parti un po' più "zoomato indietro"
        fontSize: 0.5,     // Testo più piccolo per non affollare
        opacityScale: 3,
//A QUI


      }),
      condition: (page) => page.fileData.slug === "index",
    }),
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
        // Nascondi la cartella "assets", "private" e tutto ciò che inizia con "_"
         const omit = new Set(["assets"])
         return !omit.has(node.name) && !node.name.startsWith("_")
       },
    }),
  ],

 right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
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
        // Nascondi la cartella "assets", "private" e tutto ciò che inizia con "_"
        const omit = new Set(["assets"])
        return !omit.has(node.name) && !node.name.startsWith("_")
      },
    }),
  ],
  right: [],
}