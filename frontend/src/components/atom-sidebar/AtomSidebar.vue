<template>
  <div class="atom-info-wrapper">
    <div v-if="ready" class="atom-info">
      <!-- <template > -->
      <!-- <Simplebar class="simplebar" data-simplebar-auto-hide="false"> -->
      <div v-if="isNotLanthOrAct" class="atom-info-inner">
        <div
          v-for="traitPair in Object.entries(atomTraitsActive)"
          :key="traitPair[0]"
          class="atom-stat"
        >
          <TraitPair :trait-pair="traitPair" />
        </div>
      </div>
      <!-- </Simplebar> -->
      <!-- </template> -->
      <div v-else class="ready-but-invalid">
        Not Applicable
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import Simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import TraitPair from "@/components/atom-sidebar/TraitPair";

export default {
  name: "AtomSidebar",
  components: {
    // Simplebar,
    TraitPair
  },
  computed: {
    ...mapState("mainAtomTable", [
      "atomTraitsUnits",
      "atomSnippetActive",
      "atomTraitsActive",
      "ready"
    ]),
    isNotLanthOrAct() {
      // console.log(this.atomSnippetActive.atomName !== 'Lanthanides' && this.atomSnippetActive.atomName !== 'Actinides')
      return (
        this.atomSnippetActive.atomName !== "Lanthanides" &&
        this.atomSnippetActive.atomName !== "Actinides"
      );
    }
  },
  methods: {
    selected(traitName) {
      let a = "";
      switch (traitName) {
        case "Abundance":
          a = "Crust Abundance";
          break;
        case "Radius":
          a = "Atomic Radius";
          break;
      }
      // this.aselected = a;
      return a;
    },
    change(traitName, toChange) {
      console.log(this.atomTraitsActive);
      console.log(this.atomTraitsActive[traitName][toChange]);
      console.log(toChange);
      this.aselected = this.atomTraitsActive[traitName][toChange];
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/styles/variables.scss";
@import "atomSidebarTheme";
@import "atomSidebar";

.light-def {
  @include panelTextualThemeDefault(
    $background: $theme-light-background,
    $background-accent: $theme-light-background-accent,
    $hasShadow: true,
    $shadow: $theme-light-shadow,
    $shadowHover: $theme-light-shadow-hover,
    $text: $theme-light-text
  );
}

.dark-def {
  @include panelTextualThemeDefault(
    $background: $theme-dark-background,
    $background-accent: $theme-dark-background-accent,
    $hasShadow: false,
    $shadow: $theme-dark-shadow,
    $shadowHover: $theme-dark-shadow-hover,
    $text: $theme-dark-text
  );
}
</style>
