import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import SubstackFeed from "./quartz/components/SubstackFeed"
import { isFolderPath } from "./quartz/util/path"

const explorerOptions = {
  title: "Esplora",
  folderClickBehavior: "collapse" as const,
  folderDefaultState: "collapsed" as const,
  useSavedState: false,
  filterFn: (node: { name?: string; slug?: string; path?: string }) => {
    const name = node.name ?? ""
    const slug = node.slug ?? ""
    const path = node.path ?? ""

    if (name.startsWith("_") || slug.startsWith("_") || path.includes("/_")) {
      return false
    }

    return true
  },
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ConditionalRender({
      component: Component.RecentNotes({
        title: "Ultimi Aggiornamenti",
        limit: 5,
        showTags: true,
        filter: (f) => Boolean(f.frontmatter?.categories) && !isFolderPath(f.slug ?? ""),
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.ShareButtons(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  footer: Component.Footer({
    links: {
      Privacy: "/Privacy",
      SubStack: "https://paolomeregalli.substack.com/",
      LinkedIn: "https://www.linkedin.com/in/paolomeregalli/",
      Mail: "mailto:paolo.meregalli@gmail.com",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
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
    Component.Explorer(explorerOptions),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    SubstackFeed(),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
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
    Component.Explorer(explorerOptions),
  ],
  right: [],
}