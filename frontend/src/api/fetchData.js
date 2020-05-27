import deepFreeze from "deep-freeze-strict";

import switchAtomTabCleanup from "./helper";

function initAtomTab({ state, dispatch, commit }, payload) {
  return Promise.all([
    fetch("/data/atomPlacements.json"),
    fetch("/data/atomEssential.json"),
    fetch("/data/labelPlacements.json")
  ])
    .then(async responses => {
      return [
        await responses[0].json(),
        await responses[1].json(),
        await responses[2].json()
      ];
    })
    .then(responses => {
      state.atomPlacements = deepFreeze(responses[0].data);
      state.atomSnippets = responses[1].data;
      state.labelPeriodPlacement = responses[2].data.period;
      state.labelGroupPlacement = responses[2].data.group;

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
    .catch(err => console.error(err));
}

// executes when we switch a tab (and want all data to update)
function switchAtomTab({ state, commit }, payload) {
  return new Promise((resolve, reject) => {
    let tabToSwitchTo = payload.to;
    Promise.all([
      // ex. atomColorsCategory, atomColorsOrbitalBlock
      fetch(`/data/atomColorsTab${tabToSwitchTo}.json`),
      // ex. atomTabIsotopes, atomTabProperties
      fetch(`/data/atomTab${tabToSwitchTo}.json`)
    ])
      .then(async responses => {
        return [await responses[0].json(), await responses[1].json()];
      })
      .then(responses => {
        state.atomColors = responses[0].data;
        state.atomTraits = responses[1].data;
        state.atomTraitsUnits = responses[1].meta;

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
