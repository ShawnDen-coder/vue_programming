<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const redirectTarget = computed(() => {
  const raw = route.query.redirect
  return typeof raw === 'string' && raw.length > 0 ? raw : '/dashboard'
})

async function handleLogin() {
  localStorage.setItem('demo-token', 'logged-in')
  await router.replace(redirectTarget.value)
}
</script>

<template>
  <section class="page">
    <h1>登录页</h1>
    <p>用于演示 guestOnly + requiresAuth 路由守卫。</p>
    <button type="button" @click="handleLogin">模拟登录</button>
  </section>
</template>
