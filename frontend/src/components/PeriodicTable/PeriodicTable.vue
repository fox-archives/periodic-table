<template>
  <div id="pt" class="has-shadow" v-bind:class="themeType">
    <section v-if="infoLocationType === 'info-unobtrusive'" id="det">
      <li id="unobtrusive-overview">
        <div id="unobtrusive-overview-inner" class="shadowReg">
          <p id="element-icon" v-bind:class="activeElement.color">{{ activeElement.abbreviation }}</p>
          <h3 id="element-name">{{ activeElement.name }}</h3>
        </div>
      </li>
      <li id="unobtrusive-desc">
        <ul id="unobtrusive-desc-left">
          <li class="shadowReg">
              <h4>Atomic Number</h4>
              <p>{{ activeElement.atomicNumber }}</p>
          </li>
          <li class="shadowReg">
            <h4>Atomic Mass</h4>
            <p>{{ activeElement.atomicMass }}</p>
            <p>u</p>
          </li>
          <li class="shadowReg">
            <h4>Discovered By</h4>
            <p>{{ activeElement.discoveredBy }}</p>
          </li>
          <li class="shadowReg">
            <h4>Discovery Date</h4>
            <p>{{ activeElement.discoveryDate }}</p>
          </li>
        </ul>
        <ul id="unobtrusive-desc-right">

        </ul>
      </li>
    </section>

    <div v-if="ready" id="grid-container">
      <main id="grid">
        <!-- DUPLICATED ELEMENTS FROM PERIODIC TABLE -->
        <div class="element-outer"
             v-for="(ePlacement, index) in ePlacements"
             v-on:mouseover="[changeElementAndLabelPrefix(index, 'dark-'), changeLabelColor(index, 'true'), updateActiveElement(index)]"
             v-on:mouseleave="[changeElementAndLabelPrefix(index, ''), changeLabelColor(index, 'false'), updateActiveElement(index)]"
             v-on:click="[clickElement(index)]"
             v-bind:class="[ePlacement.column, ePlacement.row, ePlacement.period, ePlacement.group, eColors[index].color]"
        >
          <div v-cloak class="element-inner">
            <p class="element-secondary-info">{{ ePlacement.eLabel }}</p>
            <p class="element-primary-info">{{ simpleData[index].abbreviation }}</p>
            <p class="element-secondary-info">{{ simpleData[index].name }}</p>
            <p class="element-secondary-info">{{ simpleData[index].atomicMass }}</p>
          </div>
        </div>

        <!-- (INFO OBTRUSIVE) ELEMENT OVERVIEW PANEL -->
        <section v-if="infoLocationType === 'info-obtrusive'" id="element-overview" v-bind:class="activeElement.color" v-cloak>
          <div id="element-overview-inner">
            <p class="element-ov-secondary-info">{{ activeElement.atomicNumber }}</p>
            <p class="element-ov-primary-info">{{ activeElement.abbreviation }}</p>
            <p class="element-ov-secondary-info">{{ activeElement.name }}</p>
            <p class="element-ov-secondary-info">{{ activeElement.atomicMass }}</p>
          </div>
        </section>

        <!-- (INFO OBTRUSIVE) ELEMENT DESCRIPTIONS -->
        <section v-if="infoLocationType === 'info-obtrusive'" id="element-desc" v-bind:class="activeElement.color" v-cloak>
          <div id="element-desc-inner">
            <p class="element-d-primary-info">Discovery Date</p>
            <p class="element-d-secondary-info">{{ activeElement.discoveryDate }}</p>
            <p class="element-d-primary-info">Discovered By</p>
            <p class="element-d-secondary-info">{{ activeElement.discoveredBy }}</p>
          </div>
        </section>


        <!-- PERIOD LABELS -->
        <div class="label-period-outer" v-for="(period, index) in periodData" v-bind:class="[period.row, period.column]">
          <div v-cloak class="label-period-inner"
               v-bind:class="periodData[index].color"
               v-on:mouseover="[highlightSection(index, 'period')]"
               v-on:mouseleave="[unHighlightSection(index, 'period')]"
               v-on:click="periodNotification(index)"
          >
            <p class="label-text">{{ period.display }}</p>
          </div>
        </div>

        <!-- GROUP LABELS -->
        <div class="label-group-outer" v-for="(group, index) in groupData" v-bind:class="[group.row, group.column]">
          <div v-cloak class="label-group-inner"
               v-bind:class="groupData[index].color"
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
</template>

