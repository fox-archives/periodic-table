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
    methods: {
      ...mapMutations([
        'setClassLayout'
      ])
    },
    computed: {
      ...mapGetters([
        'options',
        'contentState'
      ])
    },
    created() {
      let setClassLayoutFirstLoad = setInterval(() => {
        // If the document is loaded, clear the timer, setClassLayout
        // should only be activated on page resize
        if(document.readyState === 'complete') {
          this.setClassLayout();
          clearInterval(setClassLayoutFirstLoad);
        }
      }, 100);

      window.addEventListener('resize', () => {
        this.setClassLayout();
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