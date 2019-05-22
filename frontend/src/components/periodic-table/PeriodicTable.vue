<template>
  <div id="grid-container-outer">
    <div id="grid-container">
      <div v-if="ready" id="grid-outer">
        <main id="grid">
          <!-- DUPLICATED ELEMENTS FROM PERIODIC TABLE -->
          <div
            v-for="(ePlacement, index) in ePlacements"
            class="element"
            :class="[
              ePlacement.column,
              ePlacement.row,
              ePlacement.period,
              ePlacement.group,
              eColors[index].color
            ]"
            @mouseover="
              [
                setElementPrefix(index, 'dark-'),
                setLabelColor(index, 'true'),
                updateActiveElement(index)
              ]
            "
            @mouseleave="
              [
                setElementPrefix(index, ''),
                setLabelColor(index, 'false'),
                updateActiveElement(index)
              ]
            "
            @click="[clickElement(index)]"
          >
            <div v-cloak class="element-inner">
              <p class="secondary-text test">
                {{ ePlacement.eLabel }}
              </p>
              <p class="primary-text">
                {{ simpleData[index].abbreviation }}
              </p>
              <p class="secondary-text">
                {{ simpleData[index].name }}
              </p>
              <p class="secondary-text">
                {{ simpleData[index].atomicMass }}
              </p>
            </div>
          </div>

          <!-- PERIOD LABELS -->
          <div
            v-for="(period, index) in periodData"
            class="label-period label"
            :class="[period.row, period.column]"
          >
            <div
              v-cloak
              class="label-period-inner label-inner"
              :class="periodData[index].color"
              @mouseover="[highlightSection(index, 'period')]"
              @mouseleave="[unHighlightSection(index, 'period')]"
              @click="periodNotification(index)"
            >
              <p class="label-text">
                {{ period.display }}
              </p>
            </div>
          </div>

          <!-- GROUP LABELS -->
          <div
            v-for="(group, index) in groupData"
            class="label-group label"
            :class="[group.row, group.column]"
          >
            <div
              v-cloak
              class="label-group-inner label-inner"
              :class="groupData[index].color"
              @mouseover="[highlightSection(index, 'group')]"
              @mouseleave="[unHighlightSection(index, 'group')]"
              @click="groupNotification(index)"
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

<script type="text/javascript">
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
import PerfectScrollbar from 'perfect-scrollbar';

