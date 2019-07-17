import Vue from 'vue';
import Vuex from 'vuex';
import { setColorOfOneAtom, setColorOfOneGroup, setColorOfOnePeriod, setColorOfAllButOneAtom, setColorOfAllButOnePeriod, setColorOfAllButOneGroup, setColorOfAllAtoms } from "@/store/atomHighlighting";
import { initAtomData, switchAtomTabData } from '@/api/fetchData';

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
    atomActiveSimpleData: {
      atomicNumber: '1',
      abbreviation: 'H',
      name: 'Hydrogen',
      atomicMass: 1.008,
      block: 's',
      color: 'blue', // This actually changes the color
      index: 0,
    },

    // atom sidebar data (dependent on the selected tab) for *all* elements
    atomSidebarData: [],
    atomActiveSidebarData: {},

    // atom placement data (in the css grid, and in the periodic table itself)
    atomPlacements: [],
    // atom colors (color and deafultColor)
    atomColors: [],

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
      //   (req)  Index of element, where atomActiveSimpleData properties will get info from
      if (state.clickedAtom.active === false) {
        state.atomActiveSimpleData.index = state.index;
        state.atomActiveSimpleData.abbreviation = state.atomSimpleData[index].abbreviation;
        state.atomActiveSimpleData.name = state.atomSimpleData[index].name;
        state.atomActiveSimpleData.atomicMass = state.atomSimpleData[index].atomicMass;
        state.atomActiveSimpleData.color = state.atomColors[index].defaultColor;

        // TODO: Make less messy
        state.atomActiveSidebarData = state.atomSidebarData[index];
      }
    },
    // Only call this when user clicks on element (element update is locked) and user clicks on another element
    // Purpose: To change all properties of active element, in any case
    // @param #int 'index':
    //   (req)  Index of element, where atomActiveSimpleData properties will get info from
    updateActiveAtomForce: function(state, index) {
      state.atomActiveSimpleData.index = state.index;
      state.atomActiveSimpleData.abbreviation = state.atomSimpleData[index].abbreviation;
      state.atomActiveSimpleData.name = state.atomSimpleData[index].name;
      state.atomActiveSimpleData.atomicMass = state.atomSimpleData[index].atomicMass;
      state.atomActiveSimpleData.color = state.atomColors[index].defaultColor;

      // TODO: Make less messy
      state.atomActiveSidebarData = state.atomSidebarData[index];
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
    //   Each possible property are the same properties as this.atomActiveSimpleData
    setActiveAtom: function(state, newProperties) {
      // Payload contains an object containing properties
      // These properties should replace the properties the atomActiveSimpleData object (from the vuex state) has
      for (let property in newProperties) {
        if (state.atomActiveSimpleData.hasOwnProperty(property)) {
          state.atomActiveSimpleData[property] = newProperties[property];
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
      // These properties should replace the properties the atomActiveSimpleData object (from the vuex state) has
      for (let property in newProperties) {
        if (state.clickedAtom.hasOwnProperty(property)) {
          state.clickedAtom[property] = newProperties[property];
        }
      }
    },

    // Purpose: To replace the state options with new ones
    // @param #object 'payload' contains properties:
    //   (req) .themeType #String  The theme that is active
    //   (opt) .infoLocationType #String  Location of element information box (the thing that gets changed on element hover etc.)
    //   (opt) Any other properties of options
    setOptions: function(state, newProperties) {
      // Payload contains an object containing properties
      // These properties should replace the properties the atomActiveSimpleData object (from the vuex state) has
      for (let property in newProperties) {
        if (state.options.hasOwnProperty(property)) {
          state.options[property] = newProperties[property];
        }
      }
    },
    setContentState: function(state, newContentState) {
      state.contentState = newContentState;
    }
  },
  actions: {
    initAtomData,
    switchAtomTabData
  }
});
