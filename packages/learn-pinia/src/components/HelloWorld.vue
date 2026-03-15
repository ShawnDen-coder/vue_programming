<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()
const { counter, name, doubleCount, userList, currentUser, userCount, loading, errorMessage } =
  storeToRefs(counterStore)
const { increment, fetchUsers, resetState } = counterStore

// 演示 $patch：一次性更新多个字段
function applyProfile() {
  counterStore.$patch({
    name: 'Pinia Learner',
    counter: counter.value + 5,
  })
}

onMounted(() => {
  void fetchUsers()
})
</script>

<template>
  <section id="center">
    <p>Name: {{ name }}</p>
    <p>Count: {{ counter }}</p>
    <p>Double: {{ doubleCount }}</p>
    <p>User Count: {{ userCount }}</p>
    <p>Current User: {{ currentUser?.name ?? '暂无' }}</p>
    <p v-if="loading">正在加载用户...</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <ul>
      <li v-for="user in userList" :key="user.id">{{ user.name }} - {{ user.age }}</li>
    </ul>

    <button class="counter" @click="increment">+1</button>
    <button class="counter" @click="fetchUsers">重新加载用户</button>
    <button class="counter" @click="applyProfile">$patch 批量更新</button>
    <button class="counter" @click="resetState">重置状态</button>
  </section>
</template>
