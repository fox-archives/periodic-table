export default {
  namespaced: true,
  state: {
    infoModalActive: false
  },
  mutations: {
    setInfoModalActive(state, newValue) {
      state.infoModalActive = newValue;
    }
  }
};
