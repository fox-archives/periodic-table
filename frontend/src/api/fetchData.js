import axios from "axios";
import deepFreeze from "deep-freeze-strict";

import switchAtomTabCleanup from "./helper";

function initAtomTab({ state, dispatch, commit }, payload) {
  return Promise.all([
    axios.get("/data/atomPlacements.json"),
    axios.get("/data/atomSnippets.json"),
    axios.get("/data/labelPlacements.json")
  ])
    .then(responses => {
      {
        let atomPlacementsR = responses[0];
        let atomSnippetsR = responses[1];
        let labelPlacementsR = responses[2];

        state.atomPlacements = deepFreeze(atomPlacementsR.data);
        state.atomSnippets = atomSnippetsR.data;
        state.labelPeriodPlacement = labelPlacementsR.data.period;
        state.labelGroupPlacement = labelPlacementsR.data.group;
      }

      let { currentTab } = payload;
      return dispatch("switchAtomTab", { to: currentTab.name });
    })
    .then(() => {
      commit("updateActiveAtom", 0);
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
        {
          let atomColorAppearanceR = responses[0];
          let atomTraitsR = responses[1];

          state.atomColors = atomColorAppearanceR.data;
          state.atomTraits = atomTraitsR.data.data;
        }

        switchAtomTabCleanup({ state, commit });

        state.ready = true;
        resolve();
      })
      .catch(e => {
        console.error(e);
        reject();
      });
  });
}

export { initAtomTab, switchAtomTab };
