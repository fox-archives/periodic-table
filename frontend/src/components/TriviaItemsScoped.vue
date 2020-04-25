<template>
  <div class="trivia-items-scoped">
    <router-link :to="triviaItem.to">{{ triviaItem.displayName }}</router-link>
  </div>
</template>

<script>
export default {
  name: "TriviaItemsScoped",
  props: {
    triviaItem: {
      type: Object,
      default: () => ({
        displayName: "TriviaItemScoped",
        graphQlName: "graphQlName",
        to: "/trivia/trivia-item/trivia-item-scoped"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables";
</style>
