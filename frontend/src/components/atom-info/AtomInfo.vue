<template>
  <div id="textual">
    <div id="textual-inner">
      <div id="textual-buffer">
        <div id="textual-content">
          <div v-for="n in 22" class="stat">
            <div class="stat-icon">
              <p>{{ activeElement.density }}</p>
            </div>
            <div class="stat-text">
              <p style="font-family: latoregular;">
                Lorem Ipsum
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import PerfectScrollbar from 'perfect-scrollbar';

export default {
  name: 'AtomInfo',
  data() {
    return {
      properties: [
        { name: 'Density', propertyName: 'density' },
        { name: 'Liquid Density', propertyName: 'liquidDensity' },
        { name: 'Molar Volume', propertyName: 'molarVolume' },
        { name: 'Critical Pressure', propertyName: 'criticalTemperature' },
        { name: 'Critical Temperature', propertyName: 'criticalTemperature' },
        { name: 'Electron Affinity', propertyName: 'electronAffinity' },
        { name: 'Electronegativity', propertyName: 'electronegativity' },
        { name: 'Vaporization Heat', propertyName: 'vaporizationHeat' }
      ]
    };
  },
  watch: {
    $route() {
      this.updateProperties();
    }
  },
  created() {
    this.updateProperties();
  },
  mounted() {
    let psPanelTextual = new PerfectScrollbar('#textual-inner', {
      swipeEasing: true // Default
    });
  },
  computed: {
    ...mapGetters(['options', 'activeElement'])
  },

  methods: {
    ...mapActions(['loadElementProperties']),

    // Fetch properties of elements
    updateProperties: function() {
      // console.log(this.$store.simpleData);
      this.loadElementProperties();
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';
@import 'atomInfoTheme';
@import 'atomInfo';
</style>
