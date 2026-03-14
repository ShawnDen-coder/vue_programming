<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import EmptyState from '@/components/common/EmptyState.vue'
import ArticleTitle from '@/pages/ArticlePage/ArticleTitle.vue'
import LastArticlesSection from '@/pages/ArticlePage/LastArticlesSection.vue'
import { useArticleStore } from '@/stores/article'

const route = useRoute()
const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)

const article = computed(() => articleStore.findBySlug(String(route.params.slug ?? '')))
const relatedArticles = computed(() =>
  articles.value.filter((entry) => entry.slug !== article.value?.slug),
)
</script>

<template>
  <section class="container grid gap-6 py-12 max-[840px]:pt-8">
    <template v-if="article">
      <ArticleTitle :article="article" />

      <LastArticlesSection :articles="relatedArticles" />

      <div class="grid gap-4 rounded-md border border-line bg-white/84 p-card shadow-soft">
        <div class="grid gap-4">
          <p>
            当前目录：<code>{{ article.path }}</code>
          </p>
          <ul class="m-0 pl-note text-ink-soft">
            <li v-for="highlight in article.highlights" :key="highlight">{{ highlight }}</li>
          </ul>
        </div>
      </div>
    </template>

    <EmptyState
      v-else
      title="未找到对应目录"
      description="当前路由存在，但 store 里没有匹配到对应的目录说明。"
    />
  </section>
</template>
