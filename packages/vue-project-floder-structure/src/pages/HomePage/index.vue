<script setup lang="ts">
import { storeToRefs } from 'pinia'

import ArticleList from '@/components/article/List.vue'
import ContentNote from '@/components/common/ContentNote.vue'
import HeroSection from '@/pages/HomePage/HeroSection.vue'
import StructureHighlights from '@/pages/HomePage/StructureHighlights.vue'
import { useArticleStore } from '@/stores/article'

const articleStore = useArticleStore()
const { articles, featuredArticle, folderStats } = storeToRefs(articleStore)
</script>

<template>
  <div class="home-page">
    <HeroSection :featured-article="featuredArticle" />

    <section class="container home-page__note">
      <ContentNote
        title="Why this structure works"
        description="The layout is discoverable because route-level code is grouped under pages and reusable business widgets are isolated under the article domain."
      />
    </section>

    <StructureHighlights :items="folderStats" />

    <section class="container home-page__articles">
      <div class="home-page__heading">
        <p class="eyebrow">Domain example</p>
        <h2>Article components live under components/article</h2>
        <p class="section-lead">
          This list is domain-specific. It is reusable across pages, but only inside the article domain, which is exactly what the article recommends.
        </p>
      </div>
      <ArticleList :articles="articles" />
    </section>
  </div>
</template>

<style scoped>
.home-page {
  display: grid;
  gap: 1.5rem;
  padding-bottom: 3rem;
}

.home-page__note,
.home-page__articles {
  display: grid;
  gap: 1rem;
}

.home-page__heading {
  display: grid;
  gap: 0.8rem;
}

.home-page__heading h2,
.home-page__heading p {
  margin: 0;
}

.home-page__heading h2 {
  color: var(--ink-strong);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
}
</style>
