<template>
  <section id="panel">
    <router-view name="atom-graphic" />
    <router-view name="atom-sidebar" />
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AtomInfoPanel",
  computed: {
    ...mapState("mainAtomTable", ["options"])
  }
};
</script>

<style scoped lang="scss">
@import "~@/styles/variables";

// INFO SIDE
.panel-side #panel {
  display: grid;
  grid-template-columns: 17vw;
  grid-template-rows: 17vw auto;
  grid-row-gap: $spacing;
  border-radius: $border-radius;
}

// INFO TOP
.panel-top #panel {
  display: grid;
  grid-template-columns: 20vw auto;
  grid-template-rows: 20vw;
  grid-column-gap: $spacing;
  margin-bottom: $spacing;
  border-radius: $border-radius;
}

// INFO EXCLUDE
.info-exclude #panel {
  display: none;
}
</style>
