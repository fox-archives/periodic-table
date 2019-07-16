import Vue from 'vue';
import Vuex from 'vuex';
import { setColorOfOneAtom, setColorOfOneGroup, setColorOfOnePeriod, setColorOfAllButOneAtom, setColorOfAllButOnePeriod, setColorOfAllButOneGroup, setColorOfAllAtoms } from "@/store/atomHighlighting";
import { initAtomData, loadAtomColors, loadAtomTabProperties, switchAtomTabData }from '@/api/fetchData';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // GENERAL
    // Value determining if the data is ready to be rendered (after all Axios requests)
    // 'ready' value changes to 'true' after *some* Axios requests, but good enough (until it breaks)
    ready: false,

    // ATOM
    // shared atom data across all tabs (from atomTabAll.json)
    atomSimpleData: [],

    // atom placement data (in the css grid, and in the periodic table itself)
    atomPlacements: [],
    // atom colors (color and deafultColor)
    atomColors: [],

    // atom tab data (dependent on the selected tab) for *all* elements
    atomTabData: [],
    // atom tab data for *only* the active element (one being clicked on or hovered over
    atomTabDataActive: {},

    // Element Defaults
    activeAtom: {
      atomicNumber: '1',
      abbreviation: 'H',
      name: 'Hydrogen',
      atomicMass: 1.008,
      block: 's',
      color: 'blue', // This actually changes the color
      index: 0,
    },

    // Data about a clicked element
    clickedAtom: {
      // COMMENTED OUT OLD VALUES
      active: false,

      // When user clicks, want to make clicked element darker than if it was highlighted
      // This also keeps track of the clicked element (if a user decides to hover over a group or period label, changing all element color
      index: -1,
      period: -1,
      group: -1
    },

    // LABEL
    // placement, color status, and name of period and group labels
    atomLabelPeriods: [],
    atomLabelGroups: [],

    // OPTIONS
    // Changeable options
    options: {
      themeType: 'light-def',
      infoLocationType: 'info-auto',
      infoLocationTypeIsAuto: true,
      blurType: 'no-blur'
    },
    contentState: '',
  },
  mutations: {
    setColorOfOneAtom,
    setColorOfOneGroup,
    setColorOfOnePeriod,
    setColorOfAllButOneAtom,
    setColorOfAllButOnePeriod,
    setColorOfAllButOneGroup,
    setColorOfAllAtoms,
    // ## PERIODIC TABLE ELEMENT STUFF ## \\
    updateActiveAtom: function(state, index) {
      // Update Store variables with Element information according to index
      // Purpose: To change all properties of active element only when element is on 'clicked' mode
      // @param #int 'index':
      //   (req)  Index of element, where activeAtom properties will get info from
      if (state.clickedAtom.active === false) {
        state.activeAtom.index = state.index;
        state.activeAtom.abbreviation = state.atomSimpleData[index].abbreviation;
        state.activeAtom.name = state.atomSimpleData[index].name;
        state.activeAtom.atomicMass = state.atomSimpleData[index].atomicMass;

        // Update element description (right box)
        state.activeAtom.color = state.atomColors[index].defaultColor;

        // TODO: Make less messy
        // state.updateAtomTabDataActive()
        state.atomTabDataActive = state.atomTabData[index];
      }
    },
    // Only call this when user clicks on element (element update is locked) and user clicks on another element
    // Purpose: To change all properties of active element, in any case
    // @param #int 'index':
    //   (req)  Index of element, where activeAtom properties will get info from
    updateActiveAtomForce: function(state, index) {
      state.activeAtom.index = state.index;
      state.activeAtom.abbreviation = state.atomSimpleData[index].abbreviation;
      state.activeAtom.name = state.atomSimpleData[index].name;
      state.activeAtom.atomicMass = state.atomSimpleData[index].atomicMass;

      // Update element description (right box)
      state.activeAtom.color = state.atomColors[index].defaultColor;

      // TODO: Make less messy
      // this.updateAtomTabDataActive();
      state.atomTabDataActive = state.atomTabData[index];
    },


    // Purpose: Recolor all period and group labels with the exception of one period or group
    // @param #object 'payload' contains properties:
    //   (req)  .periodExclude  Exclude changing color of particular period (-1 to not exclude any period)
    //   (req)  .groupExclude   Exclude changing color of particular group (-1 to not exclude any group)
    clearLabelExcept: function(state, payload) {
      for (let i = 0; i < state.atomLabelPeriods.length; i++) {
        if (i !== payload.periodExclude) {
          state.atomLabelPeriods[i].color = 'light';
        }
      }
      for (let i = 0; i < state.atomLabelGroups.length; i++) {
        if (i !== payload.groupExclude) {
          state.atomLabelGroups[i].color = 'light';
        }
      }
    },

    // Purpose: Change the properties of the active element, or the element that was clicked on
    // @param #object 'payload' contains properties:
    //   Each possible property are the same properties as this.activeAtom
    setActiveAtom: function(state, newProperties) {
      // Payload contains an object containing properties
      // These properties should replace the properties the activeAtom object (from the vuex state) has
      for (let property in newProperties) {
        if (state.activeAtom.hasOwnProperty(property)) {
          state.activeAtom[property] = newProperties[property];
        }
      }
    },

    // Purpose: Change the properties of the clicked element, or the element that was clicked on
    // @param #object 'payload' contains properties:
    //   (opt) .active #boolean If an element has been clicked, or a click was activated
    //   (opt) .index #int Integer of the clicked element (placement in the atomPlacements array)
    //   (opt) .period #int Period number of the clicked element (actual period, does not start at 0)
    //   (opt) .group #int Group number of the clicked element (actual group, does not start at 0)
    setClickedAtom: function(state, newProperties) {
      // Payload contains an object containing properties
      // These properties should replace the properties the activeAtom object (from the vuex state) has
      for (let property in newProperties) {
        if (state.clickedAtom.hasOwnProperty(property)) {
          state.clickedAtom[property] = newProperties[property];
        }
      }
    },

    // ## NAVIGATION STUFF ## \\
    // Purpose: To replace the state options with new ones
    // @param #object 'payload' contains properties:
    //   (req) .themeType #String  The theme that is active
    //   (opt) .infoLocationType #String  Location of element information box (the thing that gets changed on element hover etc.)
    //   (opt) Any other properties of options
    setOptions: function(state, newProperties) {
      // Payload contains an object containing properties
      // These properties should replace the properties the activeAtom object (from the vuex state) has
      for (let property in newProperties) {
        if (state.options.hasOwnProperty(property)) {
          state.options[property] = newProperties[property];
        }
      }
    },

    // ## LAYOUT STUFF ## \\
    // This script makes the periodic-table and element info panel not have a height
    // bigger than the browser on info-side
    setClassLayout: function(state) {
      // Test if the height of periodic-table and element-info-panel are the same
      // This assumes the AtomGraphicProperties.vue goes all the way to bottom of window (stops right above foot)

      let panelHeight = document.getElementById('grid-container').offsetHeight;
      let periodicTableHeight = document.getElementById('grid-outer')
        .offsetHeight;

      // Only change the style if the periodic-table has a greater or equal height for AtomGraphicProperties.vue
      if (
        periodicTableHeight >= panelHeight &&
        periodicTableHeight !== 0 &&
        panelHeight !== 0
      ) {
        // This means if panel and periodic-table fill whole window height, increasing
        // width will not increase size of periodic-table, instead it creates whitespace;
        // periodic-table will only increase if the height of browser window increases
        state.contentState = 'heightSame';
      } else {
        state.contentState = 'heightDifferent';
      }
    },

    setMobilePeriodicTableWidth: function(state) {
      if (
        /*this.options.infoLocationType === 'info-top' && */ state.contentState ===
        'heightDifferent'
      ) {
        // To change the length of the #grid-container (so #grid-outer scrolls to fit)
        let gridContainer = document.getElementById('grid');

        // Be sure to change the ratio in periodicTable.scss if changed here
        let periodicTableRatio = 0.6;

        // Subtract 2 because recall CSS says the height is calc(100% - 2px)
        // All I know is that when 2 is removed, then scrollbar is shown for small widths for info-side
        gridContainer.style.width = `${(gridContainer.clientHeight - 2) /
          periodicTableRatio}px`;
      } else {
        document.getElementById('grid').style.width = '';
      }
    },

    // This changes the CSS variable to size the element text
    // Recall the CSS variables are declared in periodicTable.scss
    sizeElementsText: function() {
      let grid = document.getElementById('grid');

      let elementWidth = grid.childNodes[0].clientWidth;
      let primaryFontSize = `${elementWidth * 0.32}px`;
      let secondaryFontSize = `${elementWidth * 0.2}px`;
      let labelFontSize = `${elementWidth * 0.3}px`;

      // Setting CSS Variables for All Elements
      // Variables stores in grid
      grid.style.setProperty('--primaryTextSize', primaryFontSize);
      grid.style.setProperty('--secondaryTextSize', secondaryFontSize);
      grid.style.setProperty('--labelTextSize', labelFontSize);
    }
  },
  actions: {
    initAtomData,
    loadAtomColors,
    loadAtomTabProperties,
    switchAtomTabData
  }
});
