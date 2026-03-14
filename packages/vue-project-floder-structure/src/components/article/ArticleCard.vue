<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import AppCard from '@/components/ui/AppCard.vue'
import type { ArticleItem } from '@/stores/article'
import { useArticleStore } from '@/stores/article'

const props = defineProps<{
  article: ArticleItem
}>()

const articleStore = useArticleStore()
const { bookmarkedSlugs } = storeToRefs(articleStore)

const isBookmarked = computed(() => bookmarkedSlugs.value.includes(props.article.slug))
</script>

<template>
  <AppCard>
    <article class="article-card">
      <div class="article-card__top">
        <span class="chip">{{ article.folder }}</span>
        <button class="article-card__bookmark" type="button" @click="articleStore.toggleBookmark(article.slug)">
          {{ isBookmarked ? 'Saved' : 'Save' }}
        </button>
      </div>

      <h3 class="article-card__title">
        <RouterLink :to="{ name: 'article-detail', params: { slug: article.slug } }">
          {{ article.title }}
        </RouterLink>
      </h3>

      <p class="article-card__summary">{{ article.summary }}</p>

      <dl class="article-card__meta">
        <div>
          <dt>Level</dt>
          <dd>{{ article.level }}</dd>
        </div>
        <div>
          <dt>Read</dt>
          <dd>{{ article.minutes }} min</dd>
        </div>
      </dl>
    </article>
  </AppCard>
</template>

<style scoped>
.article-card {
  display: grid;
  gap: 1rem;
}

.article-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.article-card__bookmark {
  padding: 0.45rem 0.8rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--ink-soft);
  cursor: pointer;
}

.article-card__title {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.3;
  color: var(--ink-strong);
}

.article-card__title a {
  text-decoration: none;
}

.article-card__summary {
  margin: 0;
  color: var(--ink-soft);
}

.article-card__meta {
  display: flex;
  gap: 1rem;
  margin: 0;
}

.article-card__meta div {
  display: grid;
  gap: 0.12rem;
}

.article-card__meta dt {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-soft);
}

.article-card__meta dd {
  margin: 0;
  color: var(--ink-strong);
  font-weight: 700;
}
</style>
