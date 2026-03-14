<script setup lang="ts">
import AppCard from '@/components/ui/AppCard.vue'

defineProps<{
  items: Array<{
    folder: string
    count: number
  }>
}>()
</script>

<template>
  <section class="structure-highlights container">
    <div class="structure-highlights__heading">
      <p class="eyebrow">Folder groups</p>
      <h2>Separate by responsibility, not by file type alone</h2>
      <p class="section-lead">
        The article's core point is practical: route screens belong to pages, business widgets belong to their domain, and shared visual primitives stay generic.
      </p>
    </div>

    <div class="grid structure-highlights__grid">
      <AppCard v-for="item in items" :key="item.folder">
        <div class="structure-highlights__item">
          <p class="chip">{{ item.folder }}</p>
          <strong>{{ item.count }} example{{ item.count === 1 ? '' : 's' }}</strong>
          <p>Keep imports clear and remove redundant prefixes when the folder already provides context.</p>
        </div>
      </AppCard>
    </div>
  </section>
</template>

<style scoped>
.structure-highlights {
  padding: 1rem 0 2rem;
}

.structure-highlights__heading {
  display: grid;
  gap: 0.8rem;
  margin-bottom: 1.4rem;
}

.structure-highlights__heading h2,
.structure-highlights__heading p {
  margin: 0;
}

.structure-highlights__heading h2 {
  color: var(--ink-strong);
  font-size: clamp(1.6rem, 3vw, 2.3rem);
}

.structure-highlights__grid {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.structure-highlights__item {
  display: grid;
  gap: 0.8rem;
}

.structure-highlights__item strong {
  color: var(--ink-strong);
}

.structure-highlights__item p {
  margin: 0;
  color: var(--ink-soft);
}
</style>
