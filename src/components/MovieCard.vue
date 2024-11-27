<template>
  <div class="card">
    <MovieItem :description="movie.description" />
  </div>
</template>

<script>
import MovieItem from "./MovieItem.vue";
import { provide } from "vue";

export default {
  components: {
    MovieItem,
  },
  setup() {
    const movie = {
      title: "电影",
      description: "这是一段电影的描述",
    };

    provide("title", movie.title);

    return { movie };
  },
};
</script>

<style lang="scss" scoped></style>
