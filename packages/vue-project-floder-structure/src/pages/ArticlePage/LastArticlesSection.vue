<script setup lang="ts">
import ArticleList from '@/components/article/List.vue'
import type { ArticleItem } from '@/stores/article'

defineProps<{
  articles: ArticleItem[]
}>()
</script>

<template>
  <section class="grid gap-4">
    <div class="grid gap-1.5">
      <h2 class="m-0 text-[clamp(1.4rem,3vw,2rem)] text-ink-strong">切换目录</h2>
    </div>
    <ArticleList :articles="articles" />
  </section>
</template>
