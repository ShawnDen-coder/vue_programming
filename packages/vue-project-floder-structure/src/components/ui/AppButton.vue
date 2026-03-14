<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    href?: string
    to?: RouteLocationRaw
    variant?: 'primary' | 'secondary'
  }>(),
  {
    variant: 'primary',
  },
)

const componentTag = computed(() => {
  if (props.to) {
    return RouterLink
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})

const componentProps = computed(() => {
  if (props.to) {
    return { to: props.to }
  }

  if (props.href) {
    return {
      href: props.href,
      target: '_blank',
      rel: 'noreferrer',
    }
  }

  return { type: 'button' }
})
</script>

<template>
  <component :is="componentTag" class="app-button" :class="`is-${variant}`" v-bind="componentProps">
    <slot />
  </component>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;
  padding: 0.85rem 1.2rem;
  border-radius: 999px;
  border: 1px solid transparent;
  text-decoration: none;
  font-weight: 700;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease;
}

.app-button:hover {
  transform: translateY(-1px);
}

.app-button.is-primary {
  background: var(--brand);
  color: white;
}

.app-button.is-primary:hover {
  background: var(--brand-strong);
}

.app-button.is-secondary {
  border-color: var(--line);
  background: rgba(255, 255, 255, 0.72);
  color: var(--ink-strong);
}
</style>
