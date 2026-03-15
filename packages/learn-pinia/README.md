# learn-pinia 实战笔记

本项目用于学习 Vue 3 + Pinia 的工程化常用写法。下面记录高频实践和固定套路，便于后续复用。

## 1. Setup Store 的三种角色

在 Setup Store 中，常见映射关系如下：

- ref() -> state（状态）
- computed() -> getters（派生值）
- function() -> actions（业务行为）

理解方式：

- state 回答现在有什么
- getters 回答可以算出什么
- actions 回答如何改变状态

## 2. 为什么有时看到 return，有时没有

### Setup Store

```ts
defineStore('id', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }
  return { count, increment }
})
```

Setup Store 外层是函数，必须 return 才能暴露状态和方法。

### Option Store

```ts
defineStore('id', {
  state: () => ({ count: 0 }),
})
```

Option Store 外层是配置对象，不需要 return；只有 state 函数里返回初始状态。

## 3. 组件中推荐写法

### 3.1 状态和 getter 用 storeToRefs

```ts
const store = useCounterStore()
const { counter, userCount } = storeToRefs(store)
```

说明：直接解构 store 可能丢失响应式，storeToRefs 是工程中最稳妥用法。

### 3.2 action 直接从 store 取

```ts
const { fetchUsers, resetState } = store
```

## 4. $patch 在 Setup Store 里也能用

$patch 是 store 实例方法，与 Setup/Option 写法无关。

### 对象式 patch（简单覆盖）

```ts
store.$patch({
  name: 'Pinia Learner',
  counter: 10,
})
```

### 函数式 patch（基于旧值计算、数组操作）

```ts
store.$patch((state) => {
  state.counter += 1
  state.userList.push({ id: 4, name: 'Daisy', age: 21 })
})
```

## 5. 工程里高频固定套路

1. 按业务域拆 store（user/article/cart），避免一个大 store。
2. 组件只触发 action，业务流程写在 store action 内。
3. store 常备 data/loading/error 三件套。
4. 初始化时拉取数据，退出页面或切换账号时 reset。
5. 多字段联动更新优先用 $patch。
6. 仅持久化必要字段（如登录态、偏好），避免全量持久化。

## 6. 本项目当前示例覆盖点

当前 counter store 已演示：

- 基础状态：counter、name
- 工程状态：userList、currentUser、loading、errorMessage
- getter：doubleCount、userCount
- action：increment、fetchUsers、resetState
- 组件调用：storeToRefs + action + $patch

## 7. 一个可复用的最小模板

```ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDemoStore = defineStore('demo', () => {
  const data = ref<any[]>([])
  const loading = ref(false)
  const error = ref('')

  const count = computed(() => data.value.length)

  async function fetchData() {
    loading.value = true
    error.value = ''
    try {
      // await api
      data.value = []
    } catch {
      error.value = '请求失败'
    } finally {
      loading.value = false
    }
  }

  function resetState() {
    data.value = []
    loading.value = false
    error.value = ''
  }

  return { data, loading, error, count, fetchData, resetState }
})
```

## 8. 如何判断放组件内部还是放 Store

先问一句：这个状态是不是页面共享的业务事实。

- 是：优先放 Store。
- 否：优先放组件内部状态。

快速判断清单：

1. 是否跨多个组件共享：是则放 Store。
2. 是否跨页面仍要保留：是则放 Store。
3. 是否属于业务数据（用户、购物车、权限、列表）：是则放 Store。
4. 是否只是 UI 临时表现（弹窗开关、hover、输入中间值）：放组件内部。
5. 是否需要统一异步流程（loading、error、retry）：放 Store action。

一句话口诀：

- 共享业务状态进 Store。
- 局部展示状态留组件。

当前项目可参考：

- counter 只用于单组件演示时可本地维护；多组件共享时放 Store。
- userList、currentUser、loading、errorMessage 属于业务共享态，放 Store 更合适。

## 9. 多个 Store 互相使用时怎么读状态

Pinia 支持 store 之间互相使用，但不建议两个 store 在 setup 顶层同时直接读取对方 state。

更稳妥的做法：

1. 做派生值时，在 computed 中读取别的 store。
2. 做业务流程时，在 action/function 中读取别的 store。
3. 尽量避免两个 store 在定义阶段顶部互相取值。

一句话理解：

- 可以依赖别的 store。
- 但尽量延迟到 computed 或 action 里再读取。

原因是：

- setup 顶层互相直接读 state，容易形成初始化循环。
- computed 和 action 属于按需读取，更安全。
