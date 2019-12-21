<template>
  <div class="atom-info-wrapper">
    <div v-if="ready" class="atom-info">
      <simplebar class="simplebar" data-simplebar-auto-hide="false">
        <div class="atom-info-inner">
          <div
            v-for="atomTabDataMember in atomTraitsActiveModified"
            :key="atomTabDataMember[0]"
            class="atom-stat"
          >
            <p class="atom-stat-text">
              {{ atomTabDataMember[0] }}:
              {{ atomTabDataMember[1] }}
              {{ unit(atomTabDataMember[0]) }}
            </p>
          </div>
        </div>
      </simplebar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
  name: "AtomSidebar",
  components: {
    simplebar
  },
  computed: {
    ...mapState("mainAtomTable", [
      "atomTraitsUnits",
      "atomTraitsActive",
      "ready"
    ]),
    atomTraitsActiveModified() {
      return Object.entries(this.atomTraitsActive);
    }
  },
  methods: {
    unit(traitName) {
      try {
        return this.atomTraitsUnits[traitName].unit;
      } catch {
        return this.atomTraitsUnits[traitName];
      }
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
