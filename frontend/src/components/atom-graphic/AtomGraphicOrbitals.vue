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
@import "atomGraphicTheme";
@import "atomGraphic";

.light-def {
  #visual-inner {
    background-color: $ld-background !important;
  }
}


.dark-def {
  #visual-inner {
    background-color: $dd-background !important;
  }
}
</style>
