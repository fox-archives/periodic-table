<template>
  <div id="grid-container-outer">
    <div id="grid-container" ref="idGridContainer">
      <div v-if="!ready" id="grid-container-loading-view">
        <periodic-table-loading />
      </div>
      <div
        v-if="ready"
        id="grid-outer"
        ref="idGridOuter"
        :style="periodicTableWidth"
        :class="periodicTableClass"
      >
        <main id="grid" ref="idGrid" :style="atomTextSizes">
          <!-- ATOMS FROM PERIODIC TABLE -->
          <div
            v-for="(atomPlacement, index) in atomPlacements"
            :key="atomPlacement.column + atomPlacement.row"
            class="element"
            :class="[
              atomPlacement.column,
              atomPlacement.row,
              atomPlacement.period,
              atomPlacement.group,
              atomColors[index].color
            ]"
            @mouseover="updateAtom({ index, hoverStatus: 'hoverOver' })"
            @mouseleave="updateAtom({ index, hoverStatus: 'hoverLeave' })"
            @click="[updateClickedAtom(index)]"
          >
            <div v-cloak class="element-inner">
              <p class="secondary-text test">
                {{ atomSnippets[index].atomNumber }}
              </p>
              <p class="primary-text">
                {{ atomSnippets[index].atomAbbreviation }}
              </p>
              <p class="secondary-text">
                {{ atomSnippets[index].atomName }}
              </p>
              <p class="secondary-text">
                {{ atomSnippets[index].atomDynamicProperty }}
              </p>
            </div>
          </div>

          <!-- PERIOD LABELS -->
          <div
            v-for="(period, index) in atomLabelPeriods"
            :key="period.row + period.column"
            class="label-period label"
            :class="[period.row, period.column]"
          >
            <div
              v-cloak
              class="label-period-inner label-inner"
              :class="atomLabelPeriods[index].color"
              @mouseover="[highlightLabelSection(index, 'period')]"
              @mouseleave="[unhighlightLabelSection(index, 'period')]"
            >
              <p class="label-text">
                {{ period.display }}
              </p>
            </div>
          </div>

          <!-- GROUP LABELS -->
          <div
            v-for="(group, index) in atomLabelGroups"
            :key="group.row + group.column"
            class="label-group label"
            :class="[group.row, group.column]"
          >
            <div
              v-cloak
              class="label-group-inner label-inner"
              :class="atomLabelGroups[index].color"
              @mouseover="[highlightLabelSection(index, 'group')]"
              @mouseleave="[unhighlightLabelSection(index, 'group')]"
            >
              <p class="label-text">
                {{ group.display }}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { throttle, debounce } from "lodash";

import {
  highlightLabelSection,
  unhighlightLabelSection
} from "@/components/periodic-table/utils/labelHoverHandlers";
import { setLabelColor } from "@/components/periodic-table/utils/atomHoverHandlers";
import { updateClickedAtom } from "@/components/periodic-table/utils/atomClickHandlers";

import PeriodicTableLoading from "@/components/periodic-table/PeriodicTableLoading";

