<script setup lang="ts">
import { computed, ref } from 'vue'

import FolderTree from '@/components/common/FolderTree.vue'
import type { FolderTreeItem } from '@/stores/article'

const props = defineProps<{
  items: FolderTreeItem[]
}>()

function flattenTree(items: FolderTreeItem[]): FolderTreeItem[] {
  return items.flatMap((item) => [item, ...(item.children ? flattenTree(item.children) : [])])
}

const flatItems = computed(() => flattenTree(props.items))
const selectedPath = ref(props.items[0]?.path ?? '')
const activeItem = computed(
  () => flatItems.value.find((item) => item.path === selectedPath.value) ?? flatItems.value[0],
)

function handleSelect(item: FolderTreeItem) {
  selectedPath.value = item.path
}
</script>

<template>
  <section class="structure-highlights container">
    <div class="structure-highlights__heading">
      <p class="eyebrow">Folder Tree</p>
      <h2>按目录层级理解，而不是只看文件名</h2>
      <p class="section-lead">
        下面这棵目录树就是这个示例项目的核心说明。每一层都附了职责描述，首页只保留这种结构化介绍，不再堆叠过多页面文案。
      </p>
    </div>

    <div class="structure-highlights__content">
      <div class="structure-highlights__tree">
        <FolderTree :items="items" :active-path="selectedPath" @select="handleSelect" />
      </div>

      <aside v-if="activeItem" class="structure-highlights__detail">
        <p class="chip">当前选中</p>
        <h3>{{ activeItem.name }}</h3>
        <p class="structure-highlights__path">{{ activeItem.path }}</p>
        <p class="structure-highlights__summary">
          {{ activeItem.summary ?? activeItem.description }}
        </p>

        <ul v-if="activeItem.highlights?.length" class="structure-highlights__list">
          <li v-for="highlight in activeItem.highlights" :key="highlight">
            {{ highlight }}
          </li>
        </ul>
      </aside>
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

.structure-highlights__content {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
  gap: 1.5rem;
  align-items: start;
}

.structure-highlights__tree,
.structure-highlights__detail {
  padding: 1.4rem;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(219, 228, 240, 0.9);
  background: rgba(255, 255, 255, 0.72);
  box-shadow: var(--shadow);
}

.structure-highlights__detail h3,
.structure-highlights__detail p,
.structure-highlights__list {
  margin: 0;
}

.structure-highlights__detail {
  display: grid;
  gap: 1rem;
  position: sticky;
  top: 92px;
}

.structure-highlights__detail h3 {
  color: var(--ink-strong);
  font-size: 1.5rem;
}

.structure-highlights__path {
  color: var(--brand-strong);
  font-weight: 700;
}

.structure-highlights__summary,
.structure-highlights__list {
  color: var(--ink-soft);
}

.structure-highlights__list {
  padding-left: 1.1rem;
}

@media (max-width: 920px) {
  .structure-highlights__content {
    grid-template-columns: 1fr;
  }

  .structure-highlights__detail {
    position: static;
  }
}
</style>
