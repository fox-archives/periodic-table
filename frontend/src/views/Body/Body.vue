// THIS SHOWS UNDER ANY DISPLAY OF THE PERIODIC TABLE
// SIMPLE, PROPERTIES, ELECTRONS, ORBITALS, AND ISOTOPES
<template>
  <div id="display" v-bind:class="[options.themeType, options.infoLocationType]">
    <ElementInfoPanel class="eli"></ElementInfoPanel>
    <PeriodicTable class="pta"></PeriodicTable>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import PeriodicTable from '../../components/PeriodicTable/PeriodicTable.vue';
  import ElementInfoPanel from '../../components/ElementInfoPanel/ElementInfoPanel.vue';

  export default {
    name: "Body",
    computed: {
      ...mapGetters([
        'options'
      ])
    },
    components: {
      ElementInfoPanel,
      PeriodicTable
    }
  }
</script>

<style scoped lang="scss">
  #display {
    // margin: 0px 10px 0px 10px;

  }

  #display.info-auto {
    display: flex;
  }

  #display.info-top {
    display: flex;
    flex-direction: column;
  }

  #display.info-side {
    display: flex;
    flex-direction: row;
  }

  #display.info-exclude {
    // Do not to do any styling because there will be only one element
  }

  .pta {
    box-sizing: border-box;

  }

</style>