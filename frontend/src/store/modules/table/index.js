import {
  setColorOfOneAtom,
  setColorOfOneGroup,
  setColorOfOnePeriod,
  setColorOfAllButOneAtom,
  setColorOfAllButOnePeriod,
  setColorOfAllButOneGroup,
  setColorOfAllAtoms
} from "@/store/modules/table/atomHighlighting";
import { initAtomData, switchAtomTabData } from "@/api/fetchData";

export default {
  namespaced: true,
  state: {
    // GENERAL
    // Value determining if the data is ready to be rendered (after all Axios requests)
    // 'ready' value changes to 'true' after *some* Axios requests, but good enough (until it breaks)
    ready: false,

    // ATOM
    // shared atom data across all tabs (from atomTabAll.json)
    atomSnippets: [],
    atomSnippetActive: {},

    // atom sidebar data (dependent on the selected tab) for *all* elements
    atomTraits: [],
    atomTraitsActive: {},

    // atom placement data (in the css grid, and in the periodic table itself)
    atomPlacements: [],
    // atom colors (color and deafultColor)
    atomColors: [],

    hoveredAtom: {
      index: 1
    },

    clickedAtom: {
      active: false,

      // When user clicks, want to make clicked element darker than if it was highlighted
      // This also keeps track of the clicked element (if a user decides to hover over a group or period label, changing all element color
      index: -1
    },

    // LABEL
    // placement, color status, and name of period and group labels
    atomLabelPeriods: [],
    atomLabelGroups: [],

    // OPTIONS
    // Changeable options
    options: {
      themeType: "light-def",
      panelLayout: "",
      blurType: "no-blur",

      periodicTableHeightLayoutState: ""
    }
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
      //   (req)  Index of element, where atomSnippetActive properties will get info from
      state.atomSnippetActive = state.atomSnippets[index];
      state.atomSnippetActive.color = state.atomColors[index].defaultColor;
      state.atomTraitsActive = state.atomTraits[index];
    },

    // Purpose: Recolor all period and group labels with the exception of one period or group
    // @param #object 'payload' contains properties:
    //   (req)  .periodExclude  Exclude changing color of particular period (-1 to not exclude any period)
    //   (req)  .groupExclude   Exclude changing color of particular group (-1 to not exclude any group)
    clearLabelExcept: function(state, payload) {
      for (let i = 0; i < state.atomLabelPeriods.length; i++) {
        if (i !== payload.periodExclude) {
          state.atomLabelPeriods[i].color = "light";
        }
      }
      for (let i = 0; i < state.atomLabelGroups.length; i++) {
        if (i !== payload.groupExclude) {
          state.atomLabelGroups[i].color = "light";
        }
      }
    },

    setHoveredAtom: function(state, newIndex) {
      state.hoveredAtom.index = newIndex;
    },

    // Purpose: Change the properties of the clicked element, or the element that was clicked on
    // @param #object 'payload' contains properties:
    //   (opt) .active #boolean If an element has been clicked, or a click was activated
    //   (opt) .index #int Integer of the clicked element (placement in the atomPlacements array)
    //   (opt) .period #int
    //   (opt) .group #int
    setClickedAtom: function(state, newProperties) {
      let { active, index } = newProperties;
      let { period, group } = newProperties;

      if(period && group) {
        state.clickedAtom = { active, index, group, period }
      }
      else {
        state.clickedAtom = { active, index };
      }
    },

    // Purpose: To replace the state options with new ones
    // @param #object 'payload' contains properties:
    //   (req) .themeType #String  The theme that is active
    //   (opt) .panelLayout #String  Location of element information box (the thing that gets changed on element hover etc.)
    //   (opt) Any other properties of options
    setOptions: function(state, newProperties) {
      // Payload contains an object containing properties
      // These properties should replace the properties the atomSnippetActive object (from the vuex state) has
      for (let property in newProperties) {
        // eslint-disable-next-line
        if (state.options.hasOwnProperty(property)) {
          state.options[property] = newProperties[property];
        }
      }
    }
  },
  actions: {
    initAtomData,
    switchAtomTabData
  }
};
