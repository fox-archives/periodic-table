import axios from "axios";

function initAtomData({ state, dispatch }) {
  Promise.all([
    axios.get('/data/old.atomPlacement.json'),
    axios.get('/data/atomTabAll.json'),
    axios.get('/data/labelPlacement.json')
  ])
    .then(responses => {
      let atomPlacementsResult = responses[0];
      let atomTabAllResult = responses[1];
      let labelPlacementsResult = responses[2];

      state.atomPlacements = atomPlacementsResult.data;
      state.atomSimpleData = atomTabAllResult.data;
      state.atomLabelPeriods = labelPlacementsResult.data.labelPeriods;
      state.atomLabelGroups = labelPlacementsResult.data.labelGroups;

      dispatch('switchAtomTabData', {
        atomColorAppearance: 'Category',
        atomTab: 'Properties'
      });
    })
    .catch(e => console.log(e));
}

// executes when we switch a tab (and want all data to update)
function switchAtomTabData({ state }, payload) {
  let atomColorAppearance = payload.atomColorAppearance;
  let atomTab = payload.atomTab;

  Promise.all([
    // ex. atomColorsCategory, atomColorsOrbitalBlock
    axios.get(`/data/atomColors${atomColorAppearance}.json`),

    // ex. atomTabIsotopes, atomTabProperties
    axios.get(`/data/atomTab${atomTab}.json`)
  ])
    .then(responses => {
      let atomColorAppearanceResult = responses[0];
      let atomTabResult = responses[1];

      state.atomColors = atomColorAppearanceResult.data;
      state.atomTabData = atomTabResult.data;

      state.ready = true;
    })
}

export {
  initAtomData,
  switchAtomTabData
};
