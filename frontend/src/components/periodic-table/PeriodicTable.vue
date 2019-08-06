<template>
  <div id="grid-container-outer">
    <div id="grid-container">
      <div v-if="!ready"
id="grid-container-loading-view">
        <periodic-table-loading />
      </div>
      <div v-if="ready"
id="grid-outer" :style="periodicTableWidth">
        <main
id="grid" ref="idGrid"
:style="atomTextSizes"
>
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
            @mouseover="
              [
                setElementPrefix(index, 'dark-'),
                setLabelColor(index, 'true'),
                updateActiveAtom(index)
              ]
            "
            @mouseleave="
              [
                setElementPrefix(index, ''),
                setLabelColor(index, 'false'),
                updateActiveAtom(index)
              ]
            "
            @click="[updateClickedAtom(index)]"
          >
            <div
v-cloak class="element-inner"
>
              <p class="secondary-text test">
                {{ atomSimpleData[index].atomNumber }}
              </p>
              <p class="primary-text">
                {{ atomSimpleData[index].atomAbbreviation }}
              </p>
              <p class="secondary-text">
                {{ atomSimpleData[index].atomName }}
              </p>
              <p class="secondary-text">
                {{ atomSimpleData[index].atomMass }}
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
import { mapState, mapMutations, mapActions } from 'vuex';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { throttle, debounce } from 'lodash';

import {
  highlightLabelSection,
  unhighlightLabelSection
} from '@/components/periodic-table/utils/hoverLabelsHandlers';
import { setLabelColor } from '@/components/periodic-table/utils/hoverAtomHandlers';
import { updateClickedAtom } from '@/components/periodic-table/utils/clickAtomHandlers';

import PeriodicTableLoading from '@/components/periodic-table/PeriodicTableLoading';

