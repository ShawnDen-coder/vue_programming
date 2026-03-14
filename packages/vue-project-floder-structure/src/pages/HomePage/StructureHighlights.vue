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
  <section class="container py-4 pb-8">
    <div class="mb-panel grid gap-3">
      <p class="eyebrow">Folder Tree</p>
      <h2>按目录层级理解，而不是只看文件名</h2>
      <p class="section-lead">
        下面这棵目录树就是这个示例项目的核心说明。每一层都附了职责描述，首页只保留这种结构化介绍，不再堆叠过多页面文案。
      </p>
    </div>

    <div class="grid items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
      <div class="rounded-lg border border-line bg-white/72 p-panel shadow-soft">
        <FolderTree :items="items" :active-path="selectedPath" @select="handleSelect" />
      </div>

      <aside
        v-if="activeItem"
        class="grid gap-4 rounded-lg border border-line bg-white/72 p-panel shadow-soft lg:sticky lg:top-23"
      >
        <p class="chip">当前选中</p>
        <h3 class="m-0 text-2xl text-ink-strong">{{ activeItem.name }}</h3>
        <p class="m-0 font-bold text-brand-strong">{{ activeItem.path }}</p>
        <p class="m-0 text-ink-soft">
          {{ activeItem.summary ?? activeItem.description }}
        </p>

        <ul v-if="activeItem.highlights?.length" class="m-0 pl-note text-ink-soft">
          <li v-for="highlight in activeItem.highlights" :key="highlight">
            {{ highlight }}
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>
