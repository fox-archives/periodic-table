<template>
  <div id="pt" class="has-shadow" v-bind:class="themeType">
    <!-- (INFO UNOBTRUSIVE) ELEMENT OVERVIEW PANEL -->
    <section v-if="infoLocationType === 'info-unobtrusive'" id="det">
      <li id="unobtrusive-overview">
        <div id="unobtrusive-overview-inner" class="shadowReg">
          <p id="element-icon" v-bind:class="hoverColor">{{ hoverAbbreviation }}</p>
          <h3 id="element-name">{{ hoverName }}</h3>
        </div>
      </li>
      <li id="unobtrusive-desc">
        <ul id="unobtrusive-desc-left">
          <li class="shadowReg">
              <h4>Atomic Number</h4>
              <p>{{ hoverAtomicNumber }}</p>
          </li>
          <li class="shadowReg">
            <h4>Atomic Mass</h4>
            <p>{{ hoverAtomicMass }}</p>
            <p>u</p>
          </li>
          <li class="shadowReg">
            <h4>Discovered By</h4>
            <p>{{ hoverDiscoveredBy }}</p>
          </li>
          <li class="shadowReg">
            <h4>Discovery Date</h4>
            <p>{{ hoverDiscoveryDate }}</p>
          </li>
        </ul>
        <ul id="unobtrusive-desc-right">

        </ul>
      </li>

    </section>

    <div v-if="ready" id="grid-container">

      <!-- TEMPORARY ELEMENTS (WILL LATER ADD IN COMPONENT FOR THIS -->
      <!-- DUPLICATED ELEMENTS FROM PERIODIC TABLE -->
      <div class="element-outer"
           v-for="(ePlacement, index) in 10"
           v-on:mouseover="[setElementColor(index, 'dark-'), changeLabelColor(index, 'true'), updateElementInfoAndDesc(index)]"
           v-on:mouseleave="[setElementColor(index, ''), changeLabelColor(index, 'false'), updateElementInfoAndDesc(index)]"
           v-on:click="[clickElement(index), updateElementInfoAndDesc(index)]"
           v-bind:class="[ePlacement.column, ePlacement.row, ePlacement.period, ePlacement.group, eColors[index].color]"
      >
        <div v-cloak class="element-inner">
          <p class="element-atomicNumber element-secondary-info">{{ simpleData[index].eLabel }}</p>
          <p class="element-abbreviation element-primary-info">{{ simpleData[index].abbreviation }}</p>
          <p class="element-name element-secondary-info">{{ simpleData[index].name }}</p>
          <p class="element-atomicMass element-secondary-info">{{ simpleData[index].atomicMass }}</p>
        </div>
      </div>

      <main id="grid">
        <!-- (INFO OBTRUSIVE) ELEMENT OVERVIEW PANEL -->
        <section v-if="infoLocationType === 'info-obtrusive'" id="element-overview" v-bind:class="hoverColor" v-cloak>
            <div id="element-overview-inner">
              <p class="element-ov-secondary-info">{{ hoverAtomicNumber }}</p>
              <p class="element-ov-primary-info">{{ hoverAbbreviation }}</p>
              <p class="element-ov-secondary-info">{{ hoverName }}</p>
              <p class="element-ov-secondary-info">{{ hoverAtomicMass }}</p>
            </div>
        </section>

        <!-- (INFO OBTRUSIVE) ELEMENT DESCRIPTIONS -->
        <section v-if="infoLocationType === 'info-obtrusive'" id="element-desc" v-bind:class="hoverColor" v-cloak>
          <div id="element-desc-inner">
            <p id="element-d-discovery-date" class="element-d-primary-info">Discovery Date</p>
            <p id="element-discovery-date" class="element-d-secondary-info">{{ hoverDiscoveryDate }}</p>
            <p id="element-d-discoverer" class="element-d-primary-info">Discovered By </p>
            <p id="element-discoverer" class="element-d-secondary-info">{{ hoverDiscoveredBy }}</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script type="text/javascript">
  import bus from '../bus.js';
  import axios from 'axios';

  export default {
    name: 'PeriodicTable',
    data() {
      return {
        // Simple data about each element
        simpleData: [],

        // Placement of Each Element
        ePlacements: [],

        // Placement and data of each Period and Group Label
        periodData: [],
        groupData: [],

        eColors: [],
        ready: true,

        // Element Defaults
        hoverAtomicNumber: '1',
        hoverAbbreviation: 'H',
        hoverName: 'Hydrogen',
        hoverAtomicMass: 1.008,
        hoverBlock: 's',
        hoverColor: 'blue', // This actually changes the color
        hoverDiscoveryDate: '1766',
        hoverDiscoveredBy: 'Henry Cavendish',
        hoverIndex: 0,

        clickActive: false,

        // When user clicks, want to make clicked element darker than if it was highlighted
        clickedElementIndex: -1,
        clickedElementPeriod: -1,
        clickedElementGroup: -1,

        themeType: 'light-def',
        infoLocationType: 'info-obtrusive'
      }
    },
    methods: {
      updateElementInfoAndDesc: function(index) {
        // Do not add one to index because v-for array starts at 0 and, trying to get the element at a certain position in v-for array loop
        if(this.clickActive === false) {
          this.hoverIndex = index;
          // Update element overview (left box)
          this.hoverAtomicNumber = this.elements[index].eLabel;
          this.hoverAbbreviation = this.elements[index].abbreviation;
          this.hoverName = this.elements[index].name;
          this.hoverAtomicMass = this.elements[index].atomicMass;

          // Update element description (right box)
          this.hoverDiscoveryDate = this.elements[index].discoveryDate;
          this.hoverDiscoveredBy = this.elements[index].discoveredBy;
          this.hoverColor = this.eColors[index].defaultColor;
        }
      },
      darkenElements: function(index, prefix, type) {
        // On hover, clear all other label highlights
        this.clearLabelExcept(-1, -1);
        // Change element description and shade on hover of label (only if element description is inside)
        if(this.infoLocationType === "info-obtrusive") {
          this.hoverColor = "light-" + this.eColors[this.hoverIndex].defaultColor;
        }

        let className = this.labelNoneToClass(index + 1, type);

        // Get elements that need to be lightened (elements to be lightened either in a period.json or group)
        if(type === "period") {
          for(let i = 0; i < this.elements.length; i++) {
            if(this.elements[i].period === className) {
              let defaultColor = this.eColors[i].defaultColor;
              Vue.set(this.eColors[i], 'color', (prefix + defaultColor))
            }
          }
        }
        else if(type === "group") {
          for(let i = 0; i < this.elements.length; i++) {
            if(this.elements[i].group === className) {
              let defaultColor = this.eColors[i].defaultColor;
              Vue.set(this.eColors[i], 'color', (prefix + defaultColor))
            }
          }
        }
      },
      // Changes shade of hovered element (lighten or darken, or default)
      setElementColor: function(index, shade) {
        if(this.clickedElementIndex !== index) {
          // Gets current default color
          let defaultColor = this.eColors[index].defaultColor;

          // Sets current default color ('color' is the property we want to change)
          Vue.set(this.eColors[index], 'color', (shade + defaultColor));
        }
      },
      // Similar to setElementColor, but does it by force (sets color even if ths.clickedElementIndex is not the same as the index)
      setElementColorForce: function(index, shade) {
        // Gets current default color
        let defaultColor = this.eColors[index].defaultColor;

        // Sets current default color
        Vue.set(this.eColors[index], 'color', (shade + defaultColor));
      },
      // Sets the color of all elements (usually the default color)
      setAllElementsColor: function(shade) {
        for(var i = 0; i < this.eColors.length; i++) {
          if(i !== this.clickedElementIndex) {
            var defaultColor = this.eColors[i].defaultColor;
            Vue.set(this.eColors[i], 'color', (shade + defaultColor));
          }
        }
      },

      lightenElements: function(index, prefix, type, typeShort) {
        let className = this.labelNoneToClass(index + 1, type);

        // Get elements that need to be lighened (elements to be lightened either in a period.json or group)
        if(type === "period") {
          for(let i = 0; i < this.elements.length; i++) {
            if(this.elements[i].period !== className) {
              var defaultColor = this.eColors[i].defaultColor;
              Vue.set(this.eColors[i], 'color', (prefix + defaultColor))
            }
          }
        }
        else if(type === "group") {
          for(let i = 0; i < this.elements.length; i++) {
            if(this.elements[i].group !== className) {
              let defaultColor = this.eColors[i].defaultColor;
              Vue.set(this.eColors[i], 'color', (prefix + defaultColor))
            }
          }
        }
      },
      changeLabelColor: function(index, isMouseOver) {
        // isMouseOver is true when the moues is entering an element. isMouesOver is false when the mouse is leaving an element
        // The element that the mouse is entering or leaving is determined by its index in the Vue v-for loop

        // Get the period.json or group value corresponding to the hovered over element (ex. c-11, p-5)
        let periodFull = this.elements[index].period;
        let groupFull = this.elements[index].group;

        // Concatonate period.json or group values to a number (ex. 11, 5)
        let period = this.labelClassToNone(periodFull);
        let group = this.labelClassToNone(groupFull);

        if(this.clickActive === false) {
          // When changing a label, make sure all others are turned off first
          this.clearLabelExcept(-1, -1);

          // Only darken the label if the element actually has a valid period.json number (within the actual range of the periodic table)
          // Recall Act. and Lan. have period.json of 0, and they don't have period.json / group labels
          if(period > 0) {
            // Darken the labels if the mouse is entering an element
            if(isMouseOver === "true") {
              this.periodData[period - 1].color = "dark";
            }
            // Lighten the labels if the mouse is leaving an element
            else if(isMouseOver === "false") {
              this.periodData[period - 1].color = "light";
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
              this.groupData[group - 1].color = "dark";
            }
            // Lighten the labels if the moues is leaving an element
            else if(isMouseOver === "false") {
              this.groupData[group - 1].color = "light";
            }
            else {
              console.log("Unexpected parameter for isMouseOver passed through changeLabelColor.");
            }
          }
        }
      },
      // type can either be "mouesOver" or "mouseLeave"
      maintenanceAfter: function(index, type) {
        if(type === "mouseLeave") {
          // By 'click' being active, mean that the user clicked on an element, and wants to display that element, even if mouse moves away from element
          // If click is active, on mouse leave of label, show the previous element that was clicked on (because it got 'erased' on mouseover of label)
          if(this.clickActive === true) {
            // Recall that this.clickedElementPeriod and this.clickedElementGroup are NOT indexes; they are actual values
            // We don't want to change color when this.clickedElementPeriod / group is 0 that value is for groupless elements (lanth. and act. elements)
            // Nor do we want to change color when this.clickedElementPeriod / group is -1, because that occurs when this.clickActive is false (I think this is already covered, but just a precaution)
            if(this.clickedElementPeriod > 0) {
              this.periodData[this.clickedElementPeriod - 1].color = "dark";
            }
            if(this.clickedElementGroup > 0) {
              this.groupData[this.clickedElementGroup - 1].color = "dark";
            }
            Vue.set(this.eColors[this.clickedElementIndex], 'color', ("supdark-" + this.eColors[this.clickedElementIndex].color));
          }
          // Make element overview and desc normal color
          this.hoverColor = this.eColors[this.hoverIndex].defaultColor;
        }
      },
      clearLabelExcept: function(periodExclude, groupExclude) {
        // Clears all period.json / group labels, except for one period.json / group label
        for(let i = 0; i < this.periodData.length; i++) {
          if(i !== periodExclude) {
            this.periodData[i].color = "light";
          }
        }
        for(let i = 0; i < this.groupData.length; i++) {
          if(i !== groupExclude) {
            this.groupData[i].color = "light";
          }
        }
      },
      // When element is clicked, darken it
      clickElement: function(index) {
        // Change element info and label color (in case the mouse does not movein or moveout the element)
        this.clickActive = false;
        this.changeLabelColor(index, "true");
        this.updateElementInfoAndDesc(index);
        this.clickActive = true;

        // What to do if clicking for the first time, or clicking on a different element
        // Save the index (element index, period.json index, and group index) of the clicked on element
        if(this.clickedElementIndex === -1 || this.clickedElementIndex !== index) {
          this.clickedElementIndex = index;

          this.clickedElementPeriod = this.labelClassToNone( this.elements[index].period );
          this.clickedElementGroup = this.labelClassToNone( this.elements[index].group );


          // Sets color of all elements in periodic table
          this.setAllElementsColor('');
          this.setElementColorForce(index, "supdark-");
        }
        // What to do if clicking on the same element twice (cancels elementHold)
        else if(this.clickedElementIndex === index) {
          this.clickActive = false;
          this.clickedElementIndex = -1;
          this.clickedElementPeriod = -1;
          this.clickedElementGroup = -1;

          // Sets colour of all elements in periodic tablw
          this.setAllElementsColor('');
          this.setElementColorForce(index, "dark-");
        }
      },
      labelClassToNone: function(labelNumber) {
        return labelNumber.substring(2);
      },
      labelNoneToClass: function(labelNumber, type) {
        // className are the classes that need to be highlighted "p" stands for period.json, "g" stands for group
        if(type === "period") {
          return "p-" + (labelNumber);
        }
        else if(type === "group") {
          return "g-" + (labelNumber);
        }
      },
      // OUTPUT: Group 1 / Period 7
      getPeriodGroupName: function(type, number) {
        if(type === "period") {
          return "Period " + number;
        }
        else if(type === "group") {
          return "Group " + number;
        }
      },
      periodNotification: function(index) {
        // For now, use Vuesax notifications because they look better (and because ElementUI does not seem to display names properly)
        // Unless one can customize the whites and greys of Vuesax, must move over to ElementUI eventually
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
    },
    created() {
      this.$store.dispatch('loadElementData');

      bus.$on('themeChanged', (data) => {
        this.themeType = data;
      });
      bus.$on('infoLocationChanged', (data) => {
        this.infoLocationType = data;
      });
    },
    computed: {
    }
  }
</script>


<style lang="scss">
  @import 'Styles/variables.scss';
  @import './periodic-table.scss';
  @import './periodic-table-themes.scss';
  @import './generic-elements.scss';
</style>
