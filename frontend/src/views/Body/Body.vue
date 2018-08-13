// THIS SHOWS UNDER ANY DISPLAY OF THE PERIODIC TABLE
// SIMPLE, PROPERTIES, ELECTRONS, ORBITALS, AND ISOTOPES
<template>
  <div id="display" v-bind:class="[options.infoLocationType]">
    <ElementInfoPanel/>
    <PeriodicTable/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import PeriodicTable from '../../components/PeriodicTable/PeriodicTable.vue';
  import ElementInfoPanel from '../../components/ElementInfoPanel/ElementInfoPanel.vue';

  export default {
    name: "Body",
    methods: {
      ...mapGetters([
        'options'
      ])
    },
    components: {
      PeriodicTable,
      ElementInfoPanel
    }
  }
</script>

<style scoped lang="scss">

</style>