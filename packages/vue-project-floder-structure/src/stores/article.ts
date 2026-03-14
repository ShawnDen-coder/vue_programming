import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export interface ArticleItem {
  slug: string
  title: string
  summary: string
  folder: 'pages' | 'ui' | 'layout' | 'domain' | 'common'
  level: 'Foundational' | 'Scalable' | 'Advanced'
  minutes: number
  updatedAt: string
}

const seedArticles: ArticleItem[] = [
  {
    slug: 'pages-first-structure',
    title: 'Start with pages, then group private components nearby',
    summary:
      'Move route-level screens into pages and keep one-off components near the page that owns them.',
    folder: 'pages',
    level: 'Foundational',
    minutes: 6,
    updatedAt: '2026-03-14',
  },
  {
    slug: 'ui-components-contract',
    title: 'Keep ui components generic and driven by props',
    summary:
      'Buttons, cards, and other reusable building blocks should stay free of domain knowledge.',
    folder: 'ui',
    level: 'Foundational',
    minutes: 5,
    updatedAt: '2026-03-12',
  },
  {
    slug: 'domain-components-boundary',
    title: 'Create domain folders for business-specific building blocks',
    summary:
      'A component like article list belongs to the article domain, not to the global ui bucket.',
    folder: 'domain',
    level: 'Scalable',
    minutes: 8,
    updatedAt: '2026-03-10',
  },
  {
    slug: 'layout-and-common-split',
    title: 'Separate layout concerns from uncategorized shared helpers',
    summary:
      'Header and footer live in layout, while helpers that do not fit elsewhere move into common.',
    folder: 'layout',
    level: 'Advanced',
    minutes: 7,
    updatedAt: '2026-03-08',
  },
]

export const useArticleStore = defineStore('article', () => {
  const articles = ref<ArticleItem[]>(seedArticles)
  const bookmarkedSlugs = ref<string[]>(['domain-components-boundary'])

  const featuredArticle = computed(() => articles.value[0])
  const latestArticles = computed(() => articles.value.slice(0, 3))
  const bookmarkedCount = computed(() => bookmarkedSlugs.value.length)
  const folderStats = computed(() => {
    const labels: Record<ArticleItem['folder'], string> = {
      pages: 'pages',
      ui: 'ui',
      layout: 'layout',
      domain: 'article',
      common: 'common',
    }

    return Object.entries(
      articles.value.reduce<Record<ArticleItem['folder'], number>>(
        (accumulator, article) => {
          accumulator[article.folder] += 1
          return accumulator
        },
        {
          pages: 0,
          ui: 0,
          layout: 0,
          domain: 0,
          common: 0,
        },
      ),
    ).map(([folder, count]) => ({
      folder: labels[folder as ArticleItem['folder']],
      count,
    }))
  })

  function findBySlug(slug: string) {
    return articles.value.find((article) => article.slug === slug)
  }

  function toggleBookmark(slug: string) {
    if (bookmarkedSlugs.value.includes(slug)) {
      bookmarkedSlugs.value = bookmarkedSlugs.value.filter((item) => item !== slug)
      return
    }

    bookmarkedSlugs.value = [...bookmarkedSlugs.value, slug]
  }

  return {
    articles,
    bookmarkedCount,
    bookmarkedSlugs,
    featuredArticle,
    folderStats,
    latestArticles,
    findBySlug,
    toggleBookmark,
  }
})
