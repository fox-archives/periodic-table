<template>
  <div id="textual">
    <div v-if="ready" id="textual-inner">
      <div id="textual-buffer">
        <div id="textual-content">
          <div v-for="atomTabDataMember in atomTabDataActiveModified" class="stat">
            <div class="stat-icon">
              <p>{{ activeElement.density }}</p>
            </div>
            <div class="stat-text">
              <p>
                {{ atomTabDataMember[0] }}: {{ atomTabDataMember[1] }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import PerfectScrollbar from 'perfect-scrollbar';

export default {
  name: 'AtomInfo',
  watch: {
    $route() {
      // TODO: Make this route watcher on TabGenericPeriodicTableInterface.vue element
      this.updateProperties();
    },
    ready() {
      this.$nextTick(() => {
        let psPanelTextual = new PerfectScrollbar('#textual-inner', {
          swipeEasing: true // Default
        });
      });
    }
  },
  created() {
    this.updateProperties();
  },
  computed: {
    ...mapGetters(['options', 'activeElement']),
    ...mapState(['atomTabData', 'atomTabDataActive', 'ready']),
    atomTabDataActiveModified() {
      return Object.entries(this.atomTabDataActive);
    }
  },

  methods: {
    ...mapActions(['loadAtomTabProperties']),
    // Fetch properties of elements
    updateProperties: function() {
      // console.log(this.$store.atomSimpleData);
      this.loadAtomTabProperties();
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';
@import 'atomInfoTheme';
@import 'atomInfo';

.stat-text {
  font-family: latoregular, Arial, 'sans-serif';
}
</style>
