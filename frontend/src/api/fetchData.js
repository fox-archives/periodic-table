import axios from "axios";

export default {
  loadAtomData: function() {
    axios
        .get('/old/element/placement.json')
        .then(response => {
          this.state.atomPlacements = response.data;
        })
        // eslint-disable-next-line
        .catch(error => console.log(error));

    axios
        .get('/old/element/simple.json')
        .then(response => {
          this.state.atomSimpleData = response.data;
          this.state.ready = true;
        })
        // eslint-disable-next-line
        .catch(error => console.log(error));

    // Period / Group calls
    axios
        .get('/old/label/period.json')
        .then(response => {
          this.state.atomLabelPeriods = response.data;
        })
        // eslint-disable-next-line
        .catch(error => console.log(error));

    axios
        .get('/old/label/group.json')
        .then(response => {
          this.state.atomLabelGroups = response.data;
        })
        // eslint-disable-next-line
        .catch(error => console.log(error));
  },
  loadAtomColors: function(state, payload) {
    axios
        .get(`/d/${payload.colorScheme}.json`)
        .then(response => {
          this.state.atomColors = response.data;
        })
        // eslint-disable-next-line
        .catch(error => console.log(error));
  },
  loadAtomTabProperties: function(state, payload) {
    axios
        .get('/d/' + 'atomTabProperties.json')
        .then(response => {
          this.state.atomTabData = response.data;
        })
        // eslint-disable-next-line
        .catch(error => console.log(error));
  }
};
