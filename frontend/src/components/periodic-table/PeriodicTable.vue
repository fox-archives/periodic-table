<template>
  <div id="grid-container-outer">
    <div id="grid-container">
      <div v-if="ready" id="grid-outer">
        <main id="grid">
          <!-- DUPLICATED ELEMENTS FROM PERIODIC TABLE -->
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
            <div v-cloak class="element-inner">
              <p class="secondary-text test">
                {{ atomPlacement.display }}
              </p>
              <p class="primary-text">
                {{ atomSimpleData[index].abbreviation }}
              </p>
              <p class="secondary-text">
                {{ atomSimpleData[index].name }}
              </p>
              <p class="secondary-text">
                {{ atomSimpleData[index].atomicMass }}
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

import { highlightLabelSection, unhighlightLabelSection } from '@/components/periodic-table/utils/hoverLabelsHandlers';
import { setLabelColor } from "@/components/periodic-table/utils/hoverAtomHandlers";
import { updateClickedAtom } from "@/components/periodic-table/utils/clickAtomHandlers";

export default {
  name: 'PeriodicTable',
  created() {
    this.loadAtomData();
  },
  mounted() {
    // This controls perfect scrollbar only
    let psPeriodicTable = new PerfectScrollbar('#grid-container', {
      swipeEasing: true // Default
    });

    window.addEventListener(
      'resize',
      throttle(() => psPeriodicTable.update(), 333)
    );
    window.addEventListener(
      'resize',
      debounce(() => psPeriodicTable.update(), 2000)
    );
    window.addEventListener(
      'resize',
      debounce(() => psPeriodicTable.update(), 10000)
    );
  },
  computed: {
    ...mapState([
      'atomSimpleData',
      'atomPlacements',
      'atomColors',
      'atomLabelPeriods',
      'atomLabelGroups',

      'ready',

      'activeAtom',
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
    ]),
    ...mapActions(['loadAtomColors', 'loadAtomData']),

    // imported in from periodic-table-specific utils
    highlightLabelSection,
    unhighlightLabelSection,
    setLabelColor,
    updateClickedAtom,

    // @ param none
    // Updates color scheme of the periodic table
    updateColor: function() {
      let routePath = this.$route.path.substring(1);
      if (routePath === 'properties' || routePath === 'isotopes') {
        this.loadAtomColors({ colorScheme: 'atomColorsCategory' });
      } else if (routePath === 'electrons' || routePath === 'orbitals') {
        this.loadAtomColors({ colorScheme: 'atomColorsOrbitalBlock' });
      } else {
        this.loadAtomColors({ colorScheme: 'atomColorsCategory' });
      }
    },

    // Converts the period / group label 'g-3', 'p-4' to just the number '3', and '4'
    labelClassToNone: function(labelNumber) {
      return labelNumber.substring(2);
    },

    setElementPrefix(index, prefix) {
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
  @include elementsThematomColors('supdark-', true, 4, 9);
  @include elementsThematomColors('dark-', true, 3, 9);
  @include elementsThematomColors('', true, 2, 9);
  @include elementsThematomColors('light-', true, 1, 6);
  @include elementsThemeShadow(true, $oc-gray-3, $oc-gray-4);
}

.light-con {
  @include elementsThematomColors('supdark-', true, 6, 9);
  @include elementsThematomColors('dark-', true, 5, 9);
  @include elementsThematomColors('', true, 4, 9);
  @include elementsThematomColors('light-', true, 2, 6);
  @include elementsThemeShadow(true, $oc-gray-4, $oc-gray-5);
}

.dark-def {
  @include elementsThematomColors('supdark-', true, 9, 1);
  @include elementsThematomColors('dark-', true, 8, 1);
  @include elementsThematomColors('', true, 7, 1);
  @include elementsThematomColors('light-', true, 4, 5);
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
