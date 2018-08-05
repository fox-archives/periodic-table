import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Simple data about each element
    simpleData: [],

    // Placement and Colors of Each Element
    ePlacements: [],
    eColors: [],

    // Placement and data of each Period and Group Label
    periodData: [],
    groupData: [],

    // Discovery Date of Elements
    eDiscovered: [],

    ready: false,

    // Element Defaults
    activeElement: {
      atomicNumber: '1',
      abbreviation: 'H',
      name: 'Hydrogen',
      atomicMass: 1.008,
      block: 's',
      color: 'blue', // This actually changes the color
      discoveryDate: '1766',
      discoveredBy: 'Henry Cavendish',
      index: 0,
    },

    // Data about a clicked element
    clickedElement: {
      clickActive: false,

      // When user clicks, want to make clicked element darker than if it was highlighted
      // This also keeps track of the clicked element (if a user decides to hover over a group or period label, changing all element color
      clickedElementIndex: -1,
      clickedElementPeriod: -1,
      clickedElementGroup: -1,
    },

    // Changeable options
    options: {
      themeType: 'light-def',
      infoLocationType: 'info-obtrusive',
    },

    // Remove this after code accesses the options object rather than taking values directly from the Vuex store state
    themeType: 'light-def',
    infoLocationType: 'info-obtrusive',

  },
  getters: {
    // ACCESSING ARRAYS
    simpleData: function(state) {
      return state.simpleData;
    },
    ePlacements: function(state) {
      return state.ePlacements;
    },
    eColors: function(state) {
      return state.eColors;
    },
    periodData: function(state) {
      return state.periodData;
    },
    groupData: function(state) {
      return state.groupData;
    },
    eDiscovered: function(state) {
      return state.eDiscovered;
    },

    // Value determining if the data is ready to be rendered (after all Axios requests)
    // 'ready' value changes to 'true' after *some* Axios requests, but good enough
    ready: function(state) {
      return state.ready;
    },

    // Info about the hovered element
    activeElement: function(state) {
      return state.activeElement;
    },
    clickedElement: function(state) {
      return state.clickedElement;
    },

    options: function(state) {
      return state.options;
    },

    // TO BE REMOVED (in place of the options object)
    themeType: function(state) {
      return state.themeType;
    },
    infoLocationType: function(state) {
      return state.infoLocationType;
    },

    // OTHER GETTERS (MOSTLY CALCULATIONS)



  },
  mutations: {
    // TODO: Remove the 'Force'
    updateActiveElement: function(state, index) {
      // Update Store variables with Element information according to index
      if(state.clickActive === false) {
        state.hoverIndex = state.index;
        state.hoverAbbreviation = state.simpleData[index].abbreviation;
        state.hoverName = state.simpleData[index].name;
        state.hoverAtomicMass = state.simpleData[index].atomicMass;

        // Update element description (right box)
        state.hoverDiscoveryDate = state.eDiscovered[index].discoveryDate;
        state.hoverDiscoveredBy = state.eDiscovered[index].discoveredBy;
        state.hoverColor = state.eColors[index].defaultColor;
      }
    },
    // Only call this when user clicks on element (element update is locked) and user clicks on another element
    updateActiveElementForce: function(state, index) {
      state.hoverIndex = state.index;
      state.hoverAbbreviation = state.simpleData[index].abbreviation;
      state.hoverName = state.simpleData[index].name;
      state.hoverAtomicMass = state.simpleData[index].atomicMass;

      // Update element description (right box)
      state.hoverDiscoveryDate = state.eDiscovered[index].discoveryDate;
      state.hoverDiscoveredBy = state.eDiscovered[index].discoveredBy;
      state.hoverColor = state.eColors[index].defaultColor;
    },
    clearLabelExcept: function(state, payload) {
      // Clears all period.json / group labels, except for one period.json / group label
      let periodExclude = payload.periodExlucde;
      let groupExclude = payload.groupExclude;

      for(let i = 0; i < state.periodData.length; i++) {
        if(i !== periodExclude) {
          state.periodData[i].color = "light";
        }
      }
      for(let i = 0; i < state.groupData.length; i++) {
        if(i !== groupExclude) {
          state.groupData[i].color = "light";
        }
      }
    },

    setActiveElement: function(state, newProperties) {
      // Payload contains an object containing properties
      // These properties should replace the properties the activeElement object (from the vuex state) has
      for(let property in newProperties) {
        if(state.activeElement.hasOwnProperty(property)) {
          state.activeElement[property] = newProperties[property];
        }
      }

    },


  },
  // Allow to run Async code
  actions: {
    loadElementData() {
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
          that.state.ready = true;
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