export default {
  name: 'PeriodicTable',
  components: {
    'periodic-table-loading': PeriodicTableLoading
  },
  data() {
    return {
      atomTextSizes: {
        '--primaryTextSize': '0px',
        '--secondaryTextSize': '0px',
        '--labelTextSize': '0px'
      },
      periodicTableWidth: {
        '--periodicTableSupposedHeight': '0px'
      },
      // if we know periodicTableHeightConstrained is an active class, then we know that the
      // height of the periodic table is too small. we have to correct it. before implementing
      // this we had to do calc(100% - 2px). now we set this class, and make the height: 100
      // only apply when the following variable is active
      periodicTableHeightConstrainedBeingDealtWith: true
    };
  },
  watch: {
    ready() {
      this.$nextTick(() => {
        this.formatPage();
      });
    }
  },
  created() {
    this.initAtomData();
  },
  mounted() {
    // This controls perfect scrollbar only
    let psPeriodicTable = new PerfectScrollbar('#grid-container');

    window.addEventListener('resize', throttle(psPeriodicTable.update, 500));
    window.addEventListener('resize', debounce(psPeriodicTable.update, 250));
    window.addEventListener('resize', throttle(this.formatPage, 250));
    // uncomment this when everything works without a debounce
    window.addEventListener('resize', debounce(this.formatPage, 100));
  },
  computed: {
    ...mapState([
      'atomSimpleData',
      'atomPlacements',
      'atomColors',
      'atomLabelPeriods',
      'atomLabelGroups',

      'ready',

      'clickedAtom',
      'options'
    ])
  },
  methods: {
    ...mapMutations([
      'updateActiveAtom',
      'updateActiveAtomForce',
      'clearLabelExcept',
      'setClickedAtom',

      'setColorOfAllButOnePeriod',
      'setColorOfAllButOneGroup',
      'setColorOfAllButOneAtom',
      'setColorOfOnePeriod',
      'setColorOfOneGroup',
      'setColorOfOneAtom',

      'setOptions'
    ]),
    ...mapActions(['initAtomData']),

    // imported from periodic-table-specific utils
    highlightLabelSection,
    unhighlightLabelSection,
    setLabelColor,
    updateClickedAtom,

    // Converts the period / group label 'g-3', 'p-4' to just the number '3', and '4'
    labelClassToNone: function(labelNumber) {
      return labelNumber.substring(2);
    },

    setElementPrefix: function(index, prefix) {
      // This if statement is important
      // When user clicks on an element and hovers over a different element, the original element that was clicked
      // on still has prefix 'superdark'
      if (this.clickedAtom.index !== index) {
        this.setColorOfOneAtom({
          prefix: prefix,
          i: index
        });
      }
    },

    // format the page such that everything looks fine
    // 1: update the periodic table height layout
    // 2: update the periodic table width
    // 3: update text size
    formatPage: function() {
      this.$nextTick(() => {
        window.requestAnimationFrame(() => {
          this.updatePeriodicTableHeightLayout();
          window.requestAnimationFrame(() => {
            this.updatePeriodicTableWidth();
            window.requestAnimationFrame(() => {
              this.updateAtomFontSizes();
            });
          });
        });
      });
    },

    updatePeriodicTableWidth: function() {
      let gridContainer = this.$refs.idGrid;

      // change the ratio in periodicTable.scss if changed here
      let periodicTableRatio = 0.6;

      // Subtract 2 because recall CSS says the height is calc(100% - 2px)
      // All I know is that when 2 is removed, then scrollbar is shown for small widths for panel-side
      this.periodicTableWidth = {
        '--periodicTableWidth': `${gridContainer.clientHeight /
          periodicTableRatio}px`,
        '--periodicTableWidthRatio': periodicTableRatio
      };
    },

    // This script makes the periodic-table and element info panel not have a height
    // bigger than the browser on panel-side
    updatePeriodicTableHeightLayout: function() {
      let gridContainerHeight = document.getElementById('grid-container')
        .offsetHeight;
      let gridOuterHeight = document.getElementById('grid-outer').offsetHeight;

      // Only change the style if the periodic-table has a greater or equal height for AtomInfoPanel.vue
      if (
        gridOuterHeight >= gridContainerHeight &&
        !this.periodicTableHeightConstrainedBeingDealtWith
      ) {
        // This means if panel and periodic-table fill whole window height, increasing
        // width will not increase size of periodic-table, instead it creates whitespace;
        // periodic-table will only increase if the height of browser window increases
        this.setOptions({
          periodicTableHeightLayoutState: 'periodicTableHeightMax'
        });
        this.periodicTableHeightConstrainedBeingDealtWith = true;
      } else {
        this.setOptions({
          periodicTableHeightLayoutState: 'periodicTableHeightConstrained'
        });
      }
    },

    // This changes the CSS variable to size the element text
    // Recall the CSS variables are declared in periodicTable.scss
    updateAtomFontSizes: function() {
      let grid = document.getElementById('grid');

      let elementWidth = grid.childNodes[0].clientWidth;
      let primaryFontSize = `${elementWidth * 0.32}px`;
      let secondaryFontSize = `${elementWidth * 0.2}px`;
      let labelFontSize = `${elementWidth * 0.3}px`;

      // Setting CSS Variables for All Elements
      // Variables stores in grid
      this.atomTextSizes = {
        '--primaryTextSize': primaryFontSize,
        '--secondaryTextSize': secondaryFontSize,
        '--labelTextSize': labelFontSize
      };
    }
  }
};
</script>

<style scoped lang="scss">
// Variables, mixins, and common components
@import '~@/styles/variables';

// PERIODIC TABLE \\
@import 'periodicTable';
@import 'periodicTableTheme';

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
@import 'elements';
@import 'elementsTheme';

.light-def {
  @include elementsThemeAtomColors('supdark-', true, 4, 9);
  @include elementsThemeAtomColors('dark-', true, 3, 9);
  @include elementsThemeAtomColors('', true, 2, 9);
  @include elementsThemeAtomColors('light-', true, 1, 6);
  @include elementsThemeShadow(true, $oc-gray-3, $oc-gray-4);
}

.light-con {
  @include elementsThemeAtomColors('supdark-', true, 6, 9);
  @include elementsThemeAtomColors('dark-', true, 5, 9);
  @include elementsThemeAtomColors('', true, 4, 9);
  @include elementsThemeAtomColors('light-', true, 2, 6);
  @include elementsThemeShadow(true, $oc-gray-4, $oc-gray-5);
}

.dark-def {
  @include elementsThemeAtomColors('supdark-', true, 9, 1);
  @include elementsThemeAtomColors('dark-', true, 8, 1);
  @include elementsThemeAtomColors('', true, 7, 1);
  @include elementsThemeAtomColors('light-', true, 4, 5);
  @include elementsThemeShadow(false, $oc-gray-8, $oc-gray-7);
}

// LABELS \\
@import 'labels';
@import 'labelsTheme';

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
