import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default = new Vuex.Store({
  state: {
    elements: [],

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
  },
  getters: {

  },
  // Allow to run Async code
  actions: {

  }
});