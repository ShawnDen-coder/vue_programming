<template>
  <li>
    <p>{{ msg }}</p>
    <button @click="emitevent(id)">删除消息</button>
  </li>
</template>

<script>
import { watch, toRefs } from "vue";

export default {
  props: ["msg", "id"],
  emits: ["remove"],
  setup(props, { emit }) {
    function emitevent(id) {
      emit("remove", id);
    }
    return { emitevent };
  },
};
</script>

<style scoped>
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
