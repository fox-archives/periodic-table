// THIS SHOWS UNDER ANY DISPLAY OF THE PERIODIC TABLE
// SIMPLE, PROPERTIES, ELECTRONS, ORBITALS, AND ISOTOPES
<template>
  <div id="display" v-bind:class="[contentState, options.themeType, options.infoLocationType]">
    <ElementInfoPanel></ElementInfoPanel>
    <PeriodicTable></PeriodicTable>
  </div>
</template>

<script>
  import PerfectScrollbar from 'perfect-scrollbar';
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  import PeriodicTable from '../../components/PeriodicTable/PeriodicTable.vue';
  import ElementInfoPanel from '../../components/ElementInfoPanel/ElementInfoPanel.vue';


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
      let setClassLayoutFirstLoad = setInterval(() => {
        // If the document is loaded, clear the timer, setClassLayout
        // should only be activated on page resize
        if(document.readyState === 'complete') {
          this.setClassLayout();
          this.setMobilePeriodicTableWidth();
          this.sizeElementText();
          clearInterval(setClassLayoutFirstLoad);
        }
      }, 100);

      window.addEventListener('resize', () => {
        setTimeout(() => {
          this.setClassLayout();
          this.setMobilePeriodicTableWidth();
          this.sizeElementText();
        }, 500);
      });

      // this.setClassLayout();
      // this.setMobilePeriodicTableWidth();
      // this.sizeElementText();

      // Apparently this doesn't work (probably because when DOM content is loaded, it doesn't necessarily mean that Vue has finished mounting el
      // But again, why can't I enter these commands directly after mounted?
      // document.addEventListener('DOMContentLoaded', () => {
      //   this.setClassLayout();
      //   this.setMobilePeriodicTableWidth();
      //   this.sizeElementText();
      // }, false);

      // Apparently you need a set interval after this Vue component is created, especially for the method setMobilePeriodicTableWidth
      setTimeout(() => {
        this.setClassLayout();
        this.setMobilePeriodicTableWidth();
        this.sizeElementText();
      }, 1000);

      // TODO: Would be better to make on event listener for resize, but do we want the classLayouts to delay by 50ms? I don't think so
      window.addEventListener('resize', () => {
        this.setClassLayout();
        this.setMobilePeriodicTableWidth();
        this.sizeElementText();
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
    grid-template-rows: max-content auto;
    // grid-row-gap: $spacing;
  }

  .info-side #display {
    display: grid;
    grid-template-columns: max-content auto;
    grid-column-gap: $spacing;
  }

</style>