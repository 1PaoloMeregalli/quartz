import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
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
      condition: (page) => page.fileData.slug !== "index",
    }),
    
    // Titolo, Meta e Tag (sempre visibili)
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),

    // Grafico Grande: VISIBILE SOLO IN HOME
    Component.ConditionalRender({
      component: Component.Graph({
        localGraph: false, // false = mostra tutto il sito (effetto galassia)
        globalGraph: true, // Profondità infinita
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
  ],

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
    Component.Explorer(),
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
    Component.Explorer(),
  ],
  right: [],
}

// AGGIUNTO ORA: Questo serve per far apparire la lista dopo il testo
  pageBody: [
    Component.Content(), // Il testo del tuo articolo
    
    // Lista articoli recenti (Solo in Home Page)
    Component.ConditionalRender({
      component: Component.RecentNotes({ 
        title: "Ultimi Aggiornamenti", 
        limit: 5 
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
  ],
