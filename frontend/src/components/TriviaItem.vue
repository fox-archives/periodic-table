<template>
  <div class="trivia-item">
    <h4>{{ name }}</h4>
    <slot />
  </div>
</template>

<script>
export default {
  name: "TriviaItem",
  props: {
    name: {
      type: String,
      default: () => "Trivia Item Name"
    },
    to: {
      type: String,
      default: () => "/trivia/to"
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/styles/variables";

.trivia-item {
  width: 300px;
  background: orange;
}

h4 {
  font-size: 24px;
}
</style>
