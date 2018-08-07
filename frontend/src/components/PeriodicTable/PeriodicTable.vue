<template>
  <div id="pt" class="has-shadow" v-bind:class="themeType">
      <button @click="setColorOfAllButOneGroup({
      prefix: 'light-',
      exclude: 7
      })">Press to Test</button>
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
             v-on:mouseover="[setElementColor(index, 'dark-'), changeLabelColor(index, 'true'), updateActiveElement(index)]"
             v-on:mouseleave="[setElementColor(index, ''), changeLabelColor(index, 'false'), updateActiveElement(index)]"
             v-on:click="[clickElement(index), updateActiveElement(index)]"
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
               v-on:mouseover="[highlightSection(index, 'period'), maintenanceAfter(index, 'mouseOver')]"
               v-on:mouseleave="[highlightSection(index, 'period'), maintenanceAfter(index, 'mouseLeave')]"
               v-on:click="periodNotification(index)"
          >
            <p class="label-text">{{ period.display }}</p>
          </div>
        </div>

        <!-- GROUP LABELS -->
        <div class="label-group-outer" v-for="(group, index) in groupData" v-bind:class="[group.row, group.column]">
          <div v-cloak class="label-group-inner"
               v-bind:class="groupData[index].color"
               v-on:mouseover="[highlightSection(index, 'group'), maintenanceAfter(index, 'mouseOver')]"
               v-on:mouseleave="[highlightSection(index, 'group'), maintenanceAfter(index, 'mouseLeave')]"
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
        'setActiveElements',
        'setColorOfElement',
        'setColorOfPeriod',
        'setColorOfGroup',
        'setColorOfAllButOnePeriod',
        'setColorOfAllButOneGroup'

      ]),

      // @param #String 'type' can be:
      //   'period'  Want to darken a period
      //   'group'  Want to darken a group
      highlightSection: function(index, type) {
        if(type === 'period') {
          let period = index + 1;
          this.setColorOfAllButOnePeriod({
            // ES6: prefix,
            prefix: 'light-', // want this to be light
            exclude: period
          });
          this.setColorOfPeriod({
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
          this.setColorOfGroup({
            prefix: 'dark-', // want this to be dark
            include: group
          });
        }
        /*
        // On hover, clear all other label highlights
        this.$store.commit('clearLabelExcept', {
          periodExlucde: -1,
          groupExclude: - 1
        });
        // state.clearLabelExcept(-1, -1); old


        // Change element description and shade on hover of period / group label
        // This only works if info-obtrusive. That way, when hovering over a period / group label,
        // the obtrusive element info and desc become light
        if(this.options.infoLocationType === "info-obtrusive") {
          this.$store.commit('setActiveElement', {
            color: 'light-' + this.eColors[this.activeElement.index].defaultColor
          });

          // This code was actually moved to defaultToLight (
          // this.activeElement.color = 'light-' + this.eColors[state.hoverIndex].defaultColor; old

        }

        // Leave this for now
        let className = this.labelNoneToClass(index + 1, type);


        // Get elements that need to be lightened (elements to be lightened either in a period or group)
        if(type === 'period') {
          for(let i = 0; i < this.ePlacements.length; i++) {
            if(this.ePlacements[i].period === className) {
              this.$store.commit('setColorOfElement', {
                prefix: prefix,
                i: i
              });

              // let defaultColor = this.eColors[i].defaultColor; old
              // Vue.set(this.eColors[i], 'color', (prefix + defaultColor)); old
            }
          }
        }
        else if(type === 'group') {
          for(let i = 0; i < this.ePlacements.length; i++) {
            if(this.ePlacements[i].group === className) {
              this.$store.commit('setColorOfElement', {
                prefix: prefix,
                i: i
              });

              // let defaultColor = this.eColors[i].defaultColor; old
              // Vue.set(this.eColors[i], 'color', (prefix + defaultColor)); old
            }
          }
        }
        */
      },

      lightenElements: function(index, prefix, type) {

        /*
        let className = this.labelNoneToClass(index + 1, type);

        // Get elements that need to be lightened (elements to be lightened either in a period.json or group)
        if(type === 'period') {
          for(let i = 0; i < this.ePlacements.length; i++) {
            if(this.ePlacements[i].period !== className) {
              this.$store.commit('setColorOfElement', {
                prefix: prefix,
                i: i
              });

              // let defaultColor = this.eColors[i].defaultColor;
              // Vue.set(this.eColors[i], 'color', (prefix + defaultColor))
            }
          }
        }
        else if(type === 'group') {
          for(let i = 0; i < this.ePlacements.length; i++) {
            if(this.ePlacements[i].group !== className) {
              this.$store.commit('setColorOfElement', {
                prefix: prefix,
                i: i
              });

              // let defaultColor = this.eColors[i].defaultColor; old
              // Vue.set(this.eColors[i], 'color', (prefix + defaultColor)) old
            }
          }
        }
        */
      },

      // Changes shade of hovered element (lighten or darken, or default)
      // TODO: Make all references of this method to the Vuex store mutator
      setElementColor: function(index, shade) {
        if(this.clickedElement.index !== index) {
          this.$store.commit('setColorOfElement', {
            prefix: shade,
            i: index
          });

          // // OLD
          // // Gets current default color
          // let defaultColor = this.eColors[index].defaultColor;
          //
          // // Sets current default color ('color' is the property we want to change)
          // Vue.set(this.eColors[index], 'color', (shade + defaultColor));
        }
      },
      // Similar to setElementColor, but does it by force (sets color even if this.clickedElement.index is not the same as the index)
      setElementColorForce: function(index, shade) {
        this.$store.commit('setColorOfElement', {
          prefix: shade,
          i: index
        });

        // // OLD
        // // Gets current default color
        // let defaultColor = this.eColors[index].defaultColor;
        //
        // // Sets current default color
        // Vue.set(this.eColors[index], 'color', (shade + defaultColor));
      },
      // Sets the color of all elements (usually the default color)
      setAllElementsColor: function(shade) {
        for(let i = 0; i < this.eColors.length; i++) {
          if(i !== this.clickedElement.index) {
            this.$store.commit('setColorOfElement', {
              prefix: shade,
              i: i
            });

            // let defaultColor = this.eColors[i].defaultColor; OLD
            // Vue.set(this.eColors[i], 'color', (shade + defaultColor)); OLD
          }
        }
      },
      changeLabelColor: function(index, isMouseOver) {
        // isMouseOver is true when the moues is entering an element. isMouesOver is false when the mouse is leaving an element
        // The element that the mouse is entering or leaving is determined by its index in the Vue v-for loop

        // Get the period.json or group value corresponding to the hovered over element (ex. c-11, p-5)
        let periodFull = this.ePlacements[index].period;
        let groupFull = this.ePlacements[index].group;
        //console.log('Change Label Color Called');
        //console.log(periodFull + ' ' + groupFull);

        // Concatenate period.json or group values to a number (ex. 11, 5)
        let period = this.labelClassToNone(periodFull);
        let group = this.labelClassToNone(groupFull);

        if(this.clickActive === false) {
          // When changing a label color, make sure all others are turned off first
          this.$store.commit('clearLabelExcept', {
            periodExclude: -1,
            groupExclude: -1
          });
          // this.clearLabelExcept(-1, -1); old

          // Only darken the label if the element actually has a valid period.json number (within the actual range of the periodic table)
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
          // Only darken the label if the element actually has a valid group number (within the actual range of the periodic table)
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
      // type can either be "mouesOver" or "mouseLeave"
      maintenanceAfter: function(index, type) {
        if(type === 'mouseLeave') {
          // By 'click' being active, mean that the user clicked on an element, and wants to display that element, even if mouse moves away from element
          // If click is active, on mouse leave of label, show the previous element that was clicked on (because it got 'erased' on mouseover of label)
          if(this.clickActive === true) {
            // Recall that this.clickedElement.period and this.clickedElement.group are NOT indexes; they are actual values
            // We don't want to change color when this.clickedElement.period / group is 0 that value is for groupless elements (lanth. and act. elements)
            // Nor do we want to change color when this.clickedElement.period / group is -1, because that occurs when this.clickActive is false (I think this is already covered, but just a precaution)
            if(this.clickedElement.period > 0) {
              this.periodData[this.clickedElement.period - 1].color = 'dark';
            }
            if(this.clickedElement.group > 0) {
              this.groupData[this.clickedElement.group - 1].color = 'dark';
            }

            Vue.set(this.eColors[this.clickedElement.index], 'color', ('supdark-' + this.eColors[this.clickedElement.index].color));
            // Vue.set(this.eColors[this.clickedElementIndex], 'color', ('supdark-' + this.eColors[this.clickedElementIndex].color)); old
          }
          // Make element overview and desc normal color
          this.hoverColor = this.eColors[this.activeElement.index].defaultColor;
        }
      },

      // When element is clicked, darken it
      clickElement: function(index) {
        // Change element info and label color (in case the mouse does not movein or moveout the element)
        this.clickedElement.active = false;
        this.changeLabelColor(index, 'true');
        this.updateActiveElement(index);
        this.clickedElement.active = true;

        // What to do if clicking for the first time, or clicking on a different element
        // Save the index (element index, period.json index, and group index) of the clicked on element
        if(this.clickedElement.active === -1 || this.clickedElement.active !== index) {
          this.clickedElement.active = index;

          this.clickedElement.period = this.labelClassToNone( this.ePlacements[index].period );
          this.clickedElement.group = this.labelClassToNone( this.ePlacements[index].group );


          // Sets color of all elements in periodic table
          this.setAllElementsColor('');
          this.setElementColorForce(index, 'supdark-');
        }
        // What to do if clicking on the same element twice (cancels elementHold)
        else if(this.clickedElement.index === index) {
          this.clickActive = false;
          this.clickedElement.index = -1;
          this.clickedElement.period = -1;
          this.clickedElement.group = -1;

          // Sets colour of all elements in periodic table
          this.setAllElementsColor('');
          this.setElementColorForce(index, 'dark-');
        }
      },


      // Keep Here
      // TODO: Import this as a mixin later
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
      },

      /*
      getElementPeriod: function(index) {
        // This is the full period (ex. p-0, p-3)
        let fullPeriod = this.ePlacements[index].period;
        console.log(fullPeriod);

        // We want to return the period in a numerical form, without 'p-'
        return Number(this.labelClassToNone(fullPeriod));
      },
      getElementGroup: function(index) {
        // This is the full group (ex. g-0, g-5)
        let fullGroup = this.ePlacements[index].group;

        // We want to return the group in a numerical form, without 'g-'
        return Number(this.labelClassToNone(fullGroup));
      }
      */
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
