<template>
  <div class="atom-info-wrapper">
    <div v-if="ready" class="atom-info">
      <Simplebar class="simplebar" data-simplebar-auto-hide="false">
        <div class="atom-info-inner">
          <div
            v-for="traitPair in Object.entries(this.atomTraitsActive)"
            :key="traitPair[0]"
            class="atom-stat"
          >
            <TraitPair
              :traitPair="traitPair"
            />
          </div>
        </div>
      </Simplebar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
import TraitPair from "@/components/atom-sidebar/TraitPair"

export default {
  name: "AtomSidebar",
  components: {
    Simplebar,
    TraitPair
  },
  computed: {
    ...mapState("mainAtomTable", [
      "atomTraitsUnits",
      "atomTraitsActive",
      "ready"
    ])
  },
  methods: {
    unit(traitName) {
      try {
        return this.atomTraitsUnits[traitName].unit;
      } catch {
        return this.atomTraitsUnits[traitName];
      }
    },
    selected(traitName) {
      let a = ''
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
      console.log(this.atomTraitsActive[traitName][toChange])
      console.log(toChange)
      this.aselected = this.atomTraitsActive[traitName][toChange]
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
    $ld-background,
    $ld-background-accent,
    true,
    $ld-shadow,
    $ld-shadow-hover,
    $ld-text
  );
}

.dark-def {
  @include panelTextualThemeDefault(
    $dd-background,
    $dd-background-accent,
    false,
    $dd-shadow,
    $dd-shadow-hover,
    $dd-text
  );
}
</style>