export default {
  name: "PeriodicTable",
  components: {
    "periodic-table-loading": PeriodicTableLoading
  },
  data() {
    return {
      atomTextSizes: {
        "--primaryTextSize": "0px",
        "--secondaryTextSize": "0px",
        "--labelTextSize": "0px"
      },
      periodicTableWidth: {
        "--periodicTableWidth": "0px"
      },

      periodicTableClass: {
        stretchVertically: false
      }
    };
  },
  watch: {
    ready() {
      this.$nextTick(() => {
        this.formatPage();
        window.addEventListener("resize", throttle(this.formatPage, 250));
        window.addEventListener("resize", debounce(this.formatPage, 100));
      });
    }
  },
  created() {
    this.initAtomData({
      currentRoute: this.$route
    });
  },
  mounted() {
    let psPeriodicTable = new PerfectScrollbar("#grid-container");

    window.addEventListener("resize", throttle(psPeriodicTable.update, 500));
    window.addEventListener(
      "resize",
      debounce(() => {
        window.requestAnimationFrame(() => {
          psPeriodicTable.update();
        });
      }, 100)
    );
  },
  destroy() {
    // TODO: destroy event listeners
  },
  computed: {
    ...mapState("mainAtomTable", [
      "atomSnippets",
      "atomPlacements",
      "atomColors",
      "atomLabelPeriods",
      "atomLabelGroups",

      "ready",

      "hoveredAtom",
      "clickedAtom",
      "options"
    ])
  },
  methods: {
    ...mapMutations("mainAtomTable", [
      "updateActiveAtom",
      "clearLabelExcept",


      "setColorOfAllButOnePeriod",
      "setColorOfAllButOneGroup",
      "setColorOfAllButOneAtom",
      "setColorOfOnePeriod",
      "setColorOfOneGroup",
      "setColorOfOneAtom",

      "setHoveredAtom",
      "setClickedAtom",
      "setOptions"
    ]),
    ...mapActions("mainAtomTable", ["initAtomData"]),

    // imported from periodic-table-specific utils
    highlightLabelSection,
    unhighlightLabelSection,
    setLabelColor,
    updateClickedAtom,

    // Converts the period / group label 'g-3', 'p-4' to just the number '3', and '4'
    labelClassToNone: function(labelNumber) {
      return labelNumber.substring(2);
    },

    updateAtom: function(payload) {
      let { index, hoverStatus } = payload;
      this.setHoveredAtom(index);

      if(hoverStatus === "hoverOver") {
        if (this.clickedAtom.index !== index) {
          this.setColorOfOneAtom({
            prefix: "dark-",
            i: index
          });
        }

        if(this.clickedAtom.active === false) {
          this.setLabelColor(index, "true");
        }

        this.updateActiveAtom(index);
      }
      else if(hoverStatus === "hoverLeave")  {
        if (this.clickedAtom.index !== index) {
          this.setColorOfOneAtom({
            prefix: "",
            i: index
          });
        }

        if(this.clickedAtom.active === false) {
          this.setLabelColor(index, "false");
        }

        this.updateActiveAtom(index);
      }
    },

    formatPage: function() {
      // This changes the CSS variable to size the element text
      // Recall the CSS variables are declared in periodicTable.scss
      let updateAtomFontSizes = () => {
        this.$nextTick(() => {
          window.requestAnimationFrame(() => {
            let grid = document.getElementById("grid");

            let elementWidth = grid.childNodes[0].clientWidth;
            let primaryFontSize = `${elementWidth * 0.32}px`;
            let secondaryFontSize = `${elementWidth * 0.2}px`;
            let labelFontSize = `${elementWidth * 0.3}px`;

            // Setting CSS Variables for All Elements
            // Variables stores in grid
            this.atomTextSizes = {
              "--primaryTextSize": primaryFontSize,
              "--secondaryTextSize": secondaryFontSize,
              "--labelTextSize": labelFontSize
            };
          });
        });
      };

      let idGridOuter = this.$refs.idGridOuter.getBoundingClientRect();
      let idGridContainer = this.$refs.idGridContainer.getBoundingClientRect();
      if (this.options.panelLayout === "panel-top") {
        let periodicTableRatio = 0.6;

        if (idGridOuter.height < idGridContainer.height) {
          this.periodicTableClass = {
            stretchVertically: true
          };
          this.periodicTableWidth = {
            "--periodicTableWidth": `${idGridContainer.height /
              periodicTableRatio}px`
          };
          updateAtomFontSizes();
          return;
        }
      }
      this.periodicTableClass = {
        stretchVertically: false
      };
      updateAtomFontSizes();
    }
  }
};
</script>

<style scoped lang="scss">
// Variables, mixins, and common components
@import "~@/styles/variables";

// PERIODIC TABLE \\
@import "periodicTable";
@import "periodicTableTheme";

.light-def {
  @include periodicTableThemeDefault(
    $ld-background,
    true,
    $ld-shadow,
    $ld-shadow-hover
  );
}

.light-con {
  @include periodicTableThemeDefault(
    $lc-background,
    true,
    $lc-shadow,
    $lc-shadow-hover
  );
}

.dark-def {
  @include periodicTableThemeDefault(
    $dd-background,
    false,
    $dd-shadow,
    $dd-shadow-hover
  );
}

// ELEMENTS \\
@import "elements";
@import "elementsTheme";

.light-def {
  @include elementsThemeAtomColors("supdark-", true, 4, 9);
  @include elementsThemeAtomColors("dark-", true, 3, 9);
  @include elementsThemeAtomColors("", true, 2, 9);
  @include elementsThemeAtomColors("light-", true, 1, 6);
  @include elementsThemeShadow(true, $oc-gray-3, $oc-gray-4);
}

.light-con {
  @include elementsThemeAtomColors("supdark-", true, 6, 9);
  @include elementsThemeAtomColors("dark-", true, 5, 9);
  @include elementsThemeAtomColors("", true, 4, 9);
  @include elementsThemeAtomColors("light-", true, 2, 6);
  @include elementsThemeShadow(true, $oc-gray-4, $oc-gray-5);
}

.dark-def {
  @include elementsThemeAtomColors("supdark-", true, 9, 1);
  @include elementsThemeAtomColors("dark-", true, 8, 1);
  @include elementsThemeAtomColors("", true, 7, 1);
  @include elementsThemeAtomColors("light-", true, 4, 5);
  @include elementsThemeShadow(false, $oc-gray-8, $oc-gray-7);
}

// LABELS \\
@import "labels";
@import "labelsTheme";

.light-def {
  @include labelsThemeDefault($oc-gray-0, $oc-gray-2, $oc-gray-9);
}

.light-con {
  @include labelsThemeDefault($oc-gray-1, $oc-gray-4, $oc-gray-9);
}

.dark-def {
  @include labelsThemeDefault($oc-gray-8, $oc-gray-9, $oc-gray-0);
}
</style>
