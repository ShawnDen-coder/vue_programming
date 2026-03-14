<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink, useRoute } from 'vue-router'

import { useArticleStore } from '@/stores/article'

const route = useRoute()
const articleStore = useArticleStore()
const { bookmarkedCount } = storeToRefs(articleStore)
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-line/80 bg-slate-50/80 py-4 backdrop-blur-shell">
    <div class="container flex flex-wrap items-center justify-between gap-4">
      <RouterLink class="inline-flex items-center gap-4 text-inherit no-underline" to="/">
        <span
          class="grid h-10 w-10 place-items-center rounded-brand bg-linear-to-br from-brand to-teal-400 font-extrabold text-white"
          >V</span
        >
        <span>
          <strong class="block text-ink-strong">Vue 目录结构实验室</strong>
          <small class="block text-ink-soft">用 router 和 pinia 演示目录分层</small>
        </span>
      </RouterLink>

      <nav
        class="order-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-line/85 bg-white/75 p-1 sm:order-0 sm:w-auto"
        aria-label="Primary"
      >
        <RouterLink
          :class="[
            'rounded-full px-4 py-2 font-bold no-underline',
            route.name === 'home' ? 'bg-brand/10 text-brand-strong' : 'text-ink-soft',
          ]"
          to="/"
        >
          首页
        </RouterLink>
        <RouterLink
          :class="[
            'rounded-full px-4 py-2 font-bold no-underline',
            route.name === 'article-detail' ? 'bg-brand/10 text-brand-strong' : 'text-ink-soft',
          ]"
          :to="{ name: 'article-detail', params: { slug: 'src-root-overview' } }"
        >
          目录说明页
        </RouterLink>
      </nav>

      <p class="m-0 text-meta text-ink-soft">收藏 {{ bookmarkedCount }}</p>
    </div>
  </header>
</template>
