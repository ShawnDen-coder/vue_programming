<script setup lang="ts">
import ArticleCard from '@/components/article/ArticleCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import type { ArticleItem } from '@/stores/article'

defineProps<{
  articles: ArticleItem[]
}>()
</script>

<template>
  <div v-if="articles.length" class="article-list grid">
    <ArticleCard v-for="article in articles" :key="article.slug" :article="article" />
  </div>
  <EmptyState
    v-else
    title="No articles available"
    description="The domain-specific article list stays reusable and handles empty results in one place."
  />
</template>

<style scoped>
.article-list {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>
