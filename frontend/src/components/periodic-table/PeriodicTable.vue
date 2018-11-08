<template>
  <div id="grid-container-outer">
    <div id="grid-container">
      <div v-if="ready1 && ready2" id="grid-outer">
        <main id="grid">
          <!-- DUPLICATED ELEMENTS FROM PERIODIC TABLE -->
          <div class="element"
               v-for="(placement, index) in placementElementData"
               v-on:mouseover="[setElementPrefix(index, 'dark-'), setLabelColor(index, 'true'), updateActiveElement(index)]"
               v-on:mouseleave="[setElementPrefix(index, ''), setLabelColor(index, 'false'), updateActiveElement(index)]"
               v-on:click="[clickElement(index)]"
               v-bind:class="[placement.column, placement.row, placement.period, placement.group, useElementColorData[index].color]"
          >
            <div v-cloak class="element-inner">
              <p class="secondary-text test">{{ ubiquitousElementData[index].label }}</p>
              <p class="primary-text">{{ ubiquitousElementData[index].abbreviation }}</p>
              <p class="secondary-text">{{ ubiquitousElementData[index].name }}</p>
              <p class="secondary-text"></p>
            </div>
          </div>

          <!-- PERIOD LABELS -->
          <div class="label-period label" v-for="(period, index) in periodLabelData" v-bind:class="[period.row, period.column]">
            <div v-cloak class="label-period-inner label-inner"
                 v-bind:class="periodLabelData[index].color"
                 v-on:mouseover="[highlightSection(index, 'period')]"
                 v-on:mouseleave="[unHighlightSection(index, 'period')]"
                 v-on:click="periodNotification(index)"
            >
              <p class="label-text">{{ period.display }}</p>
            </div>
          </div>

          <!-- GROUP LABELS -->
          <div class="label-group label" v-for="(group, index) in groupLabelData" v-bind:class="[group.row, group.column]">
            <div v-cloak class="label-group-inner label-inner"
                 v-bind:class="groupLabelData[index].color"
                 v-on:mouseover="[highlightSection(index, 'group')]"
                 v-on:mouseleave="[unHighlightSection(index, 'group')]"
                 v-on:click="groupNotification(index)"
            >
              <p class="label-text">{{ group.display }}</p>
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
  import debounce from 'lodash/debounce';
  import axios from 'axios';
  import PerfectScrollbar from 'perfect-scrollbar';

  export default {
    name: 'PeriodicTable',
    data() {
      return {
        ready1: false,
        ready2: false
      }
    },
    created() {
      this.fetchRequiredElementData();
      this.fetchElementColorData();
    },
    mounted() {
      // This controls perfect scrollbar only
      let psPeriodicTable = new PerfectScrollbar('#grid-container', { swipeEasing: true });
      // I don't think this works
      window.addEventListener('resize',
        debounce(psPeriodicTable.update, 50)
      );
    },
    watch: {
      '$route'() {
       // this.fetchElementColorData();
      }
    },
    computed: {
      ...mapGetters([
        // Data for all elements
        'ubiquitousElementData', // This data does not change and is required
        'placementElementData', // For placement of elements

        // Holds color values
        'colorElementDataBlock',
        'colorElementDataClassification',

        // Placement of Period / Group labels
        'periodLabelData',
        'groupLabelData',

        'clickedElement'
      ]),
      allReady: function() {
        return this.ready1 && this.ready2;
      },
      useElementColorData: function() {
        this.fetchElementColorData();
        let route = this.$route.path;
        if(route === '/properties' || route === '/isotopes') {
          return this.$store.state.colorElementDataClassification;
        }
        else if(route === '/electrons' || route === '/orbitals') {
          return this.$store.state.colorElementDataBlock;
        }
      }
    },
    methods: {
      ...mapMutations([
        'updateActiveElement',
        'updateActiveElementForce',
        'clearLabelExcept',
        'setClickedElement',

        'setColorOfAllButOnePeriod',
        'setColorOfAllButOneGroup',
        'setColorOfAllButOneElement',
        'setColorOfOnePeriod',
        'setColorOfOneGroup',
        'setColorOfOneElement',
      ]),
      // FETCHING DATA
      fetchRequiredElementData: function() {
        // Load the placement of the elements and the bare minimum information
        function getElementUbiquitousData() { return axios.get('/data/required-data-ubiquitous.json'); }
        function getElementPlacementData() { return axios.get('/data/required-data-placement.json'); }
        function getPeriodLabelData() { return axios.get('/data/label/period.json'); }
        function getGroupLabelData() { return axios.get('/data/label/group.json'); }

        let that = this;
        axios.all([getElementUbiquitousData(), getElementPlacementData(), getPeriodLabelData(), getGroupLabelData()])
          .then(axios.spread(function(elementUbiquitous, elementPlacement, periodLabelData, groupLabelData) {
            that.$store.commit('setUbiquitousElementData', elementUbiquitous.data);
            that.$store.commit('setPlacementElementData', elementPlacement.data);
            that.$store.commit('setPeriodLabelData', periodLabelData.data);
            that.$store.commit('setGroupLabelData', groupLabelData.data);
            that.ready1 = true;
          }));
      },
      fetchElementColorData: function() {
        let route = this.$route.path;

        let typeOfFetchedColorData;
        if(route === '/properties' || route === '/isotopes') {
          typeOfFetchedColorData = 'color-data-classification';
        }
        else if(route === '/electrons' || route === '/orbitals') {
          typeOfFetchedColorData = 'color-data-block';
        }

        let that = this;
        axios.get('/data/' + typeOfFetchedColorData + '.json')
          .then((response) => {
            if(typeOfFetchedColorData === 'color-data-classification') {
              that.$store.commit('setColorElementDataClassification', response.data);
            }
            else if(typeOfFetchedColorData === 'color-data-block') {
              that.$store.commit('setColorElementDataBlock', response.data);
            }
            that.ready = true;
          })
          .catch((error) => {
            console.log(error);
            return false;
          })
      },

      // OTHER
      // @param #String 'type' can be:
      //   'period'  Want to darken a period
      //   'group'  Want to darken a group
      highlightSection: function(index, type) {
        // Before highlighting the elements, make sure that the period / group labels are not highlighted
        this.clearLabelExcept({ periodExclude: -1, groupExclude: -1, });

        if(type === 'period') {
          let period = index + 1;
          this.setColorOfAllButOnePeriod({ prefix: 'light-', exclude: period });
          this.setColorOfOnePeriod({ prefix: 'dark-',  include: period });
        }
        if(type === 'group') {
          let group = index + 1;
          this.setColorOfAllButOneGroup({ prefix: 'light-', exclude: group });
          this.setColorOfOneGroup({ prefix: 'dark-', include: group });
        }
      },

      // @param #String 'type' can be:
      //   'period'  Want to darken an element period
      //   'group'  Want to darken an element group
      unHighlightSection: function(index, type) {
        if(type === 'period') {
          let period = index + 1;
          this.setColorOfAllButOnePeriod({ prefix: '', exclude: period }); // Light
          this.setColorOfOnePeriod({ prefix: '',  include: period }); // Dark
        }
        if(type === 'group') {
          let group = index + 1;
          this.setColorOfAllButOneGroup({ prefix: '', exclude: group }); // Light
          this.setColorOfOneGroup({ prefix: '', include: group }); // Dark
        }

        // OTHER STUFF TO DO ON UNHIGHLIGHT
        // By 'click' being active, mean that the user clicked on an element, and wants to display that element, even if mouse moves away from element
        // If click is active, on mouse leave of label, show the previous element that was clicked on (because it got 'erased' on mouseover of label)
        if(this.clickedElement.active === true) {
          // Recall that this.clickedElement.period and this.clickedElement.group are NOT indexes; they are actual values
          // We don't want to change color when this.clickedElement.period / group is 0 that value is for groupless elements (lanth. and act. elements)
          // Nor do we want to change color when this.clickedElement.period / group is -1, because that occurs when this.clickedElement.active is false (I think this is already covered, but just a precaution)
          if(this.clickedElement.period > 0) {
            this.periodLabelData[this.clickedElement.period - 1].color = 'dark';
          }
          if(this.clickedElement.group > 0) {
            this.groupLabelData[this.clickedElement.group - 1].color = 'dark';
          }

          this.setColorOfOneElement({ prefix: 'supdark-', i: this.clickedElement.index });
        }
      },

      setElementPrefix(index, prefix) {
        // This if statement is important
        // When user clicks on an element and hovers over a different element, the original element that was clicked
        // on still has prefix 'superdark'
        if(this.clickedElement.index !== index) {
          this.setColorOfOneElement({ prefix: prefix, i: index });
        }
      },

      // Sets the color of a label manually, rather than by CSS hover (
      setLabelColor: function(index, isMouseOver) {
        // isMouseOver is true when the moues is entering an element. isMouesOver is false when the mouse is leaving an element
        // The element that the mouse is entering or leaving is determined by its index in the Vue v-for loop

        // Get the period.json or group value corresponding to the hovered over element (ex. c-11, p-5)
        let periodFull = this.placementElementData[index].period;
        let groupFull = this.placementElementData[index].group;

        // Concatenate period.json or group values to a number (ex. 11, 5)
        let period = this.labelClassToNone(periodFull);
        let group = this.labelClassToNone(groupFull);

        if(this.clickedElement.active === false) {
          // When changing a label color, make sure all others are turned off first
          this.clearLabelExcept({
            periodExclude: -1,
            groupExclude: -1,
          });

          // Only darken the period / group label if the element actually has a valid period.json number (within the actual range of the periodic table)
          // Recall Act. and Lan. have period.json of 0, and they don't have period.json / group labels
          if(period > 0) {
            // Darken the labels if the mouse is entering an element
            if(isMouseOver === 'true') {
              this.periodLabelData[period - 1].color = 'dark';
            }
            // Lighten the labels if the mouse is leaving an element
            else if(isMouseOver === 'false') {
              this.periodLabelData[period - 1].color = 'light';
            }
            else {
              console.warn("Unexpected parameter for isMouseOver passed through setLabelColor.");
            }
          }
          // Only darken the period / group label if the element actually has a valid group number (within the actual range of the periodic table)
          // Recall Act. and Lan. have group of 0, and they don't have period.json / group labels
          if(group > 0) {
            // Darken the labels if the mouse is entering an element
            if(isMouseOver === 'true') {
              this.groupLabelData[group - 1].color = 'dark';
            }
            // Lighten the labels if the moues is leaving an element
            else if(isMouseOver === 'false') {
              this.groupLabelData[group - 1].color = 'light';
            }
            else {
              console.warn("Unexpected parameter for isMouseOver passed through setLabelColor.");
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
        if(this.clickedElement.index === -1 || this.clickedElement.index !== index) {
          this.setClickedElement({
            index: index,
            period: this.labelClassToNone( this.placementElementData[index].period ),
            group: this.labelClassToNone( this.placementElementData[index].group )
          });

          // Sets color of all elements in periodic table
          this.setColorOfAllButOneElement({ prefix: '', exclude: index });
          this.setColorOfOneElement({ prefix: 'supdark-', i: index });
        }
        // If clicking on the same element twice, cancel the 'supdark-' prefix and element hold
        else if(this.clickedElement.index === index) {
          this.setClickedElement({
            active: false,
            index: -1,
            period: -1,
            group: -1,
          });

          // Sets color of all elements in periodic table
          this.setColorOfAllButOneElement({ prefix: '', exclude: index });
          this.setColorOfOneElement({ prefix: 'dark-',  i: index });
        }
      },

      // Converts the period / group label 'g-3', 'p-4' to just the number '3', and '4'
      labelClassToNone: function(labelNumber) {
        return labelNumber.substring(2);
      },
      // OUTPUT: Group 1 / Period 7
      getPeriodGroupName: function(type, number) {
        if(type === 'period') {
          return 'Period ' + number;
        }
        else if(type === 'group') {
          return 'Group ' + number;
        }
      },
      // Sends a notification of the period
      periodNotification: function(index) {
        this.$vs.notify({
          title: this.getPeriodGroupName('period', this.periodLabelData[index].display),
          text: this.periodLabelData[index].name,
          time: 3000
        });
      },
      // Sends a notification of the group
      groupNotification: function(index) {
        this.$vs.notify({
          title: this.getPeriodGroupName('group', this.groupLabelData[index].display),
          text: this.groupLabelData[index].name,
          time: 3000
        });
      }
    }
  }
</script>


<style scoped lang="scss">
  // Variables, mixins, and common components
  @import '../../styles/variables';

  // PERIODIC TABLE \\
  @import './periodic-table.scss';
  @import './periodic-table-theme.scss';

  .light-def {
    @include periodicTableThemeDefault($ld-background, true, $ld-shadow, $ld-shadow-hover);
  }

  .light-con {
    @include periodicTableThemeDefault($lc-background, true, $lc-shadow, $lc-shadow-hover);
  }

  .dark-def {
    @include periodicTableThemeDefault($dd-background, false, $dd-shadow, $dd-shadow-hover);
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
