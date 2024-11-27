<template>
  <MovieTitle />
  <div class="description">{{ description }}</div>
</template>

<script>
import MovieTitle from "./MovieTitle.vue";
export default {
  components: {
    MovieTitle,
  },
  props: ["description"],
  setup() {},
};
</script>

<style scoped>
.description {
  margin-top: 12px;
  color: hsl(240deg, 10%, 88%);
}
</style>
