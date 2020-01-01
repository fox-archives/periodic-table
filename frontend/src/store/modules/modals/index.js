export default {
  namespaced: true,
  state: {
    infoModalActive: true
  },
  mutations: {
    setInfoModalActive(state, newValue) {
      state.infoModalActive = newValue;
    }
  }
};
