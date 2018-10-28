<template>
  <div id="display" v-bind:class="[periodicTableFormat, options.themeType, options.infoLocationType]">
    <ElementInfoPanel></ElementInfoPanel>
    <PeriodicTable></PeriodicTable>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  import throttle from 'lodash/throttle';
  import PeriodicTable from '../components/periodic-table/PeriodicTable.vue';
  import ElementInfoPanel from '../components/element-info-visual-container.vue';


  export default {
    name: "Body",
    created() {
      let setClassLayoutFirstLoad = setInterval(() => {
        // If the document is loaded, clear the timer, setClassLayout
        // should only be activated on page resize
        if(document.getElementById('grid-outer') !== null) {
          this.setMobilePeriodicTableWidth();
          this.sizeElementsText();
          this.setClassLayout();
          clearInterval(setClassLayoutFirstLoad);
        }
        else {
          console.warn('Grid-outer cannot be found. Perhaps the periodic table data cannot be fetched?');
        }
      }, 100);


      // Apparently you need a set interval after this Vue component is created, especially for the method setMobilePeriodicTableWidth
      setTimeout(() => {
        this.setMobilePeriodicTableWidth();
        this.sizeElementsText();
        this.setClassLayout();
      }, 1000);


      window.addEventListener('resize',
        throttle(this.calculateLayout, 100)
      );


    },
    mounted() {
      setTimeout(() => {
        // this.setMobilePeriodicTableWidth();
        // this.sizeElementsText();
      }, 20);
    },
    methods: {
      ...mapMutations([
        'setMobilePeriodicTableWidth',
        'sizeElementsText',
        'setClassLayout'
      ]),
      calculateLayout: function() {
        if(document.getElementById('grid-outer') !== null) {
          this.setMobilePeriodicTableWidth();
          this.sizeElementsText();
          this.setClassLayout();
        }
      }
    },
    computed: {
      ...mapGetters([
        'options',
        'periodicTableFormat'
      ])
    },
    components: {
      ElementInfoPanel,
      PeriodicTable
    }
  }
</script>

<style scoped lang="scss">
  @import '../styles/variables';

  #display {
    margin-left: $body-margin;
    margin-right: $body-margin;
  }

  .info-top #display {
    display: grid;
    grid-template-rows: max-content auto;
    // grid-row-gap: $spacing;
  }

  .info-side #display {
    display: grid;
    grid-template-columns: max-content auto;
    grid-column-gap: $spacing;
  }

</style>