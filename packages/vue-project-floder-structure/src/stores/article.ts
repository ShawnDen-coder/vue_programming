import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export interface ArticleItem {
  slug: string
  title: string
  summary: string
  folder: 'src' | 'components' | 'pages' | 'router' | 'stores'
  level: '核心目录' | '组织方式' | '基础设施'
  minutes: number
  updatedAt: string
  path: string
  highlights: string[]
}

export interface FolderTreeItem {
  name: string
  path: string
  description: string
  summary?: string
  highlights?: string[]
  children?: FolderTreeItem[]
}

const seedArticles: ArticleItem[] = [
  {
    slug: 'src-root-overview',
    title: 'src 目录总览',
    summary: 'src 是业务源码主目录，页面、组件、路由和状态都从这里展开。',
    folder: 'src',
    level: '核心目录',
    minutes: 4,
    updatedAt: '2026-03-14',
    path: 'src/',
    highlights: [
      '作为源码入口目录统一组织前端代码',
      '避免页面、路由、状态散落在根目录',
      '适合作为 folder tree 的根节点来看全局结构',
    ],
  },
  {
    slug: 'components-layer-guide',
    title: 'components 分层说明',
    summary: 'components 目录继续按职责拆分为 ui、layout、article、common，避免所有组件堆在一起。',
    folder: 'components',
    level: '组织方式',
    minutes: 5,
    updatedAt: '2026-03-12',
    path: 'src/components/',
    highlights: [
      'ui 放纯展示和高复用组件',
      'layout 放头部、底部等应用骨架',
      'article 代表文章页这一业务域组件',
      'common 放难以归类但可共享的组件',
    ],
  },
  {
    slug: 'pages-layer-guide',
    title: 'pages 页面目录说明',
    summary: 'pages 存放路由页面和只属于某个页面的私有组件，方便按页面就近维护。',
    folder: 'pages',
    level: '组织方式',
    minutes: 4,
    updatedAt: '2026-03-10',
    path: 'src/pages/',
    highlights: [
      'HomePage 负责首页展示目录树',
      'ArticlePage 负责详情页简化说明',
      '页面私有组件与页面入口放在同一目录中',
    ],
  },
  {
    slug: 'router-guide',
    title: 'router 路由入口说明',
    summary: 'router 目录集中管理页面入口、路径映射和滚动行为等路由配置。',
    folder: 'router',
    level: '基础设施',
    minutes: 3,
    updatedAt: '2026-03-08',
    path: 'src/router/',
    highlights: [
      '统一管理页面访问入口',
      '配合 pages 目录形成清晰的页面路由关系',
      '避免在页面文件中分散写路由配置',
    ],
  },
  {
    slug: 'stores-guide',
    title: 'stores 状态管理说明',
    summary: 'stores 目录承载 Pinia store，用来管理跨页面共享的数据和行为。',
    folder: 'stores',
    level: '基础设施',
    minutes: 3,
    updatedAt: '2026-03-06',
    path: 'src/stores/',
    highlights: [
      '适合保存共享状态而不是页面局部状态',
      '把数据结构、派生状态、操作方法放在一起',
      '当前示例就用它维护目录说明和收藏状态',
    ],
  },
]

