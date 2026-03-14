<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import ContentNote from '@/components/common/ContentNote.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import ArticleTitle from '@/pages/ArticlePage/ArticleTitle.vue'
import LastArticlesSection from '@/pages/ArticlePage/LastArticlesSection.vue'
import { useArticleStore } from '@/stores/article'

const route = useRoute()
const articleStore = useArticleStore()
const { latestArticles } = storeToRefs(articleStore)

const article = computed(() => articleStore.findBySlug(String(route.params.slug ?? '')))
const relatedArticles = computed(() =>
  latestArticles.value.filter((entry) => entry.slug !== article.value?.slug),
)
</script>

<template>
  <section class="article-page container">
    <template v-if="article">
      <ArticleTitle :article="article" />

      <div class="article-page__body">
        <div class="article-page__content">
          <ContentNote
            title="How to read this example"
            description="The components in this folder exist only for the article detail route, which is why they stay next to the page entry instead of moving into the global components directory."
          />

          <div class="article-page__prose">
            <p>
              The article's recommendation is simple but important: start by identifying route-level screens, then colocate components that only that screen uses.
            </p>
            <p>
              Generic pieces like buttons or cards move into <code>components/ui</code>. App shell pieces such as header and footer belong in <code>components/layout</code>.
            </p>
            <p>
              Business-specific widgets, such as article lists and cards, stay in a domain folder because they are reusable inside that business area but not across the whole application.
            </p>
          </div>
        </div>

        <aside class="article-page__sidebar">
          <div class="article-page__sidebar-card">
            <p class="eyebrow">Folder takeaway</p>
            <ul>
              <li>Pages contain route entry files and page-private pieces.</li>
              <li>UI stays generic and prop-driven.</li>
              <li>Layout keeps shell concerns out of business features.</li>
              <li>Domain folders remove vague component naming.</li>
            </ul>
          </div>
        </aside>
      </div>

      <LastArticlesSection :articles="relatedArticles" />
    </template>

    <EmptyState
      v-else
      title="Article not found"
      description="The route exists, but the store does not have a matching article slug."
    />
  </section>
</template>

<style scoped>
.article-page {
  display: grid;
  gap: 1.5rem;
  padding: 3rem 0;
}

.article-page__body {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(260px, 0.8fr);
  gap: 1.5rem;
}

.article-page__content,
.article-page__sidebar-card {
  padding: 1.6rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(219, 228, 240, 0.9);
  background: rgba(255, 255, 255, 0.84);
  box-shadow: var(--shadow);
}

.article-page__content {
  display: grid;
  gap: 1rem;
}

.article-page__prose {
  display: grid;
  gap: 1rem;
}

.article-page__prose p,
.article-page__sidebar-card p,
.article-page__sidebar-card ul {
  margin: 0;
}

.article-page__prose p,
.article-page__sidebar-card ul {
  color: var(--ink-soft);
}

.article-page__sidebar-card ul {
  padding-left: 1.1rem;
}

.article-page__sidebar-card {
  display: grid;
  gap: 0.8rem;
}

@media (max-width: 840px) {
  .article-page {
    padding-top: 2rem;
  }

  .article-page__body {
    grid-template-columns: 1fr;
  }
}
</style>
