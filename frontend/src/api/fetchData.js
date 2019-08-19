import axios from "axios";
import deepFreeze from "deep-freeze-strict";

import switchAtomTabCleanup from "./helper";

function initAtomTab({ state, dispatch, commit }, payload) {
  return Promise.all([
    axios.get("/data/atomPlacement.json"),
    axios.get("/data/atomSnippets.json"),
    axios.get("/data/labelPlacement.json")
  ])
    .then(responses => {
      {
        let atomPlacementR = responses[0];
        let atomSnippetR = responses[1];
        let labelPlacementR = responses[2];

        state.atomPlacements = deepFreeze(atomPlacementR.data);
        state.atomSnippets = atomSnippetR.data;
        state.labelPeriodPlacement = labelPlacementR.data.period;
        state.labelGroupPlacement = labelPlacementR.data.group;
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
