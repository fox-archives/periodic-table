import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

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
    selectedElement: function(state) {

    }
  },
  // Allow to run Async code
  actions: {
    loadElementData() {
      //this.state.hoverBlock = 'jello';
      var that = this;
      // Element Calls
      axios.get('/api/data/element/color')
        .then(function(response) {
          that.state.eColors = response.data;
          console.log("Color Complete");
        })
        .catch(function(error) {
          console.log(error);
        });

      axios.get('/api/data/element/discovered')
        .then(function(response) {
          that.state.eDiscovered = response.data;
          console.log("Discovered Complete");
        })
        .catch(function(error) {
          console.log(error)
        });

      axios.get('/api/data/element/placement')
        .then(function(response) {
          that.state.ePlacements = response.data;
          console.log("Placement Complete");
        })
        .catch(function(error) {
          console.log(error);
        });

      axios.get('/api/data/element/simple')
        .then(function(response) {
          that.state.simpleData = response.data;
          console.log("Simple Complete");
        })
        .catch(function(error) {
          console.log(error);
        });

      // Period / Group calls
      axios.get('/api/data/label/period')
        .then(function(response) {
          that.state.periodData = response.data;
          console.log("Period Complete");
        })
        .catch(function(error) {
          console.log(error);
        });

      axios.get('/api/data/label/group')
        .then(function(response) {
          that.state.groupData = response.data;
          console.log("Group Complete");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});