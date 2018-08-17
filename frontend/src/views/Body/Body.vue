// THIS SHOWS UNDER ANY DISPLAY OF THE PERIODIC TABLE
// SIMPLE, PROPERTIES, ELECTRONS, ORBITALS, AND ISOTOPES
<template>
  <div id="display" v-bind:class="[options.themeType, options.infoLocationType]">
    <ElementInfoPanel></ElementInfoPanel>
    <PeriodicTable></PeriodicTable>
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
  /*#display {*/
    /*// display: flex;*/

    /*&.info-auto {*/

    /*}*/

    /*&.info-top {*/
      /*display: flex;*/
      /*flex-direction: column;*/
    /*}*/

    /*&.info-side {*/
      /*display: flex;*/
      /*flex-direction: row;*/
    /*}*/

    /*&info-exclude {*/

    /*}*/
  /*}*/

  #pt {
    margin: 0px 10px 10px 10px;
  }
</style>