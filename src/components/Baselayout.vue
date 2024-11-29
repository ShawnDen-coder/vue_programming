<!-- <template>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
</template> -->

<script>
import { h } from "vue";

export default {
  setup(props, { slots }) {
    return () => [h("header", {}, slots.header()), h("main", {}, slots.default())];
  },
};
</script>

<style scoped></style>
