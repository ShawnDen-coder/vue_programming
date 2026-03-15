import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface UserInfo {
  id: number
  name: string
  age: number
}

export const useCounterStore = defineStore('counter', () => {
  // 基础状态
  const counter = ref(0)
  const name = ref('Eduardo')

  // 常见工程状态：数据、加载态、错误态
  const userList = ref<UserInfo[]>([])
  const currentUser = ref<UserInfo | null>(null)
  const loading = ref(false)
  const errorMessage = ref('')

  // 派生状态
  const doubleCount = computed(() => counter.value * 2)
  const userCount = computed(() => userList.value.length)

  function increment() {
    counter.value++
  }

  async function fetchUsers() {
    loading.value = true
    errorMessage.value = ''

    try {
      // 用延时模拟接口请求
      await new Promise((resolve) => setTimeout(resolve, 600))
      userList.value = [
        { id: 1, name: 'Alice', age: 20 },
        { id: 2, name: 'Bob', age: 24 },
        { id: 3, name: 'Cindy', age: 22 },
      ]
      currentUser.value = userList.value[0] ?? null
    } catch {
      errorMessage.value = '获取用户列表失败，请稍后重试'
    } finally {
      loading.value = false
    }
  }

  function resetState() {
    counter.value = 0
    name.value = 'Eduardo'
    userList.value = []
    currentUser.value = null
    loading.value = false
    errorMessage.value = ''
  }

  return {
    // state：可被组件直接读写的状态
    counter,
    name,
    userList,
    currentUser,
    loading,
    errorMessage,

    // getters：由 state 派生出的只读值
    doubleCount,
    userCount,

    // actions：封装业务操作（同步/异步）
    increment,
    fetchUsers,
    resetState,
  }
})
