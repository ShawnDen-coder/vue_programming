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
      <p class="eyebrow">Related articles</p>
      <h2>Keep domain widgets reusable across pages</h2>
      <p class="section-lead">
        This section is page-specific, but it reuses the shared article list so domain behavior stays centralized.
      </p>
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
  gap: 0.8rem;
}

.last-articles-section__heading h2,
.last-articles-section__heading p {
  margin: 0;
}

.last-articles-section__heading h2 {
  color: var(--ink-strong);
  font-size: clamp(1.4rem, 3vw, 2rem);
}
</style>
