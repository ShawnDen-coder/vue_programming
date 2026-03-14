<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink, useRoute } from 'vue-router'

import { useArticleStore } from '@/stores/article'

const route = useRoute()
const articleStore = useArticleStore()
const { bookmarkedCount } = storeToRefs(articleStore)
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <RouterLink class="brand" to="/">
        <span class="brand__mark">V</span>
        <span>
          <strong>Vue Structure Lab</strong>
          <small>folder strategy with router + pinia</small>
        </span>
      </RouterLink>

      <nav class="site-nav" aria-label="Primary">
        <RouterLink :class="['site-nav__link', { 'is-active': route.name === 'home' }]" to="/">
          Home
        </RouterLink>
        <RouterLink
          :class="['site-nav__link', { 'is-active': route.name === 'article-detail' }]"
          :to="{ name: 'article-detail', params: { slug: 'pages-first-structure' } }"
        >
          Article Page
        </RouterLink>
      </nav>

      <p class="site-header__meta">Bookmarks {{ bookmarkedCount }}</p>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 1rem 0;
  backdrop-filter: blur(18px);
  background: rgba(248, 250, 252, 0.78);
  border-bottom: 1px solid rgba(219, 228, 240, 0.8);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  text-decoration: none;
  color: inherit;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  color: var(--ink-strong);
}

.brand small {
  color: var(--ink-soft);
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.9rem;
  background: linear-gradient(135deg, var(--brand), #14b8a6);
  color: white;
  font-weight: 800;
}

.site-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(219, 228, 240, 0.85);
}

.site-nav__link {
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  text-decoration: none;
  color: var(--ink-soft);
  font-weight: 700;
}

.site-nav__link.is-active {
  background: rgba(15, 118, 110, 0.12);
  color: var(--brand-strong);
}

.site-header__meta {
  margin: 0;
  font-size: 0.95rem;
  color: var(--ink-soft);
}

@media (max-width: 800px) {
  .site-header__inner {
    flex-wrap: wrap;
  }

  .site-nav {
    order: 3;
    width: 100%;
    justify-content: center;
  }
}
</style>
