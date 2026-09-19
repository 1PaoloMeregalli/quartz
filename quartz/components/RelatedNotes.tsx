import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative, isFolderPath } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import style from "./styles/recentNotes.scss"
import { Date, getDate } from "./Date"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import readingTime from "reading-time"

interface Options {
  title?: string
  curatedTitle?: string
}

const defaultOptions: Options = {
  title: "Un altro seme",
  curatedTitle: "Vedi anche",
}

function isRealPost(f: QuartzPluginData): boolean {
  return Boolean(f.frontmatter?.categories) && !isFolderPath(f.slug ?? "")
}

interface RelatedItem {
  page: QuartzPluginData
  label: string
  matchType: "tag" | "category" | "curated"
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

    // 0) Collegamenti curati a mano, dal campo frontmatter "related"
    // Si scrive come lista di titoli esatti dei post collegati:
    //   related:
    //     - "Titolo del primo post"
    //     - "Titolo del secondo post"
    const relatedTitles = (fileData.frontmatter?.related ?? []) as string[]
    const curatedMatches: QuartzPluginData[] = []
    if (relatedTitles.length > 0) {
      for (const wanted of relatedTitles) {
        const cleaned = wanted.replace(/^\[\[|\]\]$/g, "").trim()
        const match = candidates.find(
          (f) => (f.frontmatter?.title ?? "").toString().trim() === cleaned,
        )
        if (match && !curatedMatches.includes(match)) {
          curatedMatches.push(match)
        }
      }
    }

    // 1) Post che condivide più tag in comune, a parità il più recente
    let tagMatch: QuartzPluginData | undefined
    if (currentTags.length > 0) {
      let bestOverlap = 0
      for (const f of candidates) {
        if (curatedMatches.includes(f)) continue
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
        if (f === tagMatch || curatedMatches.includes(f)) continue
        const cats = (f.frontmatter?.categories ?? []) as string[]
        if (!cats.includes(currentCategory)) continue
        if (!categoryMatch || getDate(cfg, f)!.getTime() > getDate(cfg, categoryMatch)!.getTime()) {
          categoryMatch = f
        }
      }
    }

    const curatedItems: RelatedItem[] = curatedMatches.map((page) => ({
      page,
      label: opts.curatedTitle!,
      matchType: "curated",
    }))

    const autoItems: RelatedItem[] = []
    if (tagMatch) {
      const sharedTag = ((tagMatch.frontmatter?.tags ?? []) as string[]).find((t) =>
        currentTags.includes(t),
      )
      autoItems.push({ page: tagMatch, label: `Stesso tag: #${sharedTag}`, matchType: "tag" })
    }
    if (categoryMatch) {
      autoItems.push({
        page: categoryMatch,
        label: `Stessa categoria: ${currentCategory}`,
        matchType: "category",
      })
    }

    if (curatedItems.length === 0 && autoItems.length === 0) {
      return null
    }

    const renderItems = (items: RelatedItem[]) => (
      <ul class="recent-ul">
        {items.map(({ page, label, matchType }) => {
          const title = page.frontmatter?.title ?? page.slug
          const tags = (page.frontmatter?.tags ?? []) as string[]
          const description = page.frontmatter?.description as string | undefined
          const pageDate = getDate(cfg, page)
          const { minutes } = readingTime(page.text ?? "")
          const readingTimeText = i18n(cfg.locale).components.contentMeta.readingTime({
            minutes: Math.ceil(minutes),
          })

          return (
            <li class={`recent-li match-${matchType}`}>
              <div class="section">
                <div class="desc">
                  <p class="card-eyebrow">{label}</p>
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
                <p class="meta">
                  {pageDate && (
                    <>
                      <Date date={pageDate} locale={cfg.locale} />
                      <span class="dot">·</span>
                    </>
                  )}
                  {readingTimeText}
                </p>
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
    )

    return (
      <div class={classNames(displayClass, "recent-notes", "related-notes")}>
        {curatedItems.length > 0 && (
          <>
            <h3>{opts.curatedTitle}</h3>
            {renderItems(curatedItems)}
          </>
        )}
        {autoItems.length > 0 && (
          <>
            <h3>{opts.title}</h3>
            {renderItems(autoItems)}
          </>
        )}
      </div>
    )
  }

  RelatedNotes.css = style
  return RelatedNotes
}) satisfies QuartzComponentConstructor
