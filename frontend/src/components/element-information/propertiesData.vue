<template>
  <div id="textual">
    <div id="textual-inner">
      <div id="textual-buffer">
        <div v-if="routePath === 'properties'" id="textual-content">
          <div
v-for="(property, index) in properties" class="strat"
>
            <div class="stat-icon">
              <p style="font-family: Arial;">
                {{ properties[index].name }}
              </p>
            </div>
            <div class="stat-text">
              <!--<p> {{ currentElementProperties[activeElement.atomicNumber][properties[index].propertyName] }} </p>-->
              <!--{{ currentElementProperties[activeElement.atomicNumber] }}-->
              <!-- currentElementProperties, has been deleted, please recall -->
              {{ activeElement.atomicMass }}
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
  name: 'PropertiesData',
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
      this.updatePropertiesData();
    }
  },
  created() {
    this.updatePropertiesData();
  },
  mounted() {
    let psPanelTextual = new PerfectScrollbar('#textual-inner', {
      swipeEasing: true // Default
    });
  },
  computed: {
    ...mapGetters(['options', 'activeElement']),
    routePath: function() {
      return this.$route.path.substring(1);
    }
  },

  methods: {
    updatePropertiesData: function() {}
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';
@import 'theme';
@import 'properties-data';
</style>
