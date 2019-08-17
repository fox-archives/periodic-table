import axios from "axios";

function initAtomData({ state, dispatch, commit }) {
  Promise.all([
    axios.get("/data/atomLayoutPlacement.json"),
    axios.get("/data/atomTabAll.json"),
    axios.get("/data/labelLayoutPlacement.json")
  ])
    .then(responses => {
      let atomPlacementsResult = responses[0];
      let atomTabAllResult = responses[1];
      let labelPlacementsResult = responses[2];

      state.atomPlacements = atomPlacementsResult.data;
      state.atomSimpleData = atomTabAllResult.data;
      state.atomLabelPeriods = labelPlacementsResult.data.labelPeriods;
      state.atomLabelGroups = labelPlacementsResult.data.labelGroups;

      // after getting data, display it
      // TODO: fix because it will get 'Properties' data on /electrons etc.
      dispatch("switchAtomTabData", {
        atomColorAppearance: "Properties",
        atomTab: "Properties"
      })
        .then(() => {
          commit("updateActiveAtomForce", 0);
        })
        .catch(e => console.error(e));
    })
    .catch(e => console.error(e));
}

// executes when we switch a tab (and want all data to update)
function switchAtomTabData({ state }, payload) {
  let atomColorAppearance = payload.atomColorAppearance;
  let atomTab = payload.atomTab;

  return new Promise((resolve, reject) => {
    Promise.all([
      // ex. atomColorsCategory, atomColorsOrbitalBlock
      axios.get(`/data/atomColorsTab${atomColorAppearance}.json`),

      // ex. atomTabIsotopes, atomTabProperties
      axios.get(`/data/atomTab${atomTab}.json`)
    ])
      .then(responses => {
        let atomColorAppearanceResult = responses[0];
        let atomSidebarDataResult = responses[1];

        state.atomColors = atomColorAppearanceResult.data;
        state.atomSidebarData = atomSidebarDataResult.data.data;

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
