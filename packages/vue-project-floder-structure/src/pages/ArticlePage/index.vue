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
  <section class="article-page container">
    <template v-if="article">
      <ArticleTitle :article="article" />

      <LastArticlesSection :articles="relatedArticles" />

      <div class="article-page__content">
        <div class="article-page__prose">
          <p>
            当前目录：<code>{{ article.path }}</code>
          </p>
          <ul>
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

<style scoped>
.article-page {
  display: grid;
  gap: 1.5rem;
  padding: 3rem 0;
}

.article-page__content {
  padding: 1.6rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(219, 228, 240, 0.9);
  background: rgba(255, 255, 255, 0.84);
  box-shadow: var(--shadow);
}

.article-page__content {
  display: grid;
  gap: 1rem;
}

.article-page__prose {
  display: grid;
  gap: 1rem;
}

.article-page__prose p,
.article-page__sidebar-card p,
.article-page__sidebar-card ul,
.article-page__prose ul {
  margin: 0;
}

.article-page__prose p,
.article-page__sidebar-card ul,
.article-page__prose ul {
  color: var(--ink-soft);
}

.article-page__prose ul,
.article-page__sidebar-card ul {
  padding-left: 1.1rem;
}

@media (max-width: 840px) {
  .article-page {
    padding-top: 2rem;
  }
}
</style>
