<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

async function handleLogout() {
  localStorage.removeItem('demo-token')
  await router.replace({ name: 'login' })
}
</script>

<template>
  <section class="page">
    <h1>控制台</h1>
    <p>该页面设置了 <code>meta.requiresAuth</code>，未登录无法访问。</p>
    <button type="button" @click="handleLogout">退出登录</button>
  </section>
</template>