<script type="text/javascript">
  import bus from '../bus.js';
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  import Elements from '../Elements/Elements.vue';

  export default {
    name: 'PeriodicTable',
    methods: {
      ...mapMutations([
        'updateActiveElement',
        'updateActiveElementForce',

        'clearLabelExcept',
        'setActiveElement',

        'setColorOfAllElements',
        'setColorOfAllButOnePeriod',
        'setColorOfAllButOneGroup',
        'setColorOfAllButOneElement',

        'setColorOfOnePeriod',
        'setColorOfOneGroup',
        'setColorOfOneElement'
      ]),

      // @param #String 'type' can be:
      //   'period'  Want to darken a period
      //   'group'  Want to darken a group
      highlightSection: function(index, type) {
        // Before highlighting the elements, make sure that the period / group labels are not highlighted
        this.clearLabelExcept({
          periodExclude: -1,
          groupExclude: -1,
        });

        if(type === 'period') {
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
        if(type === 'group') {
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
        if(type === 'period') {
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
        if(type === 'group') {
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
        if(this.clickedElement.active === true) {
          // Recall that this.clickedElement.period and this.clickedElement.group are NOT indexes; they are actual values
          // We don't want to change color when this.clickedElement.period / group is 0 that value is for groupless elements (lanth. and act. elements)
          // Nor do we want to change color when this.clickedElement.period / group is -1, because that occurs when this.clickedElement.active is false (I think this is already covered, but just a precaution)
          if(this.clickedElement.period > 0) {
            this.periodData[this.clickedElement.period - 1].color = 'dark';
          }
          if(this.clickedElement.group > 0) {
            this.groupData[this.clickedElement.group - 1].color = 'dark';
          }

          this.setColorOfOneElement({
            prefix: 'supdark-',
            i: this.clickedElement.index
          });

          // Vue.set(this.eColors[this.clickedElementIndex], 'color', ('supdark-' + this.eColors[this.clickedElementIndex].color)); old
        }
        // Make element overview and desc normal color
        this.activeElement.color   = this.eColors[index].defaultColor;
      },

      changeElementAndLabelPrefix(index, prefix) {
        // This if statement is important
        // When user clicks on an element and hovers over a different element, the original element that was clicked
        // on still has prefix 'superdark'
        if(this.clickedElement.index !== index) {
          this.setColorOfOneElement({
            prefix: prefix,
            i: index
          });
        }
      },

      changeLabelColor: function(index, isMouseOver) {
        // isMouseOver is true when the moues is entering an element. isMouesOver is false when the mouse is leaving an element
        // The element that the mouse is entering or leaving is determined by its index in the Vue v-for loop

        // Get the period.json or group value corresponding to the hovered over element (ex. c-11, p-5)
        let periodFull = this.ePlacements[index].period;
        let groupFull = this.ePlacements[index].group;

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
              this.periodData[period - 1].color = 'dark';
            }
            // Lighten the labels if the mouse is leaving an element
            else if(isMouseOver === 'false') {
              this.periodData[period - 1].color = 'light';
            }
            else {
              console.log("Unexpected parameter for isMouseOver passed through changeLabelColor.");
            }
          }
          // Only darken the period / group label if the element actually has a valid group number (within the actual range of the periodic table)
          // Recall Act. and Lan. have group of 0, and they don't have period.json / group labels
          if (group > 0) {
            // Darken the labels if the mouse is entering an element
            if(isMouseOver === 'true') {
              this.groupData[group - 1].color = 'dark';
            }
            // Lighten the labels if the moues is leaving an element
            else if(isMouseOver === 'false') {
              this.groupData[group - 1].color = 'light';
            }
            else {
              console.log("Unexpected parameter for isMouseOver passed through changeLabelColor.");
            }
          }
        }
      },
      // When element is clicked, darken it
      clickElement: function(index) {
        // Change element info and label color (in case the mouse does not movein or moveout the element)
        this.clickedElement.active = false;
        this.changeLabelColor(index, 'true');
        this.updateActiveElementForce(index); // This does not require clickedElement.active to be false
        this.clickedElement.active = true;

        // What to do if clicking for the first time, or clicking on a different element
        // Save the index (element index, period.json index, and group index) of the clicked on element
        if(this.clickedElement.index === -1 || this.clickedElement.index !== index) {
          this.clickedElement.index = index;

          this.clickedElement.period = this.labelClassToNone( this.ePlacements[index].period );
          this.clickedElement.group = this.labelClassToNone( this.ePlacements[index].group );


          // Sets color of all elements in periodic table
          this.setColorOfAllElements('');
          this.setColorOfOneElement({
            prefix: 'supdark-',
            i: index
          });
        }
        // What to do if clicking on the same element twice (cancels elementHold)
        else if(this.clickedElement.index === index) {
          this.clickedElement.active = false;
          this.clickedElement.index = -1;
          this.clickedElement.period = -1;
          this.clickedElement.group = -1;

          // Sets colour of all elements in periodic table
          this.setColorOfAllElements('');
          this.setColorOfOneElement({
            prefix: 'dark-',
            i: index
          });
        }
      },
      setSelection: function(index) {
        //
      },


      // Keep Here
      // TODO: Import these as a mixin later
      labelClassToNone: function(labelNumber) {
        return labelNumber.substring(2);
      },
      labelNoneToClass: function(labelNumber, type) {
        // className are the classes that need to be highlighted "p" stands for period.json, "g" stands for group
        if(type === 'period') {
          return 'p-' + (labelNumber);
        }
        else if(type === 'group') {
          return 'g-' + (labelNumber);
        }
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
      periodNotification: function(index) {
        this.$vs.notify({
          title: this.getPeriodGroupName('period', this.periodData[index].display),
          text: this.periodData[index].name,
          time: 3000
        });
      },
      groupNotification: function(index) {
        this.$vs.notify({
          title: this.getPeriodGroupName('group', this.groupData[index].display),
          text: this.groupData[index].name,
          time: 3000
        });
      }
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
        'options',

        // Remove these in place of the options object
        'themeType',
        'infoLocationType',

      ]),

    },
    components: {
      Elements
    },
    created() {
      this.$store.dispatch('loadElementData');

      // TODO: Implement theme change with global Vuex
      // bus.$on('themeChanged', (data) => {
      //   this.themeType = data;
      // });
      // bus.$on('infoLocationChanged', (data) => {
      //   this.infoLocationType = data;
      // });
    }
  }
</script>


<style lang="scss">
  @import 'Styles/variables.scss';
  @import './periodic-table.scss';
  @import './periodic-table-themes.scss';
  @import './generic-elements.scss';
</style>