const seedFolderTree: FolderTreeItem[] = [
  {
    name: 'src',
    path: 'src/',
    description: '项目源码根目录，所有业务代码从这里继续分层。',
    summary:
      '这里是整个前端项目的业务入口。你在页面里看到的大多数代码，都会从这个目录继续往下分层。',
    highlights: [
      '统一承载业务源码',
      '页面、组件、路由、状态都从这里拆开',
      '适合作为阅读项目结构时的起点',
    ],
    children: [
      {
        name: 'components',
        path: 'src/components/',
        description: '可复用组件目录，按职责拆成多个子目录。',
        summary: 'components 目录只放“可复用组件”，然后继续按职责细分，避免所有组件都堆在同一层。',
        highlights: [
          'ui 放纯展示组件',
          'layout 放骨架组件',
          'article 放业务域组件',
          'common 放共享但难归类的组件',
        ],
        children: [
          {
            name: 'ui',
            path: 'src/components/ui/',
            description: '按钮、卡片等偏展示型、可复用组件。',
            summary: '这里放通用 UI 组件，尽量通过 props 和 slots 复用，不耦合具体业务。',
            highlights: ['适合 Button、Card 这类组件', '不要写页面专属逻辑', '复用范围通常最大'],
          },
          {
            name: 'layout',
            path: 'src/components/layout/',
            description: 'Header、Footer 这类应用壳层组件。',
            summary: 'layout 负责应用骨架，比如头部、底部、导航等壳层内容。',
            highlights: ['关注结构而不是业务', '通常由 App.vue 统一挂载', '适合放全局导航和页脚'],
          },
          {
            name: 'article',
            path: 'src/components/article/',
            description: '只服务于目录说明页面这一业务域的组件。',
            summary: '这是业务域组件目录。它能复用，但复用范围只在某个业务域内，不适合提升到 ui。',
            highlights: [
              '比 ui 更贴近业务',
              '适合列表、卡片、详情块等业务组件',
              '能减少组件命名含糊的问题',
            ],
          },
          {
            name: 'common',
            path: 'src/components/common/',
            description: '不适合放进 ui 或 layout 的共享组件。',
            summary: 'common 用来放那些确实能共享，但又不属于纯 UI 或布局骨架的组件。',
            highlights: [
              '用于补充 ui 和 layout 的边界',
              '常见于空状态、提示块、结构化说明组件',
              '要避免把 common 变成新的大杂烩',
            ],
          },
        ],
      },
      {
        name: 'pages',
        path: 'src/pages/',
        description: '路由页面目录，页面私有组件和入口文件就近放置。',
        summary: 'pages 目录按页面拆分，每个页面目录里可以继续放该页面专属组件，减少跨目录跳转。',
        highlights: [
          '页面入口和页面私有组件放在一起',
          '更利于按功能定位代码',
          '适合中大型项目继续扩展',
        ],
        children: [
          {
            name: 'HomePage',
            path: 'src/pages/HomePage/',
            description: '首页，只展示目录树和简要引导。',
            summary: '这个目录承载当前项目的首页，重点是把项目目录树展示出来，并配套说明面板。',
            highlights: [
              '左侧展示目录树',
              '右侧展示当前选中目录的功能解释',
              '页面本身只做结构引导',
            ],
          },
          {
            name: 'ArticlePage',
            path: 'src/pages/ArticlePage/',
            description: '详情页，简化介绍单个目录的职责。',
            summary: '详情页只保留简化版目录介绍，不再重复首页的大段说明。',
            highlights: [
              '只展示当前目录说明',
              '继续保留页面私有组件 colocate 思路',
              '适合补充少量延伸信息',
            ],
          },
        ],
      },
      {
        name: 'router',
        path: 'src/router/',
        description: 'Vue Router 配置入口。',
        summary: 'router 目录集中存放路由配置，让页面入口关系更清晰。',
        highlights: [
          '管理 path 和 component 的映射',
          '可以统一设置滚动行为',
          '避免在页面文件内分散路由配置',
        ],
      },
      {
        name: 'stores',
        path: 'src/stores/',
        description: 'Pinia store 所在目录。',
        summary: 'stores 目录集中管理共享状态，让数据结构、派生状态和操作方法收口。',
        highlights: [
          '放跨页面共享状态',
          '适合封装 actions 和 getters',
          '当前示例就用它维护目录树说明数据',
        ],
      },
    ],
  },
]

export const useArticleStore = defineStore('article', () => {
  const articles = ref<ArticleItem[]>(seedArticles)
  const bookmarkedSlugs = ref<string[]>(['components-layer-guide'])

  const featuredArticle = computed(() => articles.value[0])
  const latestArticles = computed(() => articles.value.slice(0, 3))
  const bookmarkedCount = computed(() => bookmarkedSlugs.value.length)
  const folderTree = computed(() => seedFolderTree)

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
    folderTree,
    latestArticles,
    findBySlug,
    toggleBookmark,
  }
})
