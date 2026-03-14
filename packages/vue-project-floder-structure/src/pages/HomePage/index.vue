<script setup lang="ts">
import { storeToRefs } from 'pinia'

import StructureHighlights from '@/pages/HomePage/StructureHighlights.vue'
import { useArticleStore } from '@/stores/article'

const articleStore = useArticleStore()
const { folderTree } = storeToRefs(articleStore)
</script>

<template>
  <div class="home-page">
    <StructureHighlights :items="folderTree" />
  </div>
</template>

<style scoped>
.home-page {
  padding: 2rem 0 3rem;
}
</style>
