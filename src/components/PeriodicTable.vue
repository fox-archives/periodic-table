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

    <div id="grid-container">
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
  // Import the bus
  import bus from "./bus.js";

  export default {
    name: 'PeriodicTable',
    data() {
      return {
        elements: null,
         periodLabels: [
           // Labels for each period element
           { display: 1,   column: "cc-1",   row: "rr-2",  color: "light", name: "Period 1" },
           { display: 2,   column: "cc-1",   row: "rr-4",  color: "light", name: "Period 2" },
           { display: 3,   column: "cc-1",   row: "rr-6",  color: "light", name: "Period 3" },
           { display: 4,   column: "cc-1",   row: "rr-8",  color: "light", name: "Period 4" },
           { display: 5,   column: "cc-1",   row: "rr-10", color: "light", name: "Period 5" },
           { display: 6,   column: "cc-1",   row: "rr-12", color: "light", name: "Period 6" },
           { display: 7,   column: "cc-1",   row: "rr-14", color: "light", name: "Period 7" }
         ],
         groupLabels: [
           // Labels for each group element
           { display: 1,    column: "cc-2",   row: "rr-1", color: "light", name: "Alkali Metals" },
           { display: 2,    column: "cc-4",   row: "rr-1", color: "light", name: "Alkaline Earth Metals" },
           { display: 3,    column: "cc-6",   row: "rr-1", color: "light", name: "Scandium Family" },
           { display: 4,    column: "cc-8",   row: "rr-1", color: "light", name: "Titanium Family" },
           { display: 5,    column: "cc-10",  row: "rr-1", color: "light", name: "Vanadium Family" },
           { display: 6,    column: "cc-12",  row: "rr-1", color: "light", name: "Chromium Family" },
           { display: 7,    column: "cc-14",  row: "rr-1", color: "light", name: "Manganese Family" },
           { display: 8,    column: "cc-16",  row: "rr-1", color: "light", name: "Iron Family" },
           { display: 9,    column: "cc-18",  row: "rr-1", color: "light", name: "Cobalt Family" },
           { display: 10,   column: "cc-20",  row: "rr-1", color: "light", name: "Nickel Family" },
           { display: 11,   column: "cc-22",  row: "rr-1", color: "light", name: "Copper Family" },
           { display: 12,   column: "cc-24",  row: "rr-1", color: "light", name: "Zinc Family" },
           { display: 13,   column: "cc-26",  row: "rr-1", color: "light", name: "Boron Family" },
           { display: 14,   column: "cc-28",  row: "rr-1", color: "light", name: "Carbon Family" },
           { display: 15,   column: "cc-30",  row: "rr-1", color: "light", name: "Pnictogens" },
           { display: 16,   column: "cc-32",  row: "rr-1", color: "light", name: "Chalcogens" },
           { display: 17,   column: "cc-34",  row: "rr-1", color: "light", name: "Halogens" },
           { display: 18,   column: "cc-36",  row: "rr-1", color: "light", name: "Noble Gases" }
         ],
         elementDisplayProps: [
           // Period 1
           { name: "Hydrogen", defaultColor: "blue", color: "blue" },
           { name: "Helium", defaultColor: "blue", color: "blue" },
           // Period 2
           { name: "Lithium", defaultColor: "blue", color: "blue" },
           { name: "Beryllium", defaultColor: "blue", color: "blue" },
           { name: "Boron", defaultColor: "red", color: "red" },
           { name: "Carbon", defaultColor: "red", color: "red" },
           { name: "Nitrogen", defaultColor: "red", color: "red" },
           { name: "Oxygen", defaultColor: "red", color: "red" },
           { name: "Flourine", defaultColor: "red", color: "red" },
           { name: "Neon", defaultColor: "red", color: "red" },
           // Period 3
           { name: "Sodium", defaultColor: "blue", color: "blue" },
           { name: "Magnesium", defaultColor: "blue", color: "blue" },
           { name: "Aluminium", defaultColor: "red", color: "red" },
           { name: "Silicon", defaultColor: "red", color: "red" },
           { name: "Phosphorous", defaultColor: "red", color: "red" },
           { name: "Sulfur", defaultColor: "red", color: "red" },
           { name: "Chlorine", defaultColor: "red", color: "red" },
           { name: "Argon", defaultColor: "red", color: "red" },
           // Period 4
           { name: "Potassium", defaultColor: "blue", color: "blue" },
           { name: "Calcium", defaultColor: "blue", color: "blue" },
           { name: "Scandium", defaultColor: "green", color: "green" },
           { name: "Titanium", defaultColor: "green", color: "green" },
           { name: "Vanadium", defaultColor: "green", color: "green" },
           { name: "Chromium", defaultColor: "green", color: "green" },
           { name: "Manganese", defaultColor: "green", color: "green" },
           { name: "Iron", defaultColor: "green", color: "green" },
           { name: "Cobalt", defaultColor: "green", color: "green" },
           { name: "Nickel", defaultColor: "green", color: "green" },
           { name: "Copper", defaultColor: "green", color: "green" },
           { name: "Zinc", defaultColor: "green", color: "green" },
           { name: "Gallium", defaultColor: "red", color: "red" },
           { name: "Germanium", defaultColor: "red", color: "red" },
           { name: "Arsenic", defaultColor: "red", color: "red" },
           { name: "Selenium", defaultColor: "red", color: "red" },
           { name: "Bromine", defaultColor: "red", color: "red" },
           { name: "Krypton", defaultColor: "red", color: "red" },
           // Period 5
           { name: "Rubidium", defaultColor: "blue", color: "blue" },
           { name: "Strontium", defaultColor: "blue", color: "blue" },
           { name: "Yttrium", defaultColor: "green", color: "green" },
           { name: "Zirconium", defaultColor: "green", color: "green" },
           { name: "Niobium", defaultColor: "green", color: "green" },
           { name: "Molybdenum", defaultColor: "green", color: "green" },
           { name: "Technetium", defaultColor: "green", color: "green" },
           { name: "Ruthenium", defaultColor: "green", color: "green" },
           { name: "Rhodium", defaultColor: "green", color: "green" },
           { name: "Palladium", defaultColor: "green", color: "green" },
           { name: "Silver", defaultColor: "green", color: "green" },
           { name: "Cadmium", defaultColor: "green", color: "green" },
           { name: "Indium", defaultColor: "red", color: "red" },
           { name: "Tin", defaultColor: "red", color: "red" },
           { name: "Antmony", defaultColor: "red", color: "red" },
           { name: "Tellurium", defaultColor: "red", color: "red" },
           { name: "Iodine", defaultColor: "red", color: "red" },
           { name: "Xenon", defaultColor: "red", color: "red" },
           // Period 6
           { name: "Caesium", defaultColor: "blue", color: "blue" },
           { name: "Barium", defaultColor: "blue", color: "blue" },
           { name: "Lanthanides", defaultColor: "orange", color: "orange" },
           { name: "Lanthanum", defaultColor: "orange", color: "orange" },
           { name: "Cerium", defaultColor: "orange", color: "orange" },
           { name: "Praseodymium", defaultColor: "orange", color: "orange" },
           { name: "Neodymium", defaultColor: "orange", color: "orange" },
           { name: "Promethium", defaultColor: "orange", color: "orange" },
           { name: "Samarium", defaultColor: "orange", color: "orange" },
           { name: "Europium", defaultColor: "orange", color: "orange" },
           { name: "Gadolinium", defaultColor: "orange", color: "orange" },
           { name: "Terbium", defaultColor: "orange", color: "orange" },
           { name: "Dysprosium", defaultColor: "orange", color: "orange" },
           { name: "Holmium", defaultColor: "orange", color: "orange" },
           { name: "Erbium", defaultColor: "orange", color: "orange" },
           { name: "Thulium", defaultColor: "orange", color: "orange" },
           { name: "Ytterbium", defaultColor: "orange", color: "orange" },
           { name: "Lutetium", defaultColor: "orange", color: "orange" },
           { name: "Hafnium", defaultColor: "green", color: "green" },
           { name: "Tantalum", defaultColor: "green", color: "green" },
           { name: "Tungsten", defaultColor: "green", color: "green" },
           { name: "Rhenium", defaultColor: "green", color: "green" },
           { name: "Osmium", defaultColor: "green", color: "green" },
           { name: "Iridium", defaultColor: "green", color: "green" },
           { name: "Platinum", defaultColor: "green", color: "green" },
           { name: "Gold", defaultColor: "green", color: "green" },
           { name: "Mercury", defaultColor: "green", color: "green" },
           { name: "Thallium", defaultColor: "red", color: "red" },
           { name: "Lead", defaultColor: "red", color: "red" },
           { name: "Bismuth", defaultColor: "red", color: "red" },
           { name: "Polonium", defaultColor: "red", color: "red" },
           { name: "Astatine", defaultColor: "red", color: "red" },
           { name: "Radon", defaultColor: "red", color: "red" },
           // Period 7
           { name: "Francium", defaultColor: "blue", color: "blue" },
           { name: "Radium", defaultColor: "blue", color: "blue" },
           { name: "Actinides", defaultColor: "orange", color: "orange" },
           { name: "Actinium", defaultColor: "orange", color: "orange" },
           { name: "Thorium", defaultColor: "orange", color: "orange" },
           { name: "Protactinium", defaultColor: "orange", color: "orange" },
           { name: "Uranium", defaultColor: "orange", color: "orange" },
           { name: "Neptunium", defaultColor: "orange", color: "orange" },
           { name: "Plutonium", defaultColor: "orange", color: "orange" },
           { name: "Americium", defaultColor: "orange", color: "orange" },
           { name: "Curium", defaultColor: "orange", color: "orange" },
           { name: "Berkelium", defaultColor: "orange", color: "orange" },
           { name: "Californium", defaultColor: "orange", color: "orange" },
           { name: "Einsteinium", defaultColor: "orange", color: "orange" },
           { name: "Fermium", defaultColor: "orange", color: "orange" },
           { name: "Mendelevium", defaultColor: "orange", color: "orange" },
           { name: "Nobelium", defaultColor: "orange", color: "orange" },
           { name: "Lawrencium", defaultColor: "orange", color: "orange" },
           { name: "Rutherfordium", defaultColor: "green", color: "green" },
           { name: "Dubnium", defaultColor: "green", color: "green" },
           { name: "Seaborgium", defaultColor: "green", color: "green" },
           { name: "Bohrium", defaultColor: "green", color: "green" },
           { name: "Hassium", defaultColor: "green", color: "green" },
           { name: "Meitnerium", defaultColor: "green", color: "green" },
           { name: "Darmstadtium", defaultColor: "green", color: "green" },
           { name: "Roentgenium", defaultColor: "green", color: "green" },
           { name: "Copernicium", defaultColor: "green", color: "green" },
           { name: "Nihonium", defaultColor: "red", color: "red" },
           { name: "Flerovium", defaultColor: "red", color: "red" },
           { name: "Moscovium", defaultColor: "red", color: "red" },
           { name: "Livermoreium", defaultColor: "red", color: "red" },
           { name: "Tennessine", defaultColor: "red", color: "red" },
           { name: "Oganesson", defaultColor: "red", color: "red" }
         ],

         hoverAtomicNumber: "1",
         hoverAbbreviation: "H",
         hoverName: "Hydrogen",
         hoverAtomicMass: 1.008,
         hoverBlock: "s",
         hoverColor: "blue", //This actually changes the color
         hoverDiscoveryDate: "1766",
         hoverDiscoveredBy: "Henry Cavendish",
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
         for(var i = 0; i < this.elementDisplayProps.length; i++)
         {
           if(i != this.clickedElementIndex)
           {
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

         // Get elements that need to be lighened (elements to be lightened either in a period or group)
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

         // Get elements that need to be lighened (elements to be lightened either in a period or group)
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

         // Get the period or group value corresponding to the hovered over element (ex. c-11, p-5)
         var periodFull = this.elements[index].period;
         var groupFull = this.elements[index].group;

         // Concatonate period or group values to a number (ex. 11, 5)
         var period = this.labelClassToNone(periodFull);
         var group = this.labelClassToNone(groupFull);

         if(this.clickActive == false) {
           // When changing a label, make sure all others are turned off first
           this.clearLabelExcept(-1, -1);

           // Only darken the label if the element actually has a valid period number (within the actual range of the periodic table)
           // Recall Act. and Lan. have period of 0, and they don't have period / group labels
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
           // Recall Act. and Lan. have group of 0, and they don't have period / group labels
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
         // Clears all period / group labels, except for one period / group label
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
         // Save the index (element index, period index, and group index) of the clicked on element
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
         // className are the classes that need to be highlighted "p" stands for period, "g" stands for group
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
           time: 3000000
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
     mounted: function() {
       bus.$on('themeChanged', (data) => {
         this.themeType = data;
       });
       bus.$on('infoLocationChanged', (data) => {
         this.infoLocationType = data;
       });

      // Get the data from the json
      var xmlhttp = new XMLHttpRequest();
      var self = this;
      //var url = "./main.json";
      var url = "src/components/main.json";
      xmlhttp.open("GET", url, true);


      xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
          //console.log(JSON.parse(xmlhttp.responseText));
          //console.log(JSON.parse(xmlhttp.responseText).elements[0]);
          //console.log(xmlhttp.responseText[0]);
          self.elements = JSON.parse(xmlhttp.responseText).elements;
        }
      }
      xmlhttp.send();
     },
     computed: {

     }
   }
</script>