export default {
  name: 'PeriodicTable',
  watch: {
    $route() {
      this.updateColor();
    }
  },
  created() {
    this.updateColor();
    // Load element data via Axios / Fetch API requests to backend
    this.$store.dispatch('loadElementData');
  },
  mounted() {
    // This controls perfect scrollbar only
    let throttled = false;

    let psPeriodicTable = new PerfectScrollbar('#grid-container', {
      swipeEasing: true // Default
    });

    // On window resize (after some throttling, update size of perfectScroll scrollbar and update size of text))
    window.addEventListener('resize', () => {
      if (!throttled) {
        psPeriodicTable.update();
        throttled = true;
        setTimeout(() => {
          throttled = false;
        }, 50);
      }
    });
  },
  computed: {
    // Mix the getters into computed with object spread operator
    ...mapGetters([
      'simpleData',
      'ePlacements',
      'eColors',
      'periodData',
      'groupData',
      'eDiscovered',

      'ready',

      'activeElement',
      'clickedElement',
      'options'
    ])
  },
  methods: {
    ...mapMutations([
      'updateActiveElement',
      'updateActiveElementForce',

      'clearLabelExcept',
      'setActiveElement',
      'setClickedElement',

      'setColorOfAllElements',
      'setColorOfAllButOnePeriod',
      'setColorOfAllButOneGroup',
      'setColorOfAllButOneElement',

      'setColorOfOnePeriod',
      'setColorOfOneGroup',
      'setColorOfOneElement',

      'setClassLayout'
    ]),
    ...mapActions(['loadElementColors']),
    // @ param none
    // Updates color scheme of the periodic table
    updateColor: function() {
      // console.log('Updating color');
      // console.log(this.$route.path);

      let routePath = this.$route.path.substring(1);
      if (routePath === 'properties' || routePath === 'isotopes') {
        this.loadElementColors({ colorScheme: 'type' });
      } else if (routePath === 'electrons' || routePath === 'orbitals') {
        this.loadElementColors({ colorScheme: 'block' });
      } else {
        this.loadElementColors({ colorScheme: 'type' });
      }
    },

    // @param #String 'type' can be:
    //   'period'  Want to darken a period
    //   'group'  Want to darken a group
    highlightSection: function(index, type) {
      // Before highlighting the elements, make sure that the period / group labels are not highlighted
      this.clearLabelExcept({
        periodExclude: -1,
        groupExclude: -1
      });

      if (type === 'period') {
        let period = index + 1;
        this.setColorOfAllButOnePeriod({
          // ES6: prefix,
          prefix: 'light-', // want this to be light
          exclude: period
        });
        this.setColorOfOnePeriod({
          prefix: 'dark-', // want this to be dark
          include: period
        });
      }
      if (type === 'group') {
        let group = index + 1;
        this.setColorOfAllButOneGroup({
          prefix: 'light-', // want this to be  light
          exclude: group
        });
        this.setColorOfOneGroup({
          prefix: 'dark-', // want this to be dark
          include: group
        });
      }
    },

    // @param #String 'type' can be:
    //   'period'  Want to darken a period
    //   'group'  Want to darken a group
    unHighlightSection: function(index, type) {
      if (type === 'period') {
        let period = index + 1;
        this.setColorOfAllButOnePeriod({
          // ES6: prefix,
          prefix: '', // want this to be light
          exclude: period
        });
        this.setColorOfOnePeriod({
          prefix: '', // want this to be dark
          include: period
        });
      }
      if (type === 'group') {
        let group = index + 1;
        this.setColorOfAllButOneGroup({
          prefix: '', // want this to be  light
          exclude: group
        });
        this.setColorOfOneGroup({
          prefix: '', // want this to be dark
          include: group
        });
      }

      // OTHER STUFF TO DO ON UNHIGHLIGHT
      // By 'click' being active, mean that the user clicked on an element, and wants to display that element, even if mouse moves away from element
      // If click is active, on mouse leave of label, show the previous element that was clicked on (because it got 'erased' on mouseover of label)
      if (this.clickedElement.active === true) {
        // Recall that this.clickedElement.period and this.clickedElement.group are NOT indexes; they are actual values
        // We don't want to change color when this.clickedElement.period / group is 0 that value is for groupless elements (lanth. and act. elements)
        // Nor do we want to change color when this.clickedElement.period / group is -1, because that occurs when this.clickedElement.active is false (I think this is already covered, but just a precaution)
        if (this.clickedElement.period > 0) {
          this.periodData[this.clickedElement.period - 1].color = 'dark';
        }
        if (this.clickedElement.group > 0) {
          this.groupData[this.clickedElement.group - 1].color = 'dark';
        }

        this.setColorOfOneElement({
          prefix: 'supdark-',
          i: this.clickedElement.index
        });
      }
    },

    setElementPrefix(index, prefix) {
      // This if statement is important
      // When user clicks on an element and hovers over a different element, the original element that was clicked
      // on still has prefix 'superdark'
      if (this.clickedElement.index !== index) {
        this.setColorOfOneElement({
          prefix: prefix,
          i: index
        });
      }
    },

    // Sets the color of a label manually, rather than by CSS hover (
    setLabelColor: function(index, isMouseOver) {
      // isMouseOver is true when the moues is entering an element. isMouesOver is false when the mouse is leaving an element
      // The element that the mouse is entering or leaving is determined by its index in the Vue v-for loop

      // Get the period.json or group value corresponding to the hovered over element (ex. c-11, p-5)
      let periodFull = this.ePlacements[index].period;
      let groupFull = this.ePlacements[index].group;

      // Concatenate period.json or group values to a number (ex. 11, 5)
      let period = this.labelClassToNone(periodFull);
      let group = this.labelClassToNone(groupFull);

      if (this.clickedElement.active === false) {
        // When changing a label color, make sure all others are turned off first
        this.clearLabelExcept({
          periodExclude: -1,
          groupExclude: -1
        });

        // Only darken the period / group label if the element actually has a valid period.json number (within the actual range of the periodic table)
        // Recall Act. and Lan. have period.json of 0, and they don't have period.json / group labels
        if (period > 0) {
          // Darken the labels if the mouse is entering an element
          if (isMouseOver === 'true') {
            this.periodData[period - 1].color = 'dark';
          }
          // Lighten the labels if the mouse is leaving an element
          else if (isMouseOver === 'false') {
            this.periodData[period - 1].color = 'light';
          } else {
            console.warn(
              'Unexpected parameter for isMouseOver passed through setLabelColor.'
            );
          }
        }
        // Only darken the period / group label if the element actually has a valid group number (within the actual range of the periodic table)
        // Recall Act. and Lan. have group of 0, and they don't have period.json / group labels
        if (group > 0) {
          // Darken the labels if the mouse is entering an element
          if (isMouseOver === 'true') {
            this.groupData[group - 1].color = 'dark';
          }
          // Lighten the labels if the moues is leaving an element
          else if (isMouseOver === 'false') {
            this.groupData[group - 1].color = 'light';
          } else {
            console.warn(
              'Unexpected parameter for isMouseOver passed through setLabelColor.'
            );
          }
        }
      }
    },

    // When element is clicked, darken it, or undarken it
    clickElement: function(index) {
      // Change element info and label color (in case the mouse does not movein or moveout the element)
      this.clickedElement.active = false;
      this.setLabelColor(index, 'true');
      this.updateActiveElementForce(index); // This does not require clickedElement.active to be false setLabelColor apparently does
      this.clickedElement.active = true;

      // What to do if clicking for the first time, or clicking on a different element
      // Save the index (element index, period.json index, and group index) of the clicked on element
      if (
        this.clickedElement.index === -1 ||
        this.clickedElement.index !== index
      ) {
        this.setClickedElement({
          index: index,
          period: this.labelClassToNone(this.ePlacements[index].period),
          group: this.labelClassToNone(this.ePlacements[index].group)
        });

        // Sets color of all elements in periodic table
        this.setColorOfAllButOneElement({
          prefix: '',
          exclude: index
        });
        this.setColorOfOneElement({
          prefix: 'supdark-',
          i: index
        });
      }
      // If clicking on the same element twice, cancel the 'supdark-' prefix and element hold
      else if (this.clickedElement.index === index) {
        this.setClickedElement({
          active: false,
          index: -1,
          period: -1,
          group: -1
        });

        // Sets color of all elements in periodic table
        this.setColorOfAllButOneElement({
          prefix: '',
          exclude: index
        });
        this.setColorOfOneElement({
          prefix: 'dark-',
          i: index
        });
      }
    },

    // Converts the period / group label 'g-3', 'p-4' to just the number '3', and '4'
    labelClassToNone: function(labelNumber) {
      return labelNumber.substring(2);
    },
    // OUTPUT: Group 1 / Period 7
    getPeriodGroupName: function(type, number) {
      if (type === 'period') {
        return 'Period ' + number;
      } else if (type === 'group') {
        return 'Group ' + number;
      }
    },
    // Sends a notification of the period
    periodNotification: function(index) {
      this.$vs.notify({
        title: this.getPeriodGroupName(
          'period',
          this.periodData[index].display
        ),
        text: this.periodData[index].name,
        time: 3000
      });
    },
    // Sends a notification of the group
    groupNotification: function(index) {
      this.$vs.notify({
        title: this.getPeriodGroupName('group', this.groupData[index].display),
        text: this.groupData[index].name,
        time: 3000
      });
    }
  }
};
</script>

