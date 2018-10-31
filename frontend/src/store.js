import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Arrays of data for all elements
    ubiquitousElementData: undefined,
    placementElementData: undefined,

    colorBlockElementData: [],
    colorCategoryElementData: [],

    // Placement and data of each Period and Group Label
    periodData: [],
    groupData: [],

    ready: false,

    // Element Defaults
    activeElement: {
      atomicNumber: '1',
      abbreviation: 'H',
      name: 'Hydrogen',
      atomicMass: 1.008,
      color: 'blue', // This actually changes the color

      block: 's',
      density: ''
    },

    // Data about a clicked element
    clickedElement: {
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
      infoLocationTypeIsAuto: true,
      blurType: 'no-blur'
    },
    // Content format type
    periodicTableFormat: '',

  },
  getters: {
    // ACCESSING ARRAYS
    ubiquitousElementData: function(state) {
      return state.ubiquitousElementData;
    },
    placementElementData: function(state) {
      return state.placementElementData;
    },
    colorBlockElementData: function(state) {
      return state.colorBlockElementData;
    },
    colorCategoryElementData: function(state) {
      return state.colorCategoryElementData;
    },
    colorShownElementData: function(state) {
      return state.colorShownElementData;
    },
    periodData: function(state) {
      return state.periodData;
    },
    groupData: function(state) {
      return state.groupData;
    },

    // Value determining if the data is ready to be rendered (after all Axios requests)
    // 'ready' value changes to 'true' after *some* Axios requests, but good enough (until it breaks)
    // TODO: Fix this
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
    periodicTableFormat: function(state) {
      return state.periodicTableFormat;
    }
  },
  mutations: {
    // ## PERIODIC TABLE ELEMENT STUFF ## \\

    // Purpose: To change all properties of active element only when element is on 'clicked' mode
    // @param #int 'index':
    //   (req)  Index of element, where activeElement properties will get info from
    updateActiveElement: function(state, index) {
      // Update Store variables with Element information according to index
      if(state.clickedElement.active === false) {
        state.activeElement.atomicNumber = state.ubiquitousElementData[index].atomicNumber;
        state.activeElement.abbreviation = state.ubiquitousElementData[index].abbreviation;
        state.activeElement.name = state.ubiquitousElementData[index].name;
        state.activeElement.atomicMass = state.ubiquitousElementData[index].atomicMass;
        state.activeElement.color = state.colorShownElementData[index].defaultColor;
      }
    },
    // Only call this when user clicks on element (element update is locked) and user clicks on another element
    // Purpose: To change all properties of active element, in any case
    // @param #int 'index':
    //   (req)  Index of element, where activeElement properties will get info from
    updateActiveElementForce: function(state, index) {
      state.activeElement.atomicNumber = state.ubiquitousElementData[index].atomicNumber;
      state.activeElement.abbreviation = state.ubiquitousElementData[index].abbreviation;
      state.activeElement.name = state.ubiquitousElementData[index].name;
      state.activeElement.atomicMass = state.ubiquitousElementData[index].atomicMass;
      state.activeElement.color = state.colorShownElementData[index].defaultColor;
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

    // Purpose: Change the properties of the clicked element, or the element that was clicked on
    // @param #object 'payload' contains properties:
    //   (opt) .active #boolean If an element has been clicked, or a click was activated
    //   (opt) .index #int Integer of the clicked element (placement in the placementElementData array)
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


    // ## MANIPULATING ARRAY OF COLORS ## \\
    // Purpose: To set a variant of the default color to all elements
    // @param #object 'payload' contains properties:
    //   (req) .prefix  Prefix to be added before the original color of element
    setColorOfAllElements: function(state, payload) {
      for(let i = 0; i < state.placementElementData.length; i++) {
        // defaultColor represents default color of a given periodic table element
        let defaultColor = state.colorShownElementData[i].defaultColor;

        Vue.set(state.colorShownElementData[i], 'color', (payload + defaultColor));
      }
    },

    // Purpose: To set a variant of the default color to all but one element period
    // @param #object 'payload' contains properties:
    //   (req) .prefix  Prefix to be added before the original color of element
    //   (req) .exclude  Period to exclude setting the color of
    setColorOfAllButOnePeriod: function(state, payload) {
      for(let i = 0; i < state.placementElementData.length; i++) {
        // elementPeriod represents the period number of a given periodic table element
        let elementPeriod = state.placementElementData[i].period.substring(2);

        // defaultColor represents default color of a given periodic table element
        let defaultColor = state.colorShownElementData[i].defaultColor;

        // If the element period is excluded (from @param 'payload')
        // Allow type coercion (so '1' == 1)
        if(elementPeriod != payload.exclude) {
          Vue.set(state.colorShownElementData[i], 'color', (payload.prefix + defaultColor));
        }
      }
    },

    // Purpose: To set a variant of the default color to all but one element group
    // @param #object 'payload' contains properties:
    //   (req) .prefix  Prefix to be added before the original color of element
    //   (req) .exclude  Group to be excluded setting the color of
    setColorOfAllButOneGroup: function(state, payload) {
      for(let i = 0; i < state.placementElementData.length; i++) {
        // elementGroup represents the group number of a given periodic table element
        let elementGroup = state.placementElementData[i].group.substring(2);

        // defaultColor represents default color of a given periodic table element
        let defaultColor = state.colorShownElementData[i].defaultColor;

        // If the element group is excluded (from @param 'payload')
        // Allow type coercion (so '1' == 1)
        if(elementGroup != payload.exclude) {
          Vue.set(state.colorShownElementData[i], 'color', (payload.prefix + defaultColor));
        }
      }
    },

    // Purpose: To set a variant of the default color to all but one element
    // @param #object 'payload' contains properties:
    //   (req) .prefix  Prefix to be added before the original color of element
    //   (req) .exclude  Element to be excluded setting the color of (index)
    setColorOfAllButOneElement: function(state, payload) {
      for(let i = 0; i < state.placementElementData.length; i++) {

        // defaultColor represents default color of a given periodic table element
        let defaultColor = state.colorShownElementData[i].defaultColor;

        // If the element group is excluded (from @param 'payload')
        // Allow type coercion (so '1' == 1)

        // i represents the index of the element to be excluded
        if(i != payload.exclude) {
          Vue.set(state.colorShownElementData[i], 'color', (payload.prefix + defaultColor));
        }
      }
    },

    // Purpose: To set a variant of the default color to any one element period
    // @param #object 'payload' contains properties:
    //   (req) .prefix  Prefix to be added before the original color of element
    //   (req) .include  Period to include setting the color of
    setColorOfOnePeriod: function(state, payload) {
      for(let i = 0; i < state.placementElementData.length; i++) {
        // elementPeriod represents the period number of a given periodic table element
        let elementPeriod = state.placementElementData[i].period.substring(2);

        // defaultColor represents default color of a given periodic table element
        let defaultColor = state.colorShownElementData[i].defaultColor;

        // If the element period is excluded (from @param 'payload')
        // Allow type coercion (so '1' == 1)
        if(elementPeriod == payload.include) {
          Vue.set(state.colorShownElementData[i], 'color', (payload.prefix + defaultColor));
        }
      }
    },

    // Purpose: To set a variant of the default color to any one element group
    // @param #object 'payload' contains properties:
    //   (req) .prefix  Prefix to be added before the original color of element
    //   (req) .include  Group to be included setting the color of
    setColorOfOneGroup: function(state, payload) {
      for(let i = 0; i < state.placementElementData.length; i++) {
        // elementGroup represents the group number of a given periodic table element
        let elementGroup = state.placementElementData[i].group.substring(2);

        // defaultColor represents default color of a given periodic table element
        let defaultColor = state.colorShownElementData[i].defaultColor;

        // If the element group is excluded (from @param 'payload')
        // Allow type coercion (so '1' == 1)
        if(elementGroup == payload.include) {
          Vue.set(state.colorShownElementData[i], 'color', (payload.prefix + defaultColor));
        }
      }
    },

    // Purpose: To set a variant of the default color to any one element
    // @param #object 'payload' contains properties:
    //   (req) .i  ith term to change the color of (starts at 0)
    //   (req) .prefix  Prefix to prefix to the color
    setColorOfOneElement: function(state, payload) {
      let defaultColor = state.colorShownElementData[payload.i].defaultColor;
      Vue.set(state.colorShownElementData[payload.i], 'color', (payload.prefix + defaultColor));
    },


    // ## NAVIGATION STUFF ## \\
    // Purpose: To replace the state options with new ones
    // @param #object 'payload' contains properties:
    //   (req) .themeType #String  The theme that is active
    //   (opt) .infoLocationType #String  Location of element information box (the thing that gets changed on element hover etc.)
    //   (opt) Any other properties of options
    setOptions: function(state, newProperties) {
      // Payload contains an object containing properties
      // These properties should replace the properties the options object (from the vuex state)
      for(let property in newProperties) {
        if(state.options.hasOwnProperty(property)) {
          state.options[property] = newProperties[property];
        }
      }
    },

    // ## LAYOUT STUFF ## \\
    // This script makes the periodic-table and element info panel not have a height
    // bigger than the browser on info-side
    setClassLayout: function(state) {
      // Test if the height of periodic-table and element-info-panel are the same
      // This assumes the properties-visual.vue goes all the way to bottom of window (stops right above footer)

      let panelHeight = document.getElementById('grid-container').offsetHeight;
      let periodicTableHeight = document.getElementById('grid-outer').offsetHeight;

      // Only change the style if the periodic-table has a greater or equal height for properties-visual.vue
      if (periodicTableHeight >= panelHeight && periodicTableHeight !== 0 && panelHeight !== 0) {
        // This means if panel and periodic-table fill whole window height, increasing
        // width will not increase size of periodic-table, instead it creates whitespace;
        // periodic-table will only increase if the height of browser window increases
        state.periodicTableFormat = 'heightSame';
      }
      else {
        state.periodicTableFormat = 'heightDifferent';
      }
    },
    setMobilePeriodicTableWidth: function(state) {
      if(/*this.options.infoLocationType === 'info-top' && */state.periodicTableFormat === 'heightDifferent') {
        // To change the length of the #grid-container (so #grid-outer scrolls to fit)
        let gridContainer = document.getElementById('grid');

        // Be sure to change the ratio in periodic-table.scss if changed here
        let periodicTableRatio = 0.6;

        // Subtract 2 because recall CSS says the height is calc(100% - 2px)
        // All I know is that when 2 is removed, then scrollbar is shown for small widths for info-side
        gridContainer.style.width = (gridContainer.clientHeight - 2) / 0.6 + 'px';
      }
      else {
        document.getElementById('grid').style.width = '';
      }
    },

    // This changes the CSS variable to size the element text
    // Recall the CSS variables are declared in periodic-table.scss
    sizeElementsText: function() {
      let grid = document.getElementById('grid');

      let elementWidth = grid.childNodes[0].clientWidth;
      let primaryFontSize = (elementWidth * 0.32) + 'px';
      let secondaryFontSize = (elementWidth * 0.2) + 'px';
      let labelFontSize = (elementWidth * 0.3) + 'px';

      // Setting CSS Variables for All Elements
      // Variables stores in grid
      grid.style.setProperty('--primaryTextSize', primaryFontSize);
      grid.style.setProperty('--secondaryTextSize', secondaryFontSize);
      grid.style.setProperty('--labelTextSize', labelFontSize);
    }
  },
  actions: {
    loadElementData: function() {
      axios.get('/element-data/placement.json')
        .then((response) => {
          this.state.placementElementData = response.data;
        })
        .catch((error) => console.log(error));

      axios.get('/element-data/ubiquitous.json')
        .then((response) => {
          this.state.ubiquitousElementData = response.data;
          this.state.ready = true;
        })
        .catch((error) => console.log(error));
    },
    loadPeriodGroupLabels: function(state, payload) {
      axios.get('/element-data/period.json')
        .then((response) => {
          this.state.periodData = response.data;
        })
        .catch((error) => console.log(error));

      axios.get('/element-data/group.json')
        .then((response) => {
          this.state.groupData = response.data;
        })
        .catch((error) => console.log(error));
    },
    fetchElementColors: function(state) {
      function getElementBlockColors() { return axios.get('/element-data/block.json'); }
      function getCategoryDataColors() { return axios.get('/element-data/type.json'); }

      axios.all([getElementBlockColors(), getCategoryDataColors()])
        .then(axios.spread(function(blockData, categoryData) {
          // console.log(blockData.data);
          // console.log(categoryData.data);
          // TODO: Temp and DIRTY fix
          state.state.colorBlockElementData = blockData.data;
          state.state.colorCategoryElementData = categoryData.data;
          // state.colorBlockElementData = blockData.data;
          // state.colorCategoryElementData = categoryData.data;
        }));
    }
  }
});
