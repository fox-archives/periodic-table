<template>
  <div id="pt" class="has-shadow" v-bind:class="themeType">
    <!-- (INFO UNOBTRUSIVE) ELEMENT OVERVIEW PANNEL -->
    <section v-if="infoLocationType == 'info-unobtrusive'" id="det">
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
      <main id="grid">
        <!-- (INFO OBTRUSIVE) ELEMENT OVERVIEW PANNEL -->
        <section v-if="infoLocationType == 'info-obtrusive'" id="element-overview" v-bind:class="hoverColor" v-cloak>
            <div id="element-overview-inner">
              <p class="element-ov-secondary-info">{{ hoverAtomicNumber }}</p>
              <p class="element-ov-primary-info">{{ hoverAbbreviation }}</p>
              <p class="element-ov-secondary-info">{{ hoverName }}</p>
              <p class="element-ov-secondary-info">{{ hoverAtomicMass }}</p>
            </div>
        </section>

        <!-- (INFO OBTRUSIVE) ELEMENT DESCRIPTIONS -->
        <section v-if="infoLocationType == 'info-obtrusive'" id="element-desc" v-bind:class="hoverColor" v-cloak>
          <div id="element-desc-inner">
            <p id="element-d-discovery-date" class="element-d-primary-info">Discovery Date</p>
            <p id="element-discovery-date" class="element-d-secondary-info">{{ hoverDiscoveryDate }}</p>
            <p id="element-d-discoverer" class="element-d-primary-info">Discovered By </p>
            <p id="element-discoverer" class="element-d-secondary-info">{{ hoverDiscoveredBy }}</p>
          </div>
        </section>

        <!-- DUPLICATED ELEMENTS FROM PERIODIC TABLE -->
        <div class="element-outer" v-for="(element, index) in elements" v-on:mouseover="[setElementColor(index, 'dark-'), changeLabelColor(index, 'true'), updateElementInfoAndDesc(index)]" v-on:mouseleave="[setElementColor(index, ''), changeLabelColor(index, 'false'), updateElementInfoAndDesc(index)]" v-on:click="[clickElement(index), updateElementInfoAndDesc(index)]" v-bind:class="[element.column, element.row, elementDisplayProps[index].color, element.period, element.group]">
          <div v-cloak class="element-inner">
            <!--<p>{{ index + 1 }}</p> Turn this element on if not sure if v-for loop "linked" w/ each atomic element (should be the same)-->
            <p class="element-atomicNumber element-secondary-info">{{ element.atomicNumber }}</p>
            <p class="element-abbreviation element-primary-info">{{ element.abbreviation }}</p>
            <p class="element-name element-secondary-info">{{ element.name }}</p>
            <p class="element-atomicMass element-secondary-info">{{ element.atomicMass }}</p>
          </div>
        </div>

        <!-- PERIOD LABELS -->
        <div class="label-period-outer" v-for="(periodLabel, index) in periodLabels" v-bind:class="[periodLabel.row, periodLabel.column]">
          <div v-cloak class="label-period-inner" v-bind:class="periodLabels[index].color" v-on:mouseover="[darkenElements(index, 'dark-', 'period'), lightenElements(index, 'light-', 'period', 'p-'), maintenanceAfter(index, 'mouseOver')]" v-on:mouseleave="[darkenElements(index, '', 'period'), lightenElements(index, '', 'period', 'p-'), maintenanceAfter(index, 'mouseLeave')]" v-on:click="periodNotification(index)">
            <p class="label-text">{{ periodLabel.display }}</p>
          </div>
        </div>

        <!-- GROUP LABELS -->
        <div class="label-group-outer" v-for="(groupLabel, index) in groupLabels" v-bind:class="[groupLabel.row, groupLabel.column]">
          <div v-cloak class="label-group-inner" v-bind:class="groupLabels[index].color" v-on:mouseover="[darkenElements(index, 'dark-', 'group'), lightenElements(index, 'light-', 'group', 'g-'), maintenanceAfter(index, 'mouseOver')]" v-on:mouseleave="[darkenElements(index, '', 'group'), lightenElements(index, '', 'group', 'g-'), maintenanceAfter(index, 'mouseLeave')]" v-on:click="groupNotification(index)">
            <p class="label-text">{{ groupLabel.display }}</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script type="text/javascript">
  import bus from '../bus.js';
  const axios = require('axios');

  export default {
    name: 'PeriodicTable',
    data() {
      return {
        elements: [],
        periodLabels: [],
        groupLabels: [],
        elementDisplayProps: [],
        ready: false,

        hoverAtomicNumber: '1',
        hoverAbbreviation: 'H',
        hoverName: 'Hydrogen',
        hoverAtomicMass: 1.008,
        hoverBlock: 's',
        hoverColor: 'blue', //This actually changes the color
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
        if(this.clickActive == false) {
          this.hoverIndex = index;
          // Update element overview (left box)
          this.hoverAtomicNumber = this.elements[index].atomicNumber;
          this.hoverAbbreviation = this.elements[index].abbreviation;
          this.hoverName = this.elements[index].name;
          this.hoverAtomicMass = this.elements[index].atomicMass;

          // Update element description (right box)
          this.hoverDiscoveryDate = this.elements[index].discoveryDate;
          this.hoverDiscoveredBy = this.elements[index].discoveredBy;
          this.hoverColor = this.elementDisplayProps[index].defaultColor;
        }
      },

      // Changes shade of hovered element (lighten or darken, or default)
      setElementColor: function(index, shade) {
        if(this.clickedElementIndex != index) {
          // Gets current default color
          var defaultColor = this.elementDisplayProps[index].defaultColor;

          // Sets current default color ('color' is the property we want to change)
          Vue.set(this.elementDisplayProps[index], 'color', (shade + defaultColor));
        }
      },
      // Similar to setElementColor, but does it by force (sets color even if ths.clickedElementIndex is not the same as the index)
      setElementColorForce: function(index, shade) {
        // Gets current default color
        var defaultColor = this.elementDisplayProps[index].defaultColor;

        // Sets current default color
        Vue.set(this.elementDisplayProps[index], 'color', (shade + defaultColor));
      },
      // Sets the color of all elements (usually the default color)
      setAllElementsColor: function(shade) {
        for(var i = 0; i < this.elementDisplayProps.length; i++) {
          if(i != this.clickedElementIndex) {
            var defaultColor = this.elementDisplayProps[i].defaultColor;
            Vue.set(this.elementDisplayProps[i], 'color', (shade + defaultColor));
          }
        }
      },
      darkenElements: function(index, prefix, type) {
        // On hover, clear all other label highlights
        this.clearLabelExcept(-1, -1);
        // Change element description and shade on hover of label (only if element description is inside)
        if(this.infoLocationType == "info-obtrusive") {
          this.hoverColor = "light-" + this.elementDisplayProps[this.hoverIndex].defaultColor;
        }

        var className = this.labelNoneToClass(index + 1, type);

        // Get elements that need to be lighened (elements to be lightened either in a period.json or group)
        if(type == "period") {
          for(var i = 0; i < this.elements.length; i++) {
            if(this.elements[i].period == className) {
              var defaultColor = this.elementDisplayProps[i].defaultColor;
              Vue.set(this.elementDisplayProps[i], 'color', (prefix + defaultColor))
            }
          }
        }
        else if(type == "group") {
          for(var i = 0; i < this.elements.length; i++) {
            if(this.elements[i].group == className) {
              var defaultColor = this.elementDisplayProps[i].defaultColor;
              Vue.set(this.elementDisplayProps[i], 'color', (prefix + defaultColor))
            }
          }
        }
      },
      lightenElements: function(index, prefix, type, typeShort) {
        var className = this.labelNoneToClass(index + 1, type);

        // Get elements that need to be lighened (elements to be lightened either in a period.json or group)
        if(type == "period") {
          for(var i = 0; i < this.elements.length; i++) {
            if(this.elements[i].period != className) {
              var defaultColor = this.elementDisplayProps[i].defaultColor;
              Vue.set(this.elementDisplayProps[i], 'color', (prefix + defaultColor))
            }
          }
        }
        else if(type == "group") {
          for(var i = 0; i < this.elements.length; i++) {
            if(this.elements[i].group != className) {
              var defaultColor = this.elementDisplayProps[i].defaultColor;
              Vue.set(this.elementDisplayProps[i], 'color', (prefix + defaultColor))
            }
          }
        }
      },
      changeLabelColor: function(index, isMouseOver) {
        // isMouseOver is true when the moues is entering an element. isMouesOver is false when the mouse is leaving an element
        // The element that the mouse is entering or leaving is determined by its index in the Vue v-for loop

        // Get the period.json or group value corresponding to the hovered over element (ex. c-11, p-5)
        var periodFull = this.elements[index].period;
        var groupFull = this.elements[index].group;

        // Concatonate period.json or group values to a number (ex. 11, 5)
        var period = this.labelClassToNone(periodFull);
        var group = this.labelClassToNone(groupFull);

        if(this.clickActive == false) {
          // When changing a label, make sure all others are turned off first
          this.clearLabelExcept(-1, -1);

          // Only darken the label if the element actually has a valid period.json number (within the actual range of the periodic table)
          // Recall Act. and Lan. have period.json of 0, and they don't have period.json / group labels
          if(period > 0) {
            // Darken the labels if the mouse is entering an element
           if(isMouseOver == "true") {
              this.periodLabels[period - 1].color = "dark";
            }
            // Lighten the labels if the mouse is leaving an element
            else if(isMouseOver == "false") {
              this.periodLabels[period - 1].color = "light";
            }
            else {
              console.log("Unexpected parameter for isMouseOver passed through changeLabelColor.");
            }
          }
          // Only darken the label if the element actually has a valid group number (within the actual range of the periodic table)
          // Recall Act. and Lan. have group of 0, and they don't have period.json / group labels
          if (group > 0) {
            // Darken the labels if the mouse is entering an element
            if(isMouseOver == "true") {
              this.groupLabels[group - 1].color = "dark";
            }
            // Lighten the labels if the moues is leaving an element
            else if(isMouseOver == "false") {
              this.groupLabels[group - 1].color = "light";
            }
            else {
              console.log("Unexpected parameter for isMouseOver passed through changeLabelColor.");
            }
          }
        }
      },
      // type can either be "mouesOver" or "mouseLeave"
      maintenanceAfter: function(index, type) {
        if(type == "mouseLeave") {
          // By 'click' being active, mean that the user clicked on an element, and wants to display that element, even if mouse moves away from element
          // If click is active, on mouse leave of label, show the previous element that was clicked on (because it got 'erased' on mouseover of label)
          if(this.clickActive == true) {
            // Recall that this.clickedElementPeriod and this.clickedElementGroup are NOT indexes; they are actual values
            // We don't want to change color when this.clickedElementPeriod / group is 0 that value is for groupless elements (lanth. and act. elements)
            // Nor do we want to change color when this.clickedElementPeriod / group is -1, because that occurs when this.clickActive is false (I think this is already covered, but just a precaution)
            if(this.clickedElementPeriod > 0) {
              this.periodLabels[this.clickedElementPeriod - 1].color = "dark";
            }
            if(this.clickedElementGroup > 0) {
              this.groupLabels[this.clickedElementGroup - 1].color = "dark";
            }
            Vue.set(this.elementDisplayProps[this.clickedElementIndex], 'color', ("supdark-" + this.elementDisplayProps[this.clickedElementIndex].color));
          }
          // Make element overview and desc normal color
          this.hoverColor = this.elementDisplayProps[this.hoverIndex].defaultColor;
        }
      },
      clearLabelExcept: function(periodExclude, groupExclude) {
        // Clears all period.json / group labels, except for one period.json / group label
        for(var i = 0; i < this.periodLabels.length; i++) {
          if(i != periodExclude) {
            this.periodLabels[i].color = "light";
          }
        }
        for(var i = 0; i < this.groupLabels.length; i++) {
          if(i != groupExclude) {
            this.groupLabels[i].color = "light";
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
        if(this.clickedElementIndex == -1 || this.clickedElementIndex != index) {
          this.clickedElementIndex = index;

          this.clickedElementPeriod = this.labelClassToNone( this.elements[index].period );
          this.clickedElementGroup = this.labelClassToNone( this.elements[index].group );


          // Sets color of all elements in periodic table
          this.setAllElementsColor('');
          this.setElementColorForce(index, "supdark-");
        }
        // What to do if clicking on the same element twice (cancels elementHold)
        else if(this.clickedElementIndex == index) {
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
        if(type == "period") {
          return "p-" + (labelNumber);
        }
        else if(type == "group") {
          return "g-" + (labelNumber);
        }
      },
      // OUTPUT: Group 1 / Period 7
      getPeriodGroupName: function(type, number) {
        if(type == "period") {
          return "Period " + number;
        }
        else if(type == "group") {
          return "Group " + number;
        }
      },
      periodNotification: function(index) {
       // For now, use Vuesax notifications because they look better (and because ElementUI does not seem to display names properly)
       // Unless one can customize the whites and greys of Vuesax, must move over to ElementUI eventually
        this.$vs.notify({
          title: this.getPeriodGroupName('period', this.periodLabels[index].display),
          text: this.periodLabels[index].name,
          time: 3000
        });
      },
      groupNotification: function(index) {
        this.$vs.notify({
          title: this.getPeriodGroupName('group', this.groupLabels[index].display),
          text: this.groupLabels[index].name,
          time: 3000
        });
      },
    },
    created: function() {

      axios.get('/api/data/element/placement')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });





      this.ready = true;
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

<style scoped lang="scss">
  @import 'Styles/variables.scss';
  @import './periodic-table.scss';
  @import './periodic-table-themes.scss';
  @import './generic-elements.scss';
</style>
