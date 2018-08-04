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

    eDiscovered: [],
    eColors: ['informatin'],
    ready: false,

    // Element Defaults
    showElement: {
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


    clickActive: false,

    // When user clicks, want to make clicked element darker than if it was highlighted
    clickedElementIndex: -1,
    clickedElementPeriod: -1,
    clickedElementGroup: -1,

    themeType: 'light-def',
    infoLocationType: 'info-obtrusive',

    elementHovered: {
      "test": "information",
      "test2": "informaion2"
    }
  },
  getters: {
    test: function(state) {
      return "Here is some text returned from SelectedElement method in store.js";
    },
    simpleData: function(state) {
      return state.simpleData;
    },
    simpleDataObject: function(state, index) {
      return state.simpleData[index];
    },
    ePlacements: function(state) {
      return state.ePlacements;
    },
    periodData: function(state) {
      return state.periodData;
    },
    groupData: function(state) {
      return state.groupData;
    },
    eColors: function(state) {
      return state.eColors;
    },
    ready: function(state) {
      return state.ready;
    },
    showElement: function(state) {
      return state.showElement;
    },
    clickActive: function(state) {
      return state.clickActive;
    },
    clickedElementIndex: function(state) {
      return state.clickedElementIndex;
    },
    clickedElementPeriod: function(state) {
      return state.clickedElementPeriod;
    },
    clickedElementGroup: function(state) {
      return state.clickedElementGroup;
    },
    themeType: function(state) {
      return state.themeType;
    },
    infoLocationType: function(state) {
      return state.infoLocationType;
    },

    elementHovered: function(state) {
      return state.elementHovered;
    }

  },
  mutations: {
    updateElementInfoAndDesc: function(state, index) {
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
    darkenElements: function(state, index, prefix, type) {
      // On hover, clear all other label highlights
      state.clearLabelExcept(-1, -1);
      // Change element description and shade on hover of label (only if element description is inside)
      if(state.infoLocationType === "info-obtrusive") {
        state.hoverColor = "light-" + state.eColors[state.hoverIndex].defaultColor;
      }

      let className = state.labelNoneToClass(index + 1, type);

      // Get elements that need to be lightened (elements to be lightened either in a period.json or group)
      if(type === "period") {
        for(let i = 0; i < state.ePlacements.length; i++) {
          if(state.ePlacements[i].period === className) {
            let defaultColor = state.eColors[i].defaultColor;
            Vue.set(state.eColors[i], 'color', (prefix + defaultColor))
          }
        }
      }
      else if(type === "group") {
        for(let i = 0; i < state.ePlacements.length; i++) {
          if(state.ePlacements[i].group === className) {
            let defaultColor = state.eColors[i].defaultColor;
            Vue.set(state.eColors[i], 'color', (prefix + defaultColor))
          }
        }
      }
    },
    // Changes shade of hovered element (lighten or darken, or default)
    setElementColor: function(state, index, shade) {
      if(state.clickedElementIndex !== index) {
        // Gets current default color
        let defaultColor = state.eColors[index].defaultColor;

        // Sets current default color ('color' is the property we want to change)
        Vue.set(state.eColors[index], 'color', (shade + defaultColor));
      }
    },
    // Similar to setElementColor, but does it by force (sets color even if ths.clickedElementIndex is not the same as the index)
    setElementColorForce: function(state, index, shade) {
      // Gets current default color
      let defaultColor = state.eColors[index].defaultColor;

      // Sets current default color
      Vue.set(state.eColors[index], 'color', (shade + defaultColor));
    },
    // Sets the color of all elements (usually the default color)
    setAllElementsColor: function(state, shade) {
      for(let i = 0; i < state.eColors.length; i++) {
        if(i !== state.clickedElementIndex) {
          let defaultColor = state.eColors[i].defaultColor;
          Vue.set(state.eColors[i], 'color', (shade + defaultColor));
        }
      }
    },
    lightenElements: function(state, index, prefix, type, typeShort) {
      
      let className = state.labelNoneToClass(index + 1, type);

      // Get elements that need to be lighened (elements to be lightened either in a period.json or group)
      if(type === "period") {
        for(let i = 0; i < state.ePlacements.length; i++) {
          if(state.ePlacements[i].period !== className) {
            let defaultColor = state.eColors[i].defaultColor;
            Vue.set(state.eColors[i], 'color', (prefix + defaultColor))
          }
        }
      }
      else if(type === "group") {
        for(let i = 0; i < state.ePlacements.length; i++) {
          if(state.ePlacements[i].group !== className) {
            let defaultColor = state.eColors[i].defaultColor;
            Vue.set(state.eColors[i], 'color', (prefix + defaultColor))
          }
        }
      }
    },
    changeLabelColor: function(state, index, isMouseOver) {
      // isMouseOver is true when the moues is entering an element. isMouesOver is false when the mouse is leaving an element
      // The element that the mouse is entering or leaving is determined by its index in the Vue v-for loop

      // Get the period.json or group value corresponding to the hovered over element (ex. c-11, p-5)
      let periodFull = state.ePlacements[index].period;
      let groupFull = state.ePlacements[index].group;

      // Concatonate period.json or group values to a number (ex. 11, 5)
      let period = state.labelClassToNone(periodFull);
      let group = state.labelClassToNone(groupFull);

      if(state.clickActive === false) {
        // When changing a label, make sure all others are turned off first
        state.clearLabelExcept(-1, -1);

        // Only darken the label if the element actually has a valid period.json number (within the actual range of the periodic table)
        // Recall Act. and Lan. have period.json of 0, and they don't have period.json / group labels
        if(period > 0) {
          // Darken the labels if the mouse is entering an element
          if(isMouseOver === "true") {
            state.periodData[period - 1].color = "dark";
          }
          // Lighten the labels if the mouse is leaving an element
          else if(isMouseOver === "false") {
            state.periodData[period - 1].color = "light";
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
            state.groupData[group - 1].color = "dark";
          }
          // Lighten the labels if the moues is leaving an element
          else if(isMouseOver === "false") {
            state.groupData[group - 1].color = "light";
          }
          else {
            console.log("Unexpected parameter for isMouseOver passed through changeLabelColor.");
          }
        }
      }
    },
    // type can either be "mouesOver" or "mouseLeave"
    maintenanceAfter: function(state, index, type) {
      if(type === "mouseLeave") {
        // By 'click' being active, mean that the user clicked on an element, and wants to display that element, even if mouse moves away from element
        // If click is active, on mouse leave of label, show the previous element that was clicked on (because it got 'erased' on mouseover of label)
        if(state.clickActive === true) {
          // Recall that state.clickedElementPeriod and state.clickedElementGroup are NOT indexes; they are actual values
          // We don't want to change color when state.clickedElementPeriod / group is 0 that value is for groupless elements (lanth. and act. elements)
          // Nor do we want to change color when state.clickedElementPeriod / group is -1, because that occurs when state.clickActive is false (I think state is already covered, but just a precaution)
          if(state.clickedElementPeriod > 0) {
            state.periodData[state.clickedElementPeriod - 1].color = "dark";
          }
          if(state.clickedElementGroup > 0) {
            state.groupData[state.clickedElementGroup - 1].color = "dark";
          }
          Vue.set(state.eColors[state.clickedElementIndex], 'color', ("supdark-" + state.eColors[state.clickedElementIndex].color));
        }
        // Make element overview and desc normal color
        state.hoverColor = state.eColors[state.hoverIndex].defaultColor;
      }
    },
    clearLabelExcept: function(periodExclude, groupExclude) {
      // Clears all period.json / group labels, except for one period.json / group label
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
    // When element is clicked, darken it
    clickElement: function(state, index) {
      // Change element info and label color (in case the mouse does not movein or moveout the element)
      state.clickActive = false;
      this.changeLabelColor(index, "true");
      this.updateElementInfoAndDesc(index);
      state.clickActive = true;

      // What to do if clicking for the first time, or clicking on a different element
      // Save the index (element index, period.json index, and group index) of the clicked on element
      if(state.clickedElementIndex === -1 || state.clickedElementIndex !== index) {
        state.clickedElementIndex = index;

        state.clickedElementPeriod = state.labelClassToNone( state.ePlacements[index].period );
        state.clickedElementGroup = state.labelClassToNone( state.ePlacements[index].group );


        // Sets color of all elements in periodic table
        state.setAllElementsColor('');
        state.setElementColorForce(index, "supdark-");
      }
      // What to do if clicking on the same element twice (cancels elementHold)
      else if(state.clickedElementIndex === index) {
        state.clickActive = false;
        state.clickedElementIndex = -1;
        state.clickedElementPeriod = -1;
        state.clickedElementGroup = -1;

        // Sets colour of all elements in periodic table
        state.setAllElementsColor('');
        state.setElementColorForce(index, "dark-");
      }
    },
    labelClassToNone: function(state, labelNumber) {
      return labelNumber.substring(2);
    },
    labelNoneToClass: function(state, labelNumber, type) {
      // className are the classes that need to be highlighted "p" stands for period.json, "g" stands for group
      if(type === "period") {
        return "p-" + (labelNumber);
      }
      else if(type === "group") {
        return "g-" + (labelNumber);
      }
    },
    // OUTPUT: Group 1 / Period 7
    getPeriodGroupName: function(state, type, number) {
      if(type === "period") {
        return "Period " + number;
      }
      else if(type === "group") {
        return "Group " + number;
      }
    },
    periodNotification: function(state, index) {
      state.$vs.notify({
        title: this.getPeriodGroupName('period', state.periodData[index].display),
        text: state.periodData[index].name,
        time: 3000
      });
    },
    groupNotification: function(state, index) {
      state.$vs.notify({
        title: this.getPeriodGroupName('group', state.groupData[index].display),
        text: state.groupData[index].name,
        time: 3000
      });
    }

  },
  // Allow to run Async code
  actions: {
    loadElementData(state) {
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