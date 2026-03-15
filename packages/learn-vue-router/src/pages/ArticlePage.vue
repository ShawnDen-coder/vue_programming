<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

const props = defineProps<{
  slug: string
}>()

const lastLoadedSlug = shallowRef('')

const articleSummary = computed(() => ({
  title: props.slug.replaceAll('-', ' '),
  note: '参数路由建议配合 props: true，降低页面对 useRoute 的耦合。',
}))

watch(
  () => props.slug,
  (slug) => {
    // 用 watch + immediate 统一处理首次进入和参数切换。
    lastLoadedSlug.value = slug
  },
  { immediate: true },
)

onBeforeRouteUpdate((to, from) => {
  // 同一路由切换参数时，beforeEnter 不会触发，这里可放补充逻辑。
  if (to.params.slug !== from.params.slug) {
    console.info('[ArticlePage] slug changed:', from.params.slug, '->', to.params.slug)
  }
})
</script>

<template>
  <section class="page">
    <h1>文章详情：{{ articleSummary.title }}</h1>
    <p>{{ articleSummary.note }}</p>
    <p>最近一次加载参数：{{ lastLoadedSlug }}</p>
    <RouterLink to="/">返回首页</RouterLink>
  </section>
</template>