<style scoped lang="scss">
// Variables, mixins, and common components
@import '../../styles/variables';

// PERIODIC TABLE \\
@import './periodic-table.scss';
@import './periodic-table-theme.scss';

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
@import './elements.scss';
@import './elements-theme.scss';

.light-def {
  @include elementsThemeColors('supdark-', true, 4, 9);
  @include elementsThemeColors('dark-', true, 3, 9);
  @include elementsThemeColors('', true, 2, 9);
  @include elementsThemeColors('light-', true, 1, 6);
  @include elementsThemeShadow(true, $oc-gray-3, $oc-gray-4);
}

.light-con {
  @include elementsThemeColors('supdark-', true, 6, 9);
  @include elementsThemeColors('dark-', true, 5, 9);
  @include elementsThemeColors('', true, 4, 9);
  @include elementsThemeColors('light-', true, 2, 6);
  @include elementsThemeShadow(true, $oc-gray-4, $oc-gray-5);
}

.dark-def {
  @include elementsThemeColors('supdark-', true, 9, 1);
  @include elementsThemeColors('dark-', true, 8, 1);
  @include elementsThemeColors('', true, 7, 1);
  @include elementsThemeColors('light-', true, 4, 5);
  @include elementsThemeShadow(false, $oc-gray-8, $oc-gray-7);
}

// LABELS \\
@import './labels.scss';
@import './labels-theme.scss';

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
