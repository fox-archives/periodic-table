import axios from "axios";
import deepFreeze from "deep-freeze-strict";

import switchAtomTabCleanup from "./helper";

function initAtomTab({ state, dispatch, commit }, payload) {
  return Promise.all([
    axios.get("/data/atomPlacements.json"),
    axios.get("/data/atomEssential.json"),
    axios.get("/data/labelPlacements.json")
  ])
    .then(responses => {
      state.atomPlacements = deepFreeze(responses[0].data.data);
      state.atomSnippets = responses[1].data.data;
      state.labelPeriodPlacement = responses[2].data.data.period;
      state.labelGroupPlacement = responses[2].data.data.group;

      let { currentTab } = payload;
      return dispatch("switchAtomTab", { to: currentTab.name });
    })
    .then(() => {
      if (state.clickedAtom.index === -1) {
        commit("updateActiveAtom", state.hoveredAtom.index);
      } else {
        commit("updateActiveAtom", state.clickedAtom.index);
      }
    })
    .catch(e => console.error(e));
}

// executes when we switch a tab (and want all data to update)
function switchAtomTab({ state, commit }, payload) {
  return new Promise((resolve, reject) => {
    let tabToSwitchTo = payload.to;
    Promise.all([
      // ex. atomColorsCategory, atomColorsOrbitalBlock
      axios.get(`/data/atomColorsTab${tabToSwitchTo}.json`),

      // ex. atomTabIsotopes, atomTabProperties
      axios.get(`/data/atomTab${tabToSwitchTo}.json`)
    ])
      .then(responses => {
        state.atomColors = responses[0].data.data;
        state.atomTraits = responses[1].data.data;
        state.atomTraitsUnits = responses[1].data.meta;

        switchAtomTabCleanup({ state, commit });

        state.ready = true;
        resolve();
      })
      .catch(err => {
        console.error(err);
        reject();
      });
  });
}

export { initAtomTab, switchAtomTab };
