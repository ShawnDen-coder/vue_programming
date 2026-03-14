<script setup lang="ts">
import type { ArticleItem } from '@/stores/article'

defineProps<{
  article: ArticleItem
}>()
</script>

<template>
  <header class="article-title">
    <p class="eyebrow">目录说明页</p>
    <h1 class="section-title">{{ article.title }}</h1>
    <p class="section-lead">{{ article.summary }}</p>
    <div class="article-title__meta">
      <span class="chip">{{ article.path }}</span>
      <span>{{ article.level }}</span>
      <span>{{ article.minutes }} 分钟</span>
      <span>更新于 {{ article.updatedAt }}</span>
    </div>
  </header>
</template>

<style scoped>
.article-title {
  display: grid;
  gap: 1rem;
}

.article-title__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  color: var(--ink-soft);
}
</style>
