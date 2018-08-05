<template>
  <div id="pt" class="has-shadow" v-bind:class="themeType">
    <!-- (INFO UNOBTRUSIVE) ELEMENT OVERVIEW PANEL -->
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
             v-on:mouseover="[setElementColor(index, 'dark-'), changeLabelColor(index, 'true'), updateElementInfoAndDesc(index)]"
             v-on:mouseleave="[setElementColor(index, ''), changeLabelColor(index, 'false'), updateElementInfoAndDesc(index)]"
             v-on:click="[clickElement(index), updateElementInfoAndDesc(index)]"
             v-bind:class="[ePlacement.column, ePlacement.row, ePlacement.period, ePlacement.group, eColors[index].color]"
        >
          <div v-cloak class="element-inner">
            <p class="element-atomicNumber element-secondary-info">{{ ePlacement.eLabel }}</p>
            <p class="element-abbreviation element-primary-info">{{ simpleData[index].abbreviation }}</p>
            <p class="element-name element-secondary-info">{{ simpleData[index].name }}</p>
            <p class="element-atomicMass element-secondary-info">{{ simpleData[index].atomicMass }}</p>
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
            <p id="element-d-discovery-date" class="element-d-primary-info">Discovery Date</p>
            <p id="element-discovery-date" class="element-d-secondary-info">{{ activeElement.discoveryDate }}</p>
            <p id="element-d-discoverer" class="element-d-primary-info">Discovered By </p>
            <p id="element-discoverer" class="element-d-secondary-info">{{ activeElement.discoveredBy }}</p>
          </div>
        </section>


        <!-- PERIOD LABELS -->
        <div class="label-period-outer" v-for="(period, index) in periodData" v-bind:class="[period.row, period.column]">
          <div v-cloak class="label-period-inner"
               v-bind:class="periodData[index].color"
               v-on:mouseover="[darkenElements(index, 'dark-', 'period'), lightenElements(index, 'light-', 'period', 'p-'), maintenanceAfter(index, 'mouseOver')]"
               v-on:mouseleave="[darkenElements(index, '', 'period'), lightenElements(index, '', 'period', 'p-'), maintenanceAfter(index, 'mouseLeave')]"
               v-on:click="periodNotification(index)"
          >
            <p class="label-text">{{ period.display }}</p>
          </div>
        </div>

        <!-- GROUP LABELS -->
        <div class="label-group-outer" v-for="(group, index) in groupData" v-bind:class="[group.row, group.column]">
          <div v-cloak class="label-group-inner"
               v-bind:class="groupData[index].color"
               v-on:mouseover="[darkenElements(index, 'dark-', 'group'), lightenElements(index, 'light-', 'group', 'g-'), maintenanceAfter(index, 'mouseOver')]"
               v-on:mouseleave="[darkenElements(index, '', 'group'), lightenElements(index, '', 'group', 'g-'), maintenanceAfter(index, 'mouseLeave')]"
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
      darkenElements: function(state, index, prefix, type) {
        // On hover, clear all other label highlights
        this.$store.commit('clearLabelExcept', {
          periodExlucde: -1,
          groupExclude: - 1
        });
        //state.clearLabelExcept(-1, -1); old


        // Change element description and shade on hover of period / group label
        // This only works if info-obtrusive. That way, when hovering over a period / group label,
        // the obtrusive element info and desc become light
        if(this.options.infoLocationType === "info-obtrusive") {
          this.$store.commit('setActiveElement', {
            color: 'light-' + this.eColors[this.activeElement.index].defaultColor
          });

          // This code was actually moved to defaultToLight (
          //this.activeElement.color = 'light-' + this.eColors[state.hoverIndex].defaultColor; old

        }

        // Leave this for now
        let className = this.labelNoneToClass(index + 1, type);


        // Get elements that need to be lightened (elements to be lightened either in a period or group)
        if(type === 'period') {
          for(let i = 0; i < this.ePlacements.length; i++) {
            if(this.ePlacements[i].period === className) {
              let defaultColor = this.eColors[i].defaultColor;
              // TODO: Make this a mutator
              Vue.set(this.eColors[i], 'color', (prefix + defaultColor))
            }
          }
        }
        else if(type === "group") {
          for(let i = 0; i < this.ePlacements.length; i++) {
            if(this.ePlacements[i].group === className) {
              let defaultColor = state.eColors[i].defaultColor;
              Vue.set(this.eColors[i], 'color', (prefix + defaultColor))
            }
          }
        }
      },
      // Changes shade of hovered element (lighten or darken, or default)
      setElementColor: function(state, index, shade) {
        if(state.clickedElementIndex !== index) {
          // Gets current default color
          let defaultColor = state.eColors[index].defaultColor;

          // Sets current default color ('color' is the property we want to change)
          Vue.set(state.eColors[index], 'color', (shade + defaultColor));
        }
      },
      // Similar to setElementColor, but does it by force (sets color even if ths.clickedElementIndex is not the same as the index)
      setElementColorForce: function(state, index, shade) {
        // Gets current default color
        let defaultColor = state.eColors[index].defaultColor;

        // Sets current default color
        Vue.set(state.eColors[index], 'color', (shade + defaultColor));
      },
      // Sets the color of all elements (usually the default color)
      setAllElementsColor: function(state, shade) {
        for(let i = 0; i < state.eColors.length; i++) {
          if(i !== state.clickedElementIndex) {
            let defaultColor = state.eColors[i].defaultColor;
            Vue.set(state.eColors[i], 'color', (shade + defaultColor));
          }
        }
      },
      lightenElements: function(state, index, prefix, type, typeShort) {

        let className = state.labelNoneToClass(index + 1, type);

        // Get elements that need to be lighened (elements to be lightened either in a period.json or group)
        if(type === "period") {
          for(let i = 0; i < state.ePlacements.length; i++) {
            if(state.ePlacements[i].period !== className) {
              let defaultColor = state.eColors[i].defaultColor;
              Vue.set(state.eColors[i], 'color', (prefix + defaultColor))
            }
          }
        }
        else if(type === "group") {
          for(let i = 0; i < state.ePlacements.length; i++) {
            if(state.ePlacements[i].group !== className) {
              let defaultColor = state.eColors[i].defaultColor;
              Vue.set(state.eColors[i], 'color', (prefix + defaultColor))
            }
          }
        }
      },
      changeLabelColor: function(state, index, isMouseOver) {
        // isMouseOver is true when the moues is entering an element. isMouesOver is false when the mouse is leaving an element
        // The element that the mouse is entering or leaving is determined by its index in the Vue v-for loop

        // Get the period.json or group value corresponding to the hovered over element (ex. c-11, p-5)
        let periodFull = state.ePlacements[index].period;
        let groupFull = state.ePlacements[index].group;

        // Concatenate period.json or group values to a number (ex. 11, 5)
        let period = state.labelClassToNone(periodFull);
        let group = state.labelClassToNone(groupFull);

        if(state.clickActive === false) {
          // When changing a label color, make sure all others are turned off first
          this.$store.commit('clearLabelExcept', {
            periodExclude: -1,
            groupExclude: -1,
          });
          //state.clearLabelExcept(-1, -1); old

          // Only darken the label if the element actually has a valid period.json number (within the actual range of the periodic table)
          // Recall Act. and Lan. have period.json of 0, and they don't have period.json / group labels
          if(period > 0) {
            // Darken the labels if the mouse is entering an element
            if(isMouseOver === "true") {
              state.periodData[period - 1].color = "dark";
            }
            // Lighten the labels if the mouse is leaving an element
            else if(isMouseOver === "false") {
              state.periodData[period - 1].color = "light";
            }
            else {
              console.log("Unexpected parameter for isMouseOver passed through changeLabelColor.");
            }
          }
          // Only darken the label if the element actually has a valid group number (within the actual range of the periodic table)
          // Recall Act. and Lan. have group of 0, and they don't have period.json / group labels
          if (group > 0) {
            // Darken the labels if the mouse is entering an element
            if(isMouseOver === "true") {
              state.groupData[group - 1].color = "dark";
            }
            // Lighten the labels if the moues is leaving an element
            else if(isMouseOver === "false") {
              state.groupData[group - 1].color = "light";
            }
            else {
              console.log("Unexpected parameter for isMouseOver passed through changeLabelColor.");
            }
          }
        }
      },
      // type can either be "mouesOver" or "mouseLeave"
      maintenanceAfter: function(state, index, type) {
        if(type === "mouseLeave") {
          // By 'click' being active, mean that the user clicked on an element, and wants to display that element, even if mouse moves away from element
          // If click is active, on mouse leave of label, show the previous element that was clicked on (because it got 'erased' on mouseover of label)
          if(state.clickActive === true) {
            // Recall that state.clickedElementPeriod and state.clickedElementGroup are NOT indexes; they are actual values
            // We don't want to change color when state.clickedElementPeriod / group is 0 that value is for groupless elements (lanth. and act. elements)
            // Nor do we want to change color when state.clickedElementPeriod / group is -1, because that occurs when state.clickActive is false (I think state is already covered, but just a precaution)
            if(state.clickedElementPeriod > 0) {
              state.periodData[state.clickedElementPeriod - 1].color = "dark";
            }
            if(state.clickedElementGroup > 0) {
              state.groupData[state.clickedElementGroup - 1].color = "dark";
            }
            Vue.set(state.eColors[state.clickedElementIndex], 'color', ("supdark-" + state.eColors[state.clickedElementIndex].color));
          }
          // Make element overview and desc normal color
          state.hoverColor = state.eColors[state.hoverIndex].defaultColor;
        }
      },

      // When element is clicked, darken it
      clickElement: function(state, index) {
        // Change element info and label color (in case the mouse does not movein or moveout the element)
        state.clickActive = false;
        this.changeLabelColor(index, "true");
        this.updateElementInfoAndDesc(index);
        state.clickActive = true;

        // What to do if clicking for the first time, or clicking on a different element
        // Save the index (element index, period.json index, and group index) of the clicked on element
        if(state.clickedElementIndex === -1 || state.clickedElementIndex !== index) {
          state.clickedElementIndex = index;

          state.clickedElementPeriod = state.labelClassToNone( state.ePlacements[index].period );
          state.clickedElementGroup = state.labelClassToNone( state.ePlacements[index].group );


          // Sets color of all elements in periodic table
          state.setAllElementsColor('');
          state.setElementColorForce(index, "supdark-");
        }
        // What to do if clicking on the same element twice (cancels elementHold)
        else if(state.clickedElementIndex === index) {
          state.clickActive = false;
          state.clickedElementIndex = -1;
          state.clickedElementPeriod = -1;
          state.clickedElementGroup = -1;

          // Sets colour of all elements in periodic table
          state.setAllElementsColor('');
          state.setElementColorForce(index, "dark-");
        }
      },


      // Keep Here
      // TODO: Import this as a mixin later
      labelClassToNone: function(state, labelNumber) {
        return labelNumber.substring(2);
      },
      labelNoneToClass: function(state, labelNumber, type) {
        // className are the classes that need to be highlighted "p" stands for period.json, "g" stands for group
        if(type === "period") {
          return "p-" + (labelNumber);
        }
        else if(type === "group") {
          return "g-" + (labelNumber);
        }
      },
      // OUTPUT: Group 1 / Period 7
      getPeriodGroupName: function(state, type, number) {
        if(type === "period") {
          return "Period " + number;
        }
        else if(type === "group") {
          return "Group " + number;
        }
      },
      periodNotification: function(state, index) {
        state.$vs.notify({
          title: this.getPeriodGroupName('period', state.periodData[index].display),
          text: state.periodData[index].name,
          time: 3000
        });
      },
      groupNotification: function(state, index) {
        state.$vs.notify({
          title: this.getPeriodGroupName('group', state.groupData[index].display),
          text: state.groupData[index].name,
          time: 3000
        });
      }
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
    methods: {
      ...mapMutations([
        'updateActiveElement',
        'updateActiveElementForce',
        'clearLabelExcept'

      ]),
      updateElementInfoAndDesc(index) {
        this.$store.commit('updateElementInfoAndDesc', index);
      },
      darkenElements(index, prefix, type) {
        this.$store.commit('darkenElements', index, prefix, type);
      },
      setElementColor(index, shade) {
        this.$store.commit('setElementColor', index, shade);
      },

    },
    components: {
      Elements
    }
  }
</script>


<style lang="scss">
  @import 'Styles/variables.scss';
  @import './periodic-table.scss';
  @import './periodic-table-themes.scss';
  @import './generic-elements.scss';
</style>
