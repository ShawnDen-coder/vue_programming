<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <aside class="content-note">
    <p class="content-note__title">{{ title }}</p>
    <p class="content-note__description">{{ description }}</p>
  </aside>
</template>

<style scoped>
.content-note {
  padding: 1rem 1.1rem;
  border-left: 4px solid var(--accent);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  background: rgba(245, 158, 11, 0.12);
}

.content-note__title,
.content-note__description {
  margin: 0;
}

.content-note__title {
  font-weight: 700;
  color: var(--ink-strong);
}

.content-note__description {
  margin-top: 0.3rem;
  color: var(--ink-soft);
}
</style>
