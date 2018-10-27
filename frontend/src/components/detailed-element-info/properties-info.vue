<template>
  <div id="textual">
    <div id="textual-inner">
      <div id="textual-buffer">
        <div v-if="routePath === 'properties'" id="textual-content">
          <div class="strat" v-for="(property, index) in properties">
            <div class="stat-icon">
              <p style="font-family: Arial;"> {{ properties[index].name }}</p>
            </div>
            <div class="stat-text">
              <!--<p> {{ currentElementProperties[activeElement.atomicNumber][properties[index].propertyName] }} </p>-->
              <!--{{ currentElementProperties[activeElement.atomicNumber] }}-->
              {{ activeElement.atomicNumber }}
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
    name: 'PropertiesInfo',
    data() {
      return {
        properties: [
          { name: "Density", propertyName: "density" },
          { name: "Liquid Density", propertyName: "liquidDensity" },
          { name: "Molar Volume", propertyName: "molarVolume" },
          { name: "Critical Pressure", propertyName: "criticalTemperature" },
          { name: "Critical Temperature", propertyName: "criticalTemperature" },
          { name: "Electron Affinity", propertyName: "electronAffinity" },
          { name: "Electronegativity", propertyName: "electronegativity" },
          { name: "Vaporization Heat", propertyName: "vaporizationHeat" }
        ]
      }
    },
    created() {
      this.updateProperties();


    },
    mounted() {
      let psPanelTextual = new PerfectScrollbar('#textual-inner', {
        swipeEasing: true, // Default
      });
    },
    watch: {
      '$route'() {
        this.updateProperties();
      }
    },
    computed: {
      ...mapGetters([
        'options',
        'activeElement',
        'currentElementProperties'
      ]),
      routePath: function() {
        return this.$route.path.substring(1)
      }
    },

    methods: {
      ...mapActions([
        'loadElementProperties'
      ]),
      // Fetch the data, depending on the route
      updateProperties: function() {
        let routePath = this.$route.path.substring(1);

        // Fetch data on a per-route basis
        if(routePath === 'properties') {
          this.loadElementProperties({ propertyType: 'properties' });
        }
        else if (routePath === 'isotopes')
        {
          this.loadElementProperties({ propertyType: 'isotopes' });
        }
        else if(routePath === 'electrons') {
          this.loadElementProperties({ propertyType: 'block' });
        }
        else if (routePath === 'orbitals') {
          this.loadElementProperties({ propertyType: 'orbitals' });
        }
        else if(routePath === 'isotopes') {
          this.loadElementProperties ({ propertyType: 'isotopes' });
        }
        else {
          this.loadElementProperties({ propertyType: 'properties' });
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  @import '../../styles/variables.scss';
  @import 'info-theme';
  @import 'detailed-info';
</style>
