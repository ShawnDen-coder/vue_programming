<script setup lang="ts">
import type { FolderTreeItem } from '@/stores/article'

const props = withDefaults(
  defineProps<{
    items: FolderTreeItem[]
    level?: number
    activePath?: string
  }>(),
  {
    level: 0,
    activePath: '',
  },
)

const emit = defineEmits<{
  select: [item: FolderTreeItem]
}>()

function handleSelect(item: FolderTreeItem) {
  emit('select', item)
}
</script>

<template>
  <ul class="folder-tree">
    <li v-for="item in items" :key="item.path" class="folder-tree__item">
      <button
        type="button"
        class="folder-tree__row"
        :class="{ 'is-active': item.path === activePath }"
        :style="{ '--level': String(level) }"
        @click="handleSelect(item)"
      >
        <div class="folder-tree__title-wrap">
          <span class="folder-tree__name">{{ item.name }}</span>
          <code>{{ item.path }}</code>
        </div>
        <p class="folder-tree__description">{{ item.description }}</p>
      </button>

      <FolderTree
        v-if="item.children?.length"
        :items="item.children"
        :level="level + 1"
        :active-path="activePath"
        @select="handleSelect"
      />
    </li>
  </ul>
</template>

<style scoped>
.folder-tree {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.9rem;
}

.folder-tree__item {
  display: grid;
  gap: 0.9rem;
}

.folder-tree__row {
  width: 100%;
  text-align: left;
  padding: 1rem 1.1rem;
  padding-left: calc(1rem + var(--level) * 1.25rem);
  border-radius: var(--radius-md);
  border: 1px solid rgba(219, 228, 240, 0.9);
  background: rgba(255, 255, 255, 0.82);
  box-shadow: var(--shadow);
  cursor: pointer;
}

.folder-tree__row.is-active {
  border-color: rgba(15, 118, 110, 0.55);
  background: rgba(15, 118, 110, 0.1);
}

.folder-tree__title-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
}

.folder-tree__name {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ink-strong);
}

.folder-tree__description {
  margin: 0.75rem 0 0;
  color: var(--ink-soft);
}
</style>
