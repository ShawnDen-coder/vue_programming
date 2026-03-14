<script setup lang="ts">
import ArticleList from '@/components/article/List.vue'
import type { ArticleItem } from '@/stores/article'

defineProps<{
  articles: ArticleItem[]
}>()
</script>

<template>
  <section class="last-articles-section">
    <div class="last-articles-section__heading">
      <h2>切换目录</h2>
    </div>
    <ArticleList :articles="articles" />
  </section>
</template>

<style scoped>
.last-articles-section {
  display: grid;
  gap: 1rem;
}

.last-articles-section__heading {
  display: grid;
  gap: 0.4rem;
}

.last-articles-section__heading h2 {
  margin: 0;
}

.last-articles-section__heading h2 {
  color: var(--ink-strong);
  font-size: clamp(1.4rem, 3vw, 2rem);
}
</style>
