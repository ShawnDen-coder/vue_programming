<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="empty-state">
    <p class="empty-state__title">{{ title }}</p>
    <p class="empty-state__description">{{ description }}</p>
  </div>
</template>

<style scoped>
.empty-state {
  padding: 1.5rem;
  border: 1px dashed var(--line);
  border-radius: var(--radius-md);
  text-align: center;
  background: rgba(255, 255, 255, 0.65);
}

.empty-state__title,
.empty-state__description {
  margin: 0;
}

.empty-state__title {
  font-weight: 700;
  color: var(--ink-strong);
}

.empty-state__description {
  margin-top: 0.4rem;
  color: var(--ink-soft);
}
</style>
