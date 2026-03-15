<script setup lang="ts">
const examples = [
  { label: '公开页面：文章 vue-router-best-practices', to: '/articles/vue-router-best-practices' },
  { label: '公开页面：文章 dynamic-route-param', to: '/articles/dynamic-route-param' },
  { label: '受保护页面：控制台（未登录会被拦截）', to: '/dashboard' },
]
</script>

<template>
  <section class="page">
    <h1>Vue Router 工程化示例</h1>
    <p>这个示例重点展示工程实践：路由分层、meta 驱动守卫、404、动态参数与参数更新处理。</p>

    <ul class="link-list">
      <li v-for="item in examples" :key="item.to">
        <RouterLink :to="item.to">{{ item.label }}</RouterLink>
      </li>
    </ul>
  </section>
</template>
