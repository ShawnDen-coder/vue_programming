<template>
  <div>
    <h2>
      {{ options.title }}
    </h2>
    <p>
      用户：{{ options.user.name }}, 活跃：{{
        options.user.active ? "活跃" : "不活跃"
      }}
    </p>
    <input type="text" placeholder="搜索消息" v-model="searchTerm" />
    <ul>
      <li v-for="msg in searchedMessages" :key="msg.id">{{ msg.content }}</li>
    </ul>
    <button @click="messages = []">删除全部</button>
    <button @click="options.title = '这是标题'">修改标题</button>
    <button @click="options.user.name = '李四'">修改用户</button>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
export default {
  setup() {
    const messages = ref([
      { id: 1, content: "这是一条消息提醒1" },
      { id: 1, content: "这是一条消息提醒2" },
      { id: 1, content: "这是一条消息提醒3" },
    ]);

    // 计算属性
    const searchTerm = ref("");
    const searchedMessages = computed(() => {
      if (searchTerm.value === "") return messages.value;
      return messages.value.filter((msg) =>
        msg.content.includes(searchTerm.value)
      );
    });

    const options = reactive({
      title: "消息列表",
      user: {
        name: "张三",
        active: true,
      },
    });

    return { messages, options, searchTerm, searchedMessages };
  },
};
</script>

<style scoped>
h2 {
  color: hsl(280deg, 100%, 70%);
  margin-bottom: 24px;
  text-align: center;
}

ul {
  list-style: none;
  display: grid;
  gap: 24px;
}

li {
  display: flex;
  align-items: center;
  gap: 12px;
}

li::before {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  background-color: hsl(280deg, 100%, 70%);
  border-radius: 100%;
}
</style>
