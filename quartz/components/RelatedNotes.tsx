import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative, isFolderPath } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import style from "./styles/recentNotes.scss"
import { Date, getDate } from "./Date"
import { classNames } from "../util/lang"

interface Options {
  title?: string
}

const defaultOptions: Options = {
  title: "Un altro seme",
}

function isRealPost(f: QuartzPluginData): boolean {
  return Boolean(f.frontmatter?.categories) && !isFolderPath(f.slug ?? "")
}

interface RelatedItem {
  page: QuartzPluginData
  label: string
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const RelatedNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const currentTags = (fileData.frontmatter?.tags ?? []) as string[]
    const currentCategories = (fileData.frontmatter?.categories ?? []) as string[]
    const currentCategory = currentCategories[0]

    const candidates = allFiles.filter((f) => isRealPost(f) && f.slug !== fileData.slug)

    // 1) Post che condivide più tag in comune, a parità il più recente
    let tagMatch: QuartzPluginData | undefined
    if (currentTags.length > 0) {
      let bestOverlap = 0
      for (const f of candidates) {
        const tags = (f.frontmatter?.tags ?? []) as string[]
        const overlap = tags.filter((t) => currentTags.includes(t)).length
        if (overlap === 0) continue
        const isBetter =
          overlap > bestOverlap ||
          (overlap === bestOverlap &&
            tagMatch !== undefined &&
            getDate(cfg, f)!.getTime() > getDate(cfg, tagMatch)!.getTime())
        if (isBetter) {
          bestOverlap = overlap
          tagMatch = f
        }
      }
    }

    // 2) Post più recente della stessa categoria, diverso da quello già scelto per il tag
    let categoryMatch: QuartzPluginData | undefined
    if (currentCategory) {
      for (const f of candidates) {
        if (f === tagMatch) continue
        const cats = (f.frontmatter?.categories ?? []) as string[]
        if (!cats.includes(currentCategory)) continue
        if (!categoryMatch || getDate(cfg, f)!.getTime() > getDate(cfg, categoryMatch)!.getTime()) {
          categoryMatch = f
        }
      }
    }

    const items: RelatedItem[] = []
    if (tagMatch) {
      const sharedTag = ((tagMatch.frontmatter?.tags ?? []) as string[]).find((t) =>
        currentTags.includes(t),
      )
      items.push({ page: tagMatch, label: `Stesso tag: #${sharedTag}` })
    }
    if (categoryMatch) {
      items.push({ page: categoryMatch, label: `Stessa categoria: ${currentCategory}` })
    }

    if (items.length === 0) {
      return null
    }

    return (
      <div class={classNames(displayClass, "recent-notes", "related-notes")}>
        <h3>{opts.title}</h3>
        <ul class="recent-ul">
          {items.map(({ page, label }) => {
            const title = page.frontmatter?.title ?? page.slug
            const tags = (page.frontmatter?.tags ?? []) as string[]
            const description = page.frontmatter?.description as string | undefined

            return (
              <li class="recent-li">
                <div class="section">
                  <div class="desc">
                    <p class="related-label">{label}</p>
                    <h3>
                      <a
                        href={resolveRelative(fileData.slug!, page.slug!)}
                        class="internal stretched-link"
                      >
                        {title}
                      </a>
                    </h3>
                    {description && <p class="excerpt">{description}</p>}
                  </div>
                  {page.dates && (
                    <p class="meta">
                      <Date date={getDate(cfg, page)!} locale={cfg.locale} />
                    </p>
                  )}
                  {tags.length > 0 && (
                    <ul class="tags">
                      {tags.map((tag) => (
                        <li>
                          <a
                            class="internal tag-link"
                            href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  RelatedNotes.css = style
  return RelatedNotes
}) satisfies QuartzComponentConstructor
