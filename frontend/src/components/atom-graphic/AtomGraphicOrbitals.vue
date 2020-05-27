<template>
  <div>
    <div id="visual-inner" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AtomGraphicOrbitals",
  computed: {
    ...mapState("mainAtomTable", ["atomSnippetActive", "options"])
  }
};
</script>

<style scoped lang="scss">
@import "~@/styles/variables";
// @import "atomGraphicTheme";
@import "atomGraphic";
</style>
