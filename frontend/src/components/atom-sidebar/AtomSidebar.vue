<template>
  <div class="atom-info-wrapper">
    <div v-if="ready" class="atom-info">
      <simplebar class="simplebar" data-simplebar-auto-hide="false">
        <div class="atom-info-inner">
          <div
            v-for="traitPair in Object.entries(this.atomTraitsActive)"
            :key="traitPair[0]"
            class="atom-stat"
          >
            <p
              v-if="
                typeof traitPair[1] === 'number' ||
                  typeof traitPair[1] === 'string'
              "
              class="atom-stat-text"
            >
              {{ traitPair[0] }}:
              {{ traitPair[1] }}
              {{ unit(traitPair[0]) }}
            </p>
            <p v-else-if="typeof traitPair[1] === 'object'">
              <label for="atom-select"></label>
              <select name="pets" id="atom-select" v-model="selected">
                <option
                  v-for="actualTraitPair in Object.entries(traitPair[1])"
                  :key="actualTraitPair[0]"
                  :value="actualTraitPair[0]"
                >
                  {{ actualTraitPair[0] }}
                </option>
              </select>
              {{ traitPair[1][selected] }}
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
  data() {
    return {
      selected: ''
    }
  },
  components: {
    simplebar
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
