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
      // COMMENTED OUT OLD VALUES
      active: false,

      // When user clicks, want to make clicked element darker than if it was highlighted
      // This also keeps track of the clicked element (if a user decides to hover over a group or period label, changing all element color
      index: -1,
      period: -1,
      group: -1
    },

    // Changeable options
    options: {
      themeType: 'light-def',
      infoLocationType: 'info-auto',
      blurType: 'no-blur'
    }

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
    }
  },
  mutations: {
    // TODO: Remove the 'Force'
    updateActiveElement: function(state, index) {
      // Update Store variables with Element information according to index
      if(state.clickedElement.active === false) {
        state.activeElement.index = state.index;
        state.activeElement.abbreviation = state.simpleData[index].abbreviation;
        state.activeElement.name = state.simpleData[index].name;
        state.activeElement.atomicMass = state.simpleData[index].atomicMass;

        // Update element description (right box)
        state.activeElement.discoveryDate = state.eDiscovered[index].discoveryDate;
        state.activeElement.discoveredBy = state.eDiscovered[index].discoveredBy;
        state.activeElement.color = state.eColors[index].defaultColor;
      }
    },
    // Only call this when user clicks on element (element update is locked) and user clicks on another element
    updateActiveElementForce: function(state, index) {
      state.activeElement.index = state.index;
      state.activeElement.abbreviation = state.simpleData[index].abbreviation;
      state.activeElement.name = state.simpleData[index].name;
      state.activeElement.atomicMass = state.simpleData[index].atomicMass;

      // Update element description (right box)
      state.activeElement.discoveryDate = state.eDiscovered[index].discoveryDate;
      state.activeElement.discoveredBy = state.eDiscovered[index].discoveredBy;
      state.activeElement.color = state.eColors[index].defaultColor;
    },

    // Purpose: Recolor all period and group labels with the exception of one period or group
    // @param #object 'payload' contains properties:
    //   (req)  .periodExclude  Exclude changing color of particular period (-1 to not exclude any period)
    //   (req)  .groupExclude   Exclude changing color of particular group (-1 to not exclude any group)
    clearLabelExcept: function(state, payload) {
      for(let i = 0; i < state.periodData.length; i++) {
        if(i !== payload.periodExclude) {
          state.periodData[i].color = 'light';
        }
      }
      for(let i = 0; i < state.groupData.length; i++) {
        if(i !== payload.groupExclude) {
          state.groupData[i].color = 'light';
        }
      }
    },

    // Purpose: Change the properties of the active element, or the element that was clicked on
    // @param #object 'payload' contains properties:
    //   Each possible property are the same properties as this.activeElement
    setActiveElement: function(state, newProperties) {
      // Payload contains an object containing properties
      // These properties should replace the properties the activeElement object (from the vuex state) has
      for(let property in newProperties) {
        if(state.activeElement.hasOwnProperty(property)) {
          state.activeElement[property] = newProperties[property];
        }
      }
    },
    // Purpose: Change the properties of the clicked element, or the element that was clicked on
    // @param #object 'payload' contains properties:
    //   (opt) .active #boolean If an element has been clicked, or a click was activated
    //   (opt) .index #int Integer of the clicked element (placement in the ePlacements array)
    //   (opt) .period #int Period number of the clicked element (actual period, does not start at 0)
    //   (opt) .group #int Group number of the clicked element (actual group, does not start at 0)
    setClickedElement: function(state, newProperties) {
      // Payload contains an object containing properties
      // These properties should replace the properties the activeElement object (from the vuex state) has
      for(let property in newProperties) {
        if(state.clickedElement.hasOwnProperty(property)) {
          state.clickedElement[property] = newProperties[property];
        }
      }
    },

    // NEW METHODS (MORE EFFICIENT)
    // @param #object 'payload' contains properties:
    //   (req)  .prefix  Prefix to be added before the original color of an element
    setColorOfAllElements: function(state, prefix) {
      for(let i = 0; i < state.ePlacements.length; i++) {
        // defaultColor represents default color of a given periodic table element
        let defaultColor = state.eColors[i].defaultColor

        Vue.set(state.eColors[i], 'color', (prefix + defaultColor));
      }
    },

    // @param #object 'payload' contains properties:
    //   (req) .prefix  Prefix to be added before the original color of element
    //   (req) .exclude  Period to exclude setting the color of
    setColorOfAllButOnePeriod: function(state, payload) {
      for(let i = 0; i < state.ePlacements.length; i++) {
        // elementPeriod represents the period number of a given periodic table element
        let elementPeriod = state.ePlacements[i].period.substring(2);

        // defaultColor represents default color of a given periodic table element
        let defaultColor = state.eColors[i].defaultColor;

        // If the element period is excluded (from @param 'payload')
        // Allow type coercion (so '1' == 1)
        if(elementPeriod != payload.exclude) {
          Vue.set(state.eColors[i], 'color', (payload.prefix + defaultColor));
        }
      }
    },

    // @param #object 'payload' contains properties:
    //   (req) .prefix  Prefix to be added before the original color of element
    //   (req) .exclude  Group to be excluded setting the color of
    setColorOfAllButOneGroup: function(state, payload) {
      for(let i = 0; i < state.ePlacements.length; i++) {
        // elementGroup represents the group number of a given periodic table element
        let elementGroup = state.ePlacements[i].group.substring(2);

        // defaultColor represents default color of a given periodic table element
        let defaultColor = state.eColors[i].defaultColor;

        // If the element group is excluded (from @param 'payload')
        // Allow type coercion (so '1' == 1)
        if(elementGroup != payload.exclude) {
          Vue.set(state.eColors[i], 'color', (payload.prefix + defaultColor));
        }
      }
    },

    // @param #object 'payload' contains properties:
    //   (req) .prefix  Prefix to be added before the original color of element
    //   (req) .exclude  Element to be excluded setting the color of (index)
    setColorOfAllButOneElement: function(state, payload) {
      for(let i = 0; i < state.ePlacements.length; i++) {

        // defaultColor represents default color of a given periodic table element
        let defaultColor = state.eColors[i].defaultColor;

        // If the element group is excluded (from @param 'payload')
        // Allow type coercion (so '1' == 1)

        // i represents the index of the element to be excluded
        if(i != payload.exclude) {
          Vue.set(state.eColors[i], 'color', (payload.prefix + defaultColor));
        }
      }
    },

    // @param #object 'payload' contains properties:
    //   (req) .prefix  Prefix to be added before the original color of element
    //   (req) .include  Period to include setting the color of
    setColorOfOnePeriod: function(state, payload) {
      for(let i = 0; i < state.ePlacements.length; i++) {
        // elementPeriod represents the period number of a given periodic table element
        let elementPeriod = state.ePlacements[i].period.substring(2);

        // defaultColor represents default color of a given periodic table element
        let defaultColor = state.eColors[i].defaultColor;

        // If the element period is excluded (from @param 'payload')
        // Allow type coercion (so '1' == 1)
        if(elementPeriod == payload.include) {
          Vue.set(state.eColors[i], 'color', (payload.prefix + defaultColor));
        }
      }
    },

    // @param #object 'payload' contains properties:
    //   (req) .prefix  Prefix to be added before the original color of element
    //   (req) .include  Group to be included setting the color of
    setColorOfOneGroup: function(state, payload) {
      for(let i = 0; i < state.ePlacements.length; i++) {
        // elementGroup represents the group number of a given periodic table element
        let elementGroup = state.ePlacements[i].group.substring(2);

        // defaultColor represents default color of a given periodic table element
        let defaultColor = state.eColors[i].defaultColor;

        // If the element group is excluded (from @param 'payload')
        // Allow type coercion (so '1' == 1)
        if(elementGroup == payload.include) {
          Vue.set(state.eColors[i], 'color', (payload.prefix + defaultColor));
        }
      }
    },



    // Sets the color of any elements in the periodic table (NOT the default color)
    setColorOfOneElement: function(state, payload) {
      // Payload contains an object containing properties
      //console.log("setColorOfOneElement Called");

      let defaultColor = state.eColors[payload.i].defaultColor;
      Vue.set(state.eColors[payload.i], 'color', (payload.prefix + defaultColor));
    },


    // NAVIGATION STUFF

    // @param #object 'payload' contains properties:
    //   (req) .themeType #String  The theme that is active
    //   (req) .infoLocationType #String  Location of element information box (the thing that gets changed on element hover etc.)
    setOptions: function(state, payload) {
      // Payload contains an object containing properties
      // These properties should replace the properties the activeElement object (from the vuex state) has
      for(let property in newProperties) {
        if(state.options.hasOwnProperty(property)) {
          state.options[property] = newProperties[property];
        }
      }
    },
  },
  // Allow to run Async code
  actions: {
    loadElementData: function() {
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