// THIS SHOWS UNDER ANY DISPLAY OF THE PERIODIC TABLE
// SIMPLE, PROPERTIES, ELECTRONS, ORBITALS, AND ISOTOPES
<template>
  <div id="display" v-bind:class="[contentState, options.themeType, options.infoLocationType]">
    <ElementInfoPanel></ElementInfoPanel>
    <PeriodicTable></PeriodicTable>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  import PeriodicTable from '../../components/PeriodicTable/PeriodicTable.vue';
  import ElementInfoPanel from '../../components/ElementInfoPanel/ElementInfoPanel.vue';

  export default {
    name: "Body",
    data() {
      return {
        contentState: 'scaleToWidth'
      }
    },
    methods: {
      // This script makes the periodic-table and element info panel not have a height
      // bigger than the browser on info-side
      setContentStateClass: function() {
        if(this.options.infoLocationType === 'info-side') {
          // Test if the height of periodic-table and element-info-panel are the same
          // This assumes the element-info panel goes all the way to bottom of window (stops right above footer)

          let panelHeight = document.getElementById('panel').offsetHeight;
          let periodicTableHeight = document.getElementById('grid-outer').offsetHeight;

          // console.log(panelHeight);
          // console.log(periodicTableHeight);

          // Only change the style if the periodic-table has a greater or equal height fo element info panel
          if (periodicTableHeight >= panelHeight && periodicTableHeight !== 0 && panelHeight !== 0) {
            // This means if panel and periodic-table fill whole window height, increasing
            // width will not increase size of periodic-table, instead it creates whitespace;
            // periodic-table will only increase if the height of browser window increases

            // Set the CSS Var First
            // Seems to tricky to implement
            // document.getElementById('grid-container-outer').style.setProperty('--scaleToHeightHeight', (panelHeight / 0.6 - 50) + 'px');

            this.contentState = 'heightSame';
          }
          else {
            this.contentState = 'heightDifferent';
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'options'
      ])
    },
    created() {
      let setContentStateClassFirstLoad = setInterval(() => {
        // If the document is loaded, clear the timer, setContentStateClass
        // should only be activated on page resize
        if(document.readyState === 'complete') {
          this.setContentStateClass();
          clearInterval(setContentStateClassFirstLoad);
        }
      }, 100);

      window.addEventListener('resize', () => {
        this.setContentStateClass();
      });
    },
    components: {
      ElementInfoPanel,
      PeriodicTable
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/variables.scss';

  #display {
    margin-left: $body-margin;
    margin-right: $body-margin;
  }

  .info-top #display {
    display: grid;
    grid-template-rows: 20vw auto;
    grid-row-gap: $spacing;
  }

  .info-side #display {
    display: grid;
    grid-template-columns: 17vw auto;
    grid-column-gap: $spacing;
  }

</style>