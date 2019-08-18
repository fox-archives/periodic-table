import axios from "axios";
import deepFreeze from "deep-freeze-strict";
import { setColorOfOneAtom } from "@/store/modules/mainAtomTable/atomHighlighting";

function initAtomData({ state, dispatch, commit }, payload) {
  Promise.all([
    axios.get("/data/atomLayoutPlacement.json"),
    axios.get("/data/atomSnippets.json"),
    axios.get("/data/labelLayoutPlacement.json")
  ])
    .then(responses => {
      let atomPlacementsResult = responses[0];
      let atomSnippetResult = responses[1];
      let labelPlacementsResult = responses[2];
      state.atomPlacements = atomPlacementsResult.data;
      state.atomSnippets = atomSnippetResult.data;
      state.atomLabelPeriods = labelPlacementsResult.data.labelPeriods;
      state.atomLabelGroups = labelPlacementsResult.data.labelGroups;

      let { currentRoute } = payload;
      return dispatch("switchAtomTabData", {
        atomColorAppearance: currentRoute.name,
        atomTab: currentRoute.name
      });
    })
    .then(() => {
      commit("updateActiveAtom", 0);
    })
    .catch(e => console.error(e));
}

// executes when we switch a tab (and want all data to update)
function switchAtomTabData({ state, commit }, payload) {
  return new Promise((resolve, reject) => {
    Promise.all([
      // ex. atomColorsCategory, atomColorsOrbitalBlock
      axios.get(`/data/atomColorsTab${payload.atomColorAppearance}.json`),

      // ex. atomTabIsotopes, atomTabProperties
      axios.get(`/data/atomTab${payload.atomTab}.json`)
    ])
      .then(responses => {
        let atomColorAppearanceResult = responses[0];
        let atomTraitsResult = responses[1];

        state.atomColors = atomColorAppearanceResult.data;
        state.atomTraits = atomTraitsResult.data.data;

        if(state.clickedAtom.index === -1) {
          commit("updateActiveAtom", state.hoveredAtom.index);
        }
        else {
          commit("updateActiveAtom", state.clickedAtom.index);

          commit("setColorOfOneAtom", {
            prefix: "supdark-",
            i: state.clickedAtom.index
          });
        }

        state.ready = true;
        resolve();
      })
      .catch(e => {
        console.error(e);
        reject();
      });
  });
}

export { initAtomData, switchAtomTabData };
