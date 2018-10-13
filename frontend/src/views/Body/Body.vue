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
  import debounce from 'lodash/debounce';
  import PeriodicTable from '../../components/PeriodicTable/PeriodicTable.vue';
  import ElementInfoPanel from '../../components/element-info-visual-container.vue';


  export default {
    name: "Body",
    methods: {
      ...mapMutations([
        'setClassLayout',
        'setMobilePeriodicTableWidth',
        'sizeElementText'
      ]),

    },
    computed: {
      ...mapGetters([
        'options',
        'contentState'
      ])
    },
    created() {
      // TODO: Clean this up and make the required updates in the DOM instantaneously, when the DOM is ready
      // Not sure how to do that

      let that = this;
      function calculateLayout() {
        that.setClassLayout();
        that.setMobilePeriodicTableWidth();
        that.sizeElementText();
      }

      let setClassLayoutFirstLoad = setInterval(() => {
        // If the document is loaded, clear the timer, setClassLayout
        // should only be activated on page resize
        if(document.readyState === 'complete') {
          if(document.getElementById('grid-outer') !== null) {
            this.setClassLayout();
            this.setMobilePeriodicTableWidth();
            this.sizeElementText();
            clearInterval(setClassLayoutFirstLoad);
          }
          else {
            console.warn('Grid-outer cannot be found. Perhaps the periodic table data cannot be fetched?');
          }
        }
      }, 100);



      window.addEventListener('resize', () => {
        setTimeout(() => {
          this.setClassLayout();
          this.setMobilePeriodicTableWidth();
          this.sizeElementText();
        }, 500);
      });
      // Below is supposed to clean up code directly above, but cannot get it to work
      // window.addEventListener('resize', () => {
      //   console.log(debounce);
      //   debounce(calculateLayout(), 500, {'trailing': true});
      // });
      //

      // Apparently you need a set interval after this Vue component is created, especially for the method setMobilePeriodicTableWidth
      setTimeout(() => {
        this.setClassLayout();
        this.setMobilePeriodicTableWidth();
        this.sizeElementText();
      }, 1000);
      // Below is supposed to fix code directly above, but does not
      // Vue.nextTick(() => {
      //   this.setClassLayout();
      //   this.setMobilePeriodicTableWidth();
      //   this.sizeElementText();
      // });

      // // TODO: Would be better to make on event listener for resize, but do we want the classLayouts to delay by 50ms? I don't think so
      // window.addEventListener('resize', () => {
      //   this.setClassLayout();
      //   this.setMobilePeriodicTableWidth();
      //   this.sizeElementText();
      // });
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
    grid-template-rows: max-content auto;
    // grid-row-gap: $spacing;
  }

  .info-side #display {
    display: grid;
    grid-template-columns: max-content auto;
    grid-column-gap: $spacing;
  }

</style>