<template>
  <div>
    <div id="visual-inner">
      <div v-if="ready" id="visual-inner-inner">
        <div id="icon">
          <div id="icon-inner" :class="atomSnippetActive.color">
            <p>{{ atomSnippetActive.atomAbbreviation }}</p>
          </div>
        </div>
        <div id="text">
          <p>{{ atomSnippetActive.atomName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AtomGraphicProperties",
  computed: {
    ...mapState("mainAtomTable", ["atomSnippetActive", "ready"])
  }
};
</script>

<style scoped lang="scss">
@import "~@/styles/variables";
@import "atomGraphicTheme";
@import "atomGraphic";
</style>
