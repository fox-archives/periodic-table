<template>
  <div
    id="display"
    :class="[
      options.periodicTableHeightLayoutState,
      options.themeType,
      options.panelLayout
    ]"
  >
    <atom-info-panel />
    <periodic-table />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { throttle, debounce } from "lodash";
import PeriodicTable from "@/components/periodic-table/PeriodicTable.vue";
import AtomInfoPanel from "@/components/AtomInfoPanel.vue";

export default {
  name: "TabGenericPeriodicTableInterface",
  components: {
    "atom-info-panel": AtomInfoPanel,
    "periodic-table": PeriodicTable
  },
  created() {
    this.initAtomTab({
      currentTab: this.$route
    }).then(() => {});
  },
  mounted() {
    this.updateInfoLocation();
    window.addEventListener("resize", throttle(this.updateInfoLocation, 250));
    window.addEventListener("resize", debounce(this.updateInfoLocation, 100));
  },
  computed: {
    ...mapState("mainAtomTable", ["options"])
  },
  methods: {
    ...mapActions("mainAtomTable", ["initAtomTab"]),
    ...mapMutations("mainAtomTable", ["setOptions"]),
    // Purpose: To update the panelLayout depending on the size of the viewport (greater than or less than 1100 px)
    updateInfoLocation: function () {
      if (window.innerWidth < 1300) {
        this.setOptions({ panelLayout: "panel-top" });
      } else {
        this.setOptions({ panelLayout: "panel-side" });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/styles/variables";

#display {
  margin-left: $body-margin;
  margin-right: $body-margin;
}

.panel-top #display {
  display: grid;
  grid-template-rows: max-content auto;
  // grid-row-gap: $spacing;
}

.panel-side #display {
  display: grid;
  grid-template-columns: max-content auto;
  grid-column-gap: $spacing;
}
</style>
