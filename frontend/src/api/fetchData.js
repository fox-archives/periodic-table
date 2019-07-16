import axios from "axios";

function loadAtomData() {
  Promise.all([
    axios.get('/data/old.atomPlacement.json'),
    axios.get('/data/atomTabAll.json'),
    axios.get('/data/labelPlacement.json')
  ])
    .then(responses => {
      let atomPlacementsResult = responses[0];
      let atomTabAllResult = responses[1];
      let labelPlacementResults = responses[2];

      this.state.atomPlacements = atomPlacementsResult.data;
      this.state.atomSimpleData = atomTabAllResult.data;
      this.state.atomLabelPeriods = labelPlacementResults.data.labelPeriods;
      this.state.atomLabelGroups = labelPlacementResults.data.labelGroups;

      this.state.ready = true;
    })
    .catch(e => console.log(e));
}

function loadAtomColors(state, payload) {
  axios
    .get(`/data/${payload.colorScheme}.json`)
    .then(response => {
      this.state.atomColors = response.data;
    })
    // eslint-disable-next-line
    .catch(error => console.log(error));
}

function loadAtomTabProperties(state, payload) {
  axios
    .get('/data/atomTabProperties.json')
    .then(response => {
      this.state.atomTabData = response.data;
    })
    // eslint-disable-next-line
    .catch(error => console.log(error));
}

export {
  loadAtomData,
  loadAtomColors,
  loadAtomTabProperties
};
