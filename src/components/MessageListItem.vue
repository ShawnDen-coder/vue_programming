<template>
  <li>{{ msg }}</li>
</template>

<script>
import { watch, toRefs } from "vue";

export default {
  props: ["msg"],
  setup(props) {
    console.log(props.msg);
    const { msg } = toRefs(props);

    watch(
      () => msg.value,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
      }
    );

    return {};
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
