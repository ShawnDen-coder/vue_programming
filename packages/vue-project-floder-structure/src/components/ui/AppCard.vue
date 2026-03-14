<template>
  <section class="app-card">
    <slot />
  </section>
</template>

<style scoped>
.app-card {
  padding: 1.5rem;
  border: 1px solid rgba(219, 228, 240, 0.9);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
}
</style>